export type Drink = {
  dateModified: string;
  idDrink: string;
  strAlcoholic: string;
  strCategory: string;
  strCreativeCommonsConfirmed: string;
  strDrink: string;
  strDrinkAlternate: string | null;
  strDrinkThumb: string;
  strGlass: string;
  strIBA: string;
  strImageAttribution: string;
  strImageSource: string;
  strIngredient1: string | null;
  strIngredient10: string | null;
  strIngredient11: string | null;
  strIngredient12: string | null;
  strIngredient13: string | null;
  strIngredient14: string | null;
  strIngredient15: string | null;
  strIngredient2: string | null;
  strIngredient3: string | null;
  strIngredient4: string | null;
  strIngredient5: string | null;
  strIngredient6: string | null;
  strIngredient7: string | null;
  strIngredient8: string | null;
  strIngredient9: string | null;
  strInstructions: string | null;
  strInstructionsDE: string | null;
  strInstructionsES: string | null;
  strInstructionsFR: string | null;
  strInstructionsIT: string | null;
  strMeasure1: string | null;
  strMeasure10: string | null;
  strMeasure11: string | null;
  strMeasure12: string | null;
  strMeasure13: string | null;
  strMeasure14: string | null;
  strMeasure15: string | null;
  strMeasure2: string | null;
  strMeasure3: string | null;
  strMeasure4: string | null;
  strMeasure5: string | null;
  strMeasure6: string | null;
  strMeasure7: string | null;
  strMeasure8: string | null;
  strMeasure9: string | null;
  strTags: string;
  strVideo: string | null;
};

export type Ingredient = { name: string; measurement: string | null };

export function getAllIngredientsFromCocktail(cocktail: Drink) {
  const ingredients: Ingredient[] = [];

  for (let i: number = 1; i <= 15; i++) {
    // @ts-ignore
    const name: string | null = cocktail[`strIngredient${i}`];
    // @ts-ignore
    const measurement: string | null = cocktail[`strMeasure${i}`];

    if (name) {
      ingredients.push({ name, measurement });
    }
  }
  return ingredients;
}

const cocktailCache: { [key: string]: { drinks?: Drink[] } } = {};

export async function getAllCocktailsByLetter(
  letter: string
): Promise<{ drinks?: Drink[] }> {
  return { drinks: [] };

  // if (cocktailCache[letter]) {
  //   return cocktailCache[letter];
  // }
  //
  // const drinks = await fetch(
  //   'https://www.thecocktaildb.com/api/json/v2/' +
  //     process.env.COCKTAIL_DB_APIKEY +
  //     '/search.php?f=' +
  //     letter
  // ).then((res) => res.json());
  //
  // cocktailCache[letter] = drinks;
  //
  // return drinks;
}

export async function getAllCocktails(): Promise<Drink[]> {
  return [];

  // let result: Drink[] = [];
  // const letters = 'abcdefghijlkmnopqrstuvwxyz1234567890'.split('');
  // for (let i = 0; i < letters.length; i++) {
  //   const letter = letters[i];
  //   const { drinks } = await getAllCocktailsByLetter(letter);
  //
  //   if (!drinks) {
  //     continue;
  //   }
  //
  //   result = result.concat(drinks);
  // }
  //
  // return result.sort((a, b) => a.strDrink.localeCompare(b.strDrink));
}
