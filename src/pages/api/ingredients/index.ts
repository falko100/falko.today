import { NextApiRequest, NextApiResponse } from 'next';
import { ingredientRepository } from '@/models/Ingredient';
import fetchData from '@/lib/fetchData';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  response.status(200).json(
    await fetchData('ingredients', () => {
      return ingredientRepository.find();
    })
  );
}
