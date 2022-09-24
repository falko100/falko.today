import Head from 'next/head';

import {
  Drink,
  getAllCocktails,
  getAllCocktailsByLetter,
  getAllIngredientsFromCocktail,
} from '@/lib/getAllCocktails';
import slugify from '@/lib/slugify';
import { Container } from '@/components/Container';
import Image from 'next/future/image';
import Link from 'next/link';
import { ArrowLeftIcon } from '@/components/ArticleLayout';

export const meta = {
  title: 'Cocktail',
  description: 'Dynamic cocktail',
};

function DetailRow(stat: string, value: string) {
  return (
    <div className="border-t border-gray-200">
      <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-3">
        <dt className="text-sm font-medium text-gray-500">{stat}</dt>
        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
          {value}
        </dd>
      </div>
    </div>
  );
}

export default function Cocktail({
  cocktail,
  ...props
}: {
  cocktail: Drink;
  [key: string]: any;
}) {
  let details = [
    { stat: 'Alcholic', value: cocktail.strAlcoholic },
    { stat: 'Glass', value: cocktail.strGlass },
    { stat: 'IBA Category', value: cocktail.strIBA },
    {
      stat: 'Ingedients',
      value: getAllIngredientsFromCocktail(cocktail)
        .map(
          (ingredient) =>
            ingredient.name +
            (ingredient.measurement
              ? ` (${ingredient.measurement.trim()})`
              : '')
        )
        .join(', '),
    },
  ];

  return (
    <>
      <Head>
        <title>Projects - Falko Woudstra</title>
        <meta
          name="description"
          content="These are some of the projects I am proud of."
        />
      </Head>
      <Container className="mt-8 sm:mt-32">
        <div className="m-2 lg:mt-8 lg:grid lg:grid-cols-2 lg:gap-12">
          <div className="relative lg:col-start-2 lg:row-start-1">
            <div className="relative mx-auto max-w-prose text-base lg:max-w-none">
              <figure>
                <div className="aspect-w-12 aspect-h-7 lg:aspect-none">
                  <Image
                    className="rounded-lg object-cover object-center shadow-lg"
                    src={cocktail.strDrinkThumb}
                    width={400}
                    height={400}
                    alt=""
                  />
                </div>
              </figure>
            </div>
          </div>
          <div className="mt-8 lg:mt-0">
            <div className="mx-auto max-w-prose text-base lg:max-w-none">
              <div>
                <Link
                  className="mb-4 inline-flex content-center items-center text-sm"
                  href="/cocktails"
                >
                  <ArrowLeftIcon className="mr-2 h-4 w-4" />
                  <span>Back to cocktails</span>
                </Link>
                <h2 className="text-lg font-semibold text-teal-600">
                  {cocktail.strCategory}
                </h2>
                <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                  {cocktail.strDrink}
                </h1>
              </div>

              <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                {cocktail.strInstructions}
              </p>

              <h3 className="mt-5 text-lg font-medium leading-6 text-gray-900">
                Cocktail Information
              </h3>
              <dl className="pt-3 sm:divide-y sm:divide-gray-200">
                {details.map((detail) => DetailRow(detail.stat, detail.value))}
              </dl>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export async function getStaticPaths() {
  const drinks = await getAllCocktails();
  const paths = drinks.map((drink: any) => ({
    params: { slug: slugify(drink.strDrink) },
  }));

  return {
    paths,
    fallback: false,
  };
}

async function getCocktailFromSlug(slug: string) {
  const cocktails = await getAllCocktailsByLetter(slug[0]);
  return cocktails.drinks?.find(
    (drink: any) => slugify(drink.strDrink) === slug
  );
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const cocktail = await getCocktailFromSlug(params.slug);

  return {
    props: {
      cocktail,
    },
  };
}
