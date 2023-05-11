import React from "react";
import {SimpleLayout} from "@/components/SimpleLayout";

import {Directus} from "@directus/sdk";
import Image from "next/image";
import {getAllCocktails, getAllIngredientsFromCocktail} from "@/lib/getAllCocktails";
import slugify from "@/lib/slugify";
import Head from "next/head";
import {Container} from "@/components/Container";
import Link from "next/link";
import {ArrowLeftIcon} from "@/components/ArticleLayout";
import {meta} from "@/pages/cocktails/[slug]";
import Loading from "@/components/Loading";

type Drink = {
  uuid: string,
  name: string,
  slug: string,
  image: ImageType | null,
  is_iba_cocktail: boolean,
  description: string | null,
  date_created: string,
  date_updated: string,
  drink_ingredients: DrinkIngredient[],
};

type ImageType = {
  id: string,
  filename_download: string,
};

type DrinkIngredient = {
  id: string,
  amount: string,
  unit: string,
  ingredient: {name: string},
};

export async function getStaticPaths() {
  const drinks: string[] = [];
  const paths = drinks.map((drink: any) => ({
    params: {slug: slugify(drink.strDrink)},
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({params}: { params: { slug: string } }) {
  const directus = new Directus('http://localhost:8055/');

  const drinkSearch = await directus
    .items<string, Drink>('drinks')
    .readByQuery({
      limit: 1,
      filter: {
        'slug': params.slug,
      },
      fields: [
        '*',
        'image.id',
        'image.filename_download',
        'drink_ingredients.amount',
        'drink_ingredients.unit',
        'drink_ingredients.ingredient.name',
      ],
    });

  const data = drinkSearch.data;
  if (data === null || data === undefined) {
    throw new Error('Drink not found');
  }

  const drink = data[0] || null;

  return {
    props: {
      drink: drink,
    },
  }
}

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

export default function Drink({drink}: { drink: Drink }) {
  if (!drink) {
    return Loading();
  }

  let details = [
    {
      stat: 'IBA Category',
      value: drink.is_iba_cocktail ? 'Yes' : 'No',
    },
    {
      stat: 'Ingedients',
      value: drink.drink_ingredients.map((drinkIngredient) => drinkIngredient.ingredient.name).join(', '),
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
                <div
                  className="aspect-w-12 aspect-h-7 lg:aspect-none">
                  {drink.image && <Image
                    className="rounded-lg object-cover object-center shadow-lg"
                    src={'http://localhost:8055/assets/' + drink.image.id}
                    width={400}
                    height={400}
                    alt=""
                  />}
                </div>
              </figure>
            </div>
          </div>
          <div className="mt-8 lg:mt-0">
            <div className="mx-auto max-w-prose text-base lg:max-w-none">
              <div>
                <Link
                  className="mb-4 inline-flex content-center items-center text-sm text-zinc-800 dark:text-zinc-100"
                  href="/drinks"
                >
                  <ArrowLeftIcon className="mr-2 h-4 w-4"/>
                  <span>Back to cocktails</span>
                </Link>
                <h2 className="text-lg font-semibold text-teal-600">
                  {drink.is_iba_cocktail}
                </h2>
                <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                  {drink.name}
                </h1>
              </div>

              <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                {drink.description}
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
