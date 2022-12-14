import { SimpleLayout } from '@/components/SimpleLayout';
import {
  Drink,
  getAllCocktails,
  getAllIngredientsFromCocktail,
  Ingredient,
} from '@/lib/getAllCocktails';
import slugify from '@/lib/slugify';
import Toggle from '@/components/inputs/Toggle';
import Image from 'next/future/image';
import useLocalStorageState from 'use-local-storage-state';

type ShortDrink = {
  name: string;
  image: string;
  category: string;
  ingredients: Ingredient[];
  id: string;
  IBA: string | null;
};

function CocktailCard(cocktail: ShortDrink) {
  return (
    <a
      href={'/cocktails/' + slugify(cocktail.name)}
      key={cocktail.id}
      className="group flex flex-col overflow-hidden rounded-lg shadow-lg transition-shadow hover:shadow-xl"
    >
      <div className="flex-shrink-0 overflow-hidden">
        <Image
          className="w-full object-cover transition-transform ease-in-out group-hover:scale-110 group-hover:transform"
          src={cocktail.image}
          width={400}
          height={400}
          alt=""
        />
      </div>
      <div className="flex flex-1 flex-col justify-between bg-white p-2 dark:bg-zinc-800 lg:px-6 lg:py-4">
        <div className="flex-1">
          <p className="text-[12px] font-medium text-teal-600 lg:text-sm">
            {cocktail.IBA || cocktail.category}
          </p>
          <div className="mt-1 block">
            <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 lg:text-xl">
              {cocktail.name}
            </p>
            <p className="mt-1 hidden text-sm text-gray-500 lg:block">
              {cocktail.ingredients
                .map((ingredient) => ingredient.name)
                .join(', ')}
            </p>
          </div>
        </div>
      </div>
    </a>
  );
}

export default function Cocktails({ cocktails }: { cocktails: ShortDrink[] }) {
  const [showOnlyIBA, setShowOnlyIBA] = useLocalStorageState('show_only_iba', {
    defaultValue: true,
  });
  const [filteredLetter, setFilteredLetter] = useLocalStorageState(
    'filtered_letter',
    { defaultValue: 'A' }
  );

  const availableCocktails = cocktails.filter((cocktail) => {
    return !showOnlyIBA || cocktail.IBA !== null;
  });

  const allCocktailsByFirstLetter = groupByFirstLetter(cocktails);
  const filteredCocktails = availableCocktails.filter((cocktail) =>
    allCocktailsByFirstLetter[filteredLetter].includes(cocktail)
  );

  const cocktailsGroupedByLetter = groupByFirstLetter(availableCocktails);

  return (
    <SimpleLayout
      title="Cocktails"
      intro={
        'I got into making cocktails a while ago after I saw an amazing bartender set online. I bought the set and started making cocktails. I started with the classics and then moved on to more complex cocktails. I have a lot of fun making cocktails and I hope you enjoy the ones I have made. My specialty is the Espresso Martini, a favorite of Evelyn. This is not a coincidence.'
      }
    >
      <Toggle
        className="mb-4"
        enabled={showOnlyIBA}
        setEnabled={setShowOnlyIBA}
        title="Show only IBA cocktails"
        helpText=" (International Bartenders Association)"
      />
      <p className="text-zinc-600 dark:text-zinc-400">
        Because there are {cocktails.length} cocktails in my collections, you
        can filter here based on the starting letter.
      </p>
      <nav className="mb-4 mt-2 flex flex-wrap gap-1">
        {Object.keys(cocktailsGroupedByLetter).map((key) => (
          <button
            type="button"
            onClick={() => setFilteredLetter(key)}
            key={key}
            className={`block rounded bg-white px-3 py-1 ring-1 dark:bg-zinc-800
            ${isNaN(Number(key)) ? 'order-1' : 'order-2'}
            ${
              key === filteredLetter &&
              'text-teal-500 ring-teal-500 dark:text-teal-200'
            }
            ${
              key !== filteredLetter &&
              'text-zinc-500 ring-zinc-900/5 dark:ring-white/10'
            }
            `}
          >
            {key}
          </button>
        ))}
      </nav>

      <p className="text-zinc-600 dark:text-zinc-400">
        Showing {filteredCocktails.length} cocktails of{' '}
        {availableCocktails.length} {showOnlyIBA ? 'IBA' : ''} cocktails.
      </p>

      <div className="-mx-2 mt-12 grid grid-cols-3 gap-2 lg:mx-auto lg:gap-5">
        {filteredCocktails.map((cocktail) => CocktailCard(cocktail))}
      </div>
    </SimpleLayout>
  );
}

export async function getStaticProps() {
  let cocktails;

  // const fs = require('fs');
  // if (fs.existsSync(`api-cache/cocktails-index.json`)) {
  //   cocktails = JSON.parse(fs.readFileSync(`api-cache/cocktails-index.json`));
  // } else {
  cocktails = (await getAllCocktails()).map(
    (drink: Drink): ShortDrink => ({
      name: drink.strDrink,
      image: drink.strDrinkThumb,
      ingredients: getAllIngredientsFromCocktail(drink),
      id: drink.idDrink,
      category: drink.strCategory,
      IBA: drink.strIBA,
    })
  );

  // fs.writeFile(
  //   `api-cache/cocktails-index.json`,
  //   JSON.stringify(cocktails),
  //   (err: NodeJS.ErrnoException | null) => {
  //     if (err) {
  //       console.error(err);
  //     }
  //   }
  // );
  // }

  return {
    props: {
      cocktails,
    },
  };
}

function groupByFirstLetter(cocktails: ShortDrink[]): {
  [x: string]: ShortDrink[];
} {
  const groupedCocktails = cocktails.reduce(
    (acc: any, cocktail: ShortDrink) => {
      const firstLetter = cocktail.name[0].toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(cocktail);
      return acc;
    },
    {}
  );

  groupedCocktails['#'] = cocktails.filter((cocktail) => {
    return !isNaN(Number(cocktail.name[0]));
  });

  if (groupedCocktails['#'].length === 0) {
    delete groupedCocktails['#'];
  }

  for (let i = 0; i < 10; i++) {
    delete groupedCocktails[+i];
  }

  return groupedCocktails;
}
