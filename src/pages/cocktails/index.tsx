import { SimpleLayout } from '@/components/SimpleLayout';
import { getAllCocktails, Cocktail, CocktailIngredient } from '@/lib/getCocktails';
import Image from 'next/future/image';

type ShortDrink = {
  name: string;
  slug: string;
  image: string;
  category: string;
  ingredients: CocktailIngredient[];
  IBA: string | null;
};

function CocktailCard(cocktail: ShortDrink) {
  return (
    <a
      href={'/cocktails/' + cocktail.slug}
      key={cocktail.slug}
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
  return (
    <SimpleLayout
      title="Cocktails"
      intro={
        'I got into making cocktails a while ago after I saw an amazing bartender set online. I bought the set and started making cocktails. I started with the classics and then moved on to more complex cocktails. I have a lot of fun making cocktails and I hope you enjoy the ones I have made. My specialty is the Espresso Martini, a favorite of Evelyn. This is not a coincidence.'
      }
    >
      <div className="-mx-2 mt-12 grid grid-cols-3 gap-2 lg:mx-auto lg:gap-5">
        {cocktails.map((cocktail) => (
          <CocktailCard key={cocktail.slug} {...cocktail} />
        ))}
      </div>
    </SimpleLayout>
  );
}

export async function getStaticProps() {
  const cocktails: ShortDrink[] = getAllCocktails().map(
    (cocktail: Cocktail) => ({
      name: cocktail.name,
      slug: cocktail.slug,
      image: cocktail.image,
      ingredients: cocktail.ingredients,
      category: cocktail.category,
      IBA: cocktail.IBA,
    })
  );

  return {
    props: {
      cocktails,
    },
  };
}
