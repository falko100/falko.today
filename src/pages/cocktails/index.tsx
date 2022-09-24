import { SimpleLayout } from '@/components/SimpleLayout';
import {
  Drink,
  getAllCocktails,
  getAllIngredientsFromCocktail,
  Ingredient,
} from '@/lib/getAllCocktails';
import slugify from '@/lib/slugify';
import { useState } from 'react';
import Toggle from '@/components/inputs/Toggle';
import Image from 'next/future/image';

function CocktailCard(cocktail: ShortDrink) {
  return (
    <div
      key={cocktail.id}
      className="flex flex-col overflow-hidden rounded-lg shadow-lg"
    >
      <div className="flex-shrink-0">
        <Image
          className="w-full object-cover"
          src={cocktail.image}
          width={400}
          height={400}
          alt=""
        />
      </div>
      <div className="flex flex-1 flex-col justify-between bg-white px-6 py-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-indigo-600">
            <a
              href={'/cocktails/category/' + slugify(cocktail.name)}
              className="hover:underline"
            >
              {cocktail.category}
            </a>
          </p>
          <a
            href={'/cocktails/' + slugify(cocktail.name)}
            className="mt-1 block"
          >
            <p className="text-xl font-semibold text-gray-900">
              {cocktail.name}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {cocktail.ingredients
                .map((ingredient) => ingredient.name)
                .join(', ')}
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Cocktails({ cocktails }: { cocktails: ShortDrink[] }) {
  const [showOnlyIBA, setShowOnlyIBA] = useState(true);
  const [filteredLetter, setFilteredLetter] = useState('A');

  const availableCocktails = cocktails.filter((cocktail) => {
    return !showOnlyIBA || cocktail.isIBA;
  });

  const filteredCocktails = availableCocktails.filter((cocktail) =>
    cocktail.name.toUpperCase().startsWith(filteredLetter)
  );

  const cocktailsGroupedByLetter = groupByFirstLetter(availableCocktails);

  return (
    <SimpleLayout title="Cocktails">
      <Toggle
        className="mb-4"
        enabled={showOnlyIBA}
        setEnabled={setShowOnlyIBA}
        title="Show only IBA cocktails"
        helpText=" (International Bartenders Association)"
      />
      <p>Jump to cocktails starting with a letter:</p>
      <nav className="mb-4 mt-2 flex flex-wrap gap-1">
        {Object.keys(cocktailsGroupedByLetter).map((key) => (
          <button
            type="button"
            onClick={() => setFilteredLetter(key)}
            key={key}
            className={`block border px-3 py-1 ${
              key === filteredLetter && 'bg-teal-600 text-white'
            }`}
          >
            {key}
          </button>
        ))}
      </nav>
      <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
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
      isIBA: drink.strIBA !== null,
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

type ShortDrink = {
  name: string;
  image: string;
  category: string;
  ingredients: Ingredient[];
  id: string;
  isIBA: boolean;
};

function groupByFirstLetter(cocktails: ShortDrink[]): {
  [x: string]: ShortDrink[];
} {
  return cocktails.reduce((acc: any, cocktail: ShortDrink) => {
    const firstLetter = cocktail.name[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(cocktail);
    return acc;
  }, {});
}
