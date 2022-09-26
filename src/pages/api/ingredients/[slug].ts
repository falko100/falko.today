import { NextApiRequest, NextApiResponse } from 'next';
import { ingredientRepository } from '@/models/Ingredient';
import fetchData from '@/lib/fetchData';
import { isString } from 'fast-glob/out/utils/string';

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

  response.status(200).json(ingredient);
}
