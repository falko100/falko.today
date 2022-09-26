import { NextApiRequest, NextApiResponse } from 'next';
import { setupFirestore } from '@/lib/firebaseAdmin';
import { Cocktail, cocktailRepository } from '@/models/Cocktail';
import { getAllCocktails } from '@/lib/getAllCocktails';
import slugify from '@/lib/slugify';
import { Ingredient, ingredientRepository } from '@/models/Ingredient';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (process.env.NODE_ENV === 'production') {
    response.status(405).send('Not allowed on production.');
    return;
  }

  setupFirestore();

  const cocktails = await cocktailRepository.find();
  for (const cocktail of cocktails) {
    await cocktailRepository.delete(cocktail.id);
  }

  // const ingredients = await ingredientRepository.find();
  // for (const ingredient of ingredients) {
  //   await ingredientRepository.delete(ingredient.id);
  // }

  const drinks = await getAllCocktails();
  for (const drink of drinks) {
    const cocktail = new Cocktail();
    cocktail.name = drink.strDrink;
    cocktail.slug = slugify(drink.strDrink);
    cocktail.isAlcoholic = drink.strAlcoholic === 'Alcoholic';
    cocktail.category = drink.strCategory;
    cocktail.glass = drink.strGlass;
    cocktail.instructions = drink.strInstructions;
    cocktail.thumbnail = drink.strDrinkThumb;
    cocktail.ingredients = [];
    cocktail.ingredientIdList = [];
    for (let i = 1; i <= 15; i++) {
      // @ts-ignore-next-line
      const ingredientName = drink[`strIngredient${i}`];
      // @ts-ignore-next-line
      const measurement = drink[`strMeasure${i}`];
      if (ingredientName) {
        const ingredient = await findOrCreateIngredient(ingredientName);

        cocktail.ingredientIdList.push(ingredient.id);

        cocktail.ingredients.push({
          ingredientId: ingredient.id,
          measurement: measurement || null,
        });
      }
    }
    await cocktailRepository.create(cocktail);
  }

  response.status(200).json(await cocktailRepository.find());
}

const ingredientCache: { [key: string]: Ingredient } = {};

async function findOrCreateIngredient(ingredientName: string) {
  if (ingredientCache[slugify(ingredientName)]) {
    return ingredientCache[slugify(ingredientName)];
  }

  const ingredient = await ingredientRepository
    .whereEqualTo('slug', slugify(ingredientName))
    .findOne();

  if (ingredient) {
    ingredientCache[slugify(ingredientName)] = ingredient;
    return ingredient;
  }

  const newIngredient = new Ingredient();
  newIngredient.name = ingredientName;
  newIngredient.slug = slugify(ingredientName);

  await ingredientRepository.create(newIngredient);
  ingredientCache[slugify(ingredientName)] = newIngredient;

  return newIngredient;
}
