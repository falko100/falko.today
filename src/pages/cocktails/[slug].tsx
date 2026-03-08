import Head from 'next/head';

import { getAllCocktails, getCocktailBySlug, Cocktail } from '@/lib/getCocktails';
import { Container } from '@/components/Container';
import Image from 'next/future/image';
import Link from 'next/link';
import { ArrowLeftIcon } from '@/components/ArticleLayout';

function DetailRow(stat: string, value: string) {
  return (
    <div className="border-t border-gray-200">
      <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-3">
        <dt className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
          {stat}
        </dt>
        <dd className="mt-1 text-sm text-zinc-800 dark:text-zinc-100 sm:col-span-2 sm:mt-0">
          {value}
        </dd>
      </div>
    </div>
  );
}

export default function CocktailPage({
  cocktail,
}: {
  cocktail: Cocktail;
}) {
  let details = [
    { stat: 'Alcoholic', value: cocktail.isAlcoholic ? 'Alcoholic' : 'Non alcoholic' },
    { stat: 'Glass', value: cocktail.glass },
    { stat: 'IBA Category', value: cocktail.IBA || '-' },
    {
      stat: 'Ingredients',
      value: cocktail.ingredients
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
        <title>{cocktail.name} - Falko Woudstra</title>
        <meta
          name="description"
          content={`${cocktail.name} cocktail recipe`}
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
                    src={cocktail.image}
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
                  className="mb-4 inline-flex content-center items-center text-sm text-zinc-800 dark:text-zinc-100"
                  href="/cocktails"
                >
                  <ArrowLeftIcon className="mr-2 h-4 w-4" />
                  <span>Back to cocktails</span>
                </Link>
                <h2 className="text-lg font-semibold text-teal-600">
                  {cocktail.category}
                </h2>
                <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                  {cocktail.name}
                </h1>
              </div>

              <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                {cocktail.instructions}
              </p>

              <h3 className="mt-5 text-lg font-medium leading-6 text-zinc-800 dark:text-zinc-100">
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
  const cocktails = getAllCocktails();
  const paths = cocktails.map((cocktail) => ({
    params: { slug: cocktail.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const cocktail = getCocktailBySlug(params.slug);

  if (!cocktail) {
    return { notFound: true };
  }

  return {
    props: {
      cocktail,
    },
  };
}
