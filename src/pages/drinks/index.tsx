import React from "react";
import {SimpleLayout} from "@/components/SimpleLayout";

import {Directus} from "@directus/sdk";
import Image from "next/image";

type Drink = {
  uuid: string,
  name: string,
  slug: string,
  image: ImageType | null,
  is_iba_cocktail: boolean,
  description: string | null,
  date_created: string,
  date_updated: string,
  drink_ingredients: any[],
};

type ImageType = {
  id: string,
  filename_download: string,
};

export async function getStaticProps() {
  const directus = new Directus('http://localhost:8055/');

  const drinks = await directus.items<string, Drink>('drinks')
    .readByQuery({
      limit: -1,
      fields: [
        '*',
        'image.id',
        'image.filename_download',
        'drink_ingredients.amount',
        'drink_ingredients.unit',
        'drink_ingredients.ingredient.name',
      ],
    });

  return {
    props: {
      cocktails: drinks.data,
    },
  }
}

function DrinkCard(drink: Drink) {
  return (
    <a
      href={'/drinks/' + drink.slug}
      key={drink.uuid}
      className="group flex flex-col overflow-hidden rounded-lg shadow-lg transition-shadow hover:shadow-xl"
    >
      <div className="flex-shrink-0 overflow-hidden">
        {drink.image && <Image
          className="w-full object-cover transition-transform ease-in-out group-hover:scale-110 group-hover:transform"
          src={'http://localhost:8055/assets/' + drink.image.id + '/' + drink.image.filename_download}
          width={400}
          height={400}
          alt=""
        />}
        {!drink.image && <div
          className="bg-red-300 aspect-square"
        />}
      </div>
      <div className="flex flex-1 flex-col justify-between bg-white p-2 dark:bg-zinc-800 lg:px-6 lg:py-4">
        <div className="flex-1">
          <p className="text-[12px] font-medium text-teal-600 lg:text-sm">
            {drink.is_iba_cocktail ? 'IBA Cocktail' : 'Custom cocktail'}
          </p>
          <div className="mt-1 block">
            <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 lg:text-xl">
              {drink.name}
            </p>
            <p className="mt-1 hidden text-sm text-gray-500 lg:block">
              <em>{drink.drink_ingredients.map(drinkIngredient => drinkIngredient.ingredient.name).join(', ')}</em>
            </p>
          </div>
        </div>
      </div>
    </a>
  );
}

export default function Drinks({cocktails}: { cocktails: any[] }) {
  return <SimpleLayout title="Cocktails from Directus">
    <div className="-mx-2 mt-12 grid grid-cols-3 gap-2 lg:mx-auto lg:gap-5">
      {cocktails.map(i => DrinkCard(i))}
    </div>
  </SimpleLayout>;
};
