import { SimpleLayout } from '@/components/SimpleLayout';
import { Drink, getAllCocktails } from '@/lib/getAllCocktails';
import slugify from '@/lib/slugify';
import { useState } from 'react';
import Toggle from '@/components/inputs/Toggle';

export default function Cocktails({ cocktails }: { cocktails: ShortDrink[] }) {
  const [showOnlyIBA, setShowOnlyIBA] = useState(true);

  const cocktailsGroupedByLetter = groupByFirstLetter(
    cocktails.filter((cocktail) => {
      return showOnlyIBA || cocktail.isIBA;
    })
  );

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
          <a
            key={key}
            href={'#cocktails-' + key}
            className="block border px-3 py-1"
          >
            {key}
          </a>
        ))}
      </nav>
      <div>
        {Object.keys(cocktailsGroupedByLetter).map((key) => (
          <div key={key} id={'cocktails-' + key}>
            <h1 className="text-xl">
              Cocktails that start with {key.toUpperCase()}
            </h1>
            <div className="my-4 flex flex-wrap gap-x-2 gap-y-4">
              {cocktailsGroupedByLetter[key].map((cocktail) => (
                <a
                  className="block border py-1 px-2"
                  key={cocktail.id}
                  href={'/cocktails/' + slugify(cocktail.name)}
                >
                  {cocktail.name}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SimpleLayout>
  );
}

export async function getStaticProps() {
  const cocktails = (await getAllCocktails()).map(
    (drink: Drink): ShortDrink => ({
      name: drink.strDrink,
      id: drink.idDrink,
      isIBA: drink.strIBA !== null,
    })
  );

  return {
    props: {
      cocktails,
    },
  };
}

type ShortDrink = {
  name: string;
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
