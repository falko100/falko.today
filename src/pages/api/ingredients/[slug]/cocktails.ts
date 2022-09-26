import { NextApiRequest, NextApiResponse } from 'next';
import { isString } from 'fast-glob/out/utils/string';
import fetchData from '@/lib/fetchData';
import { ingredientRepository } from '@/models/Ingredient';
import { cocktailRepository } from '@/models/Cocktail';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const slug = request.query.slug;

  if (!isString(slug)) {
    response.status(404).json({ message: 'Not found' });
    return;
  }

  const ingredient = await fetchData(`ingredients/${slug}`, () => {
    return ingredientRepository.whereEqualTo('slug', slug).findOne();
  });

  if (!ingredient) {
    response.status(404).json({ message: 'Not found' });
    return;
  }

  const cocktails = await fetchData(`ingredients/${slug}/cocktails`, () => {
    return cocktailRepository
      .whereArrayContains('ingredientIdList', ingredient.id)
      .find();
  });

  response.status(200).json(cocktails);
}
