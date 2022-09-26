import { NextApiRequest, NextApiResponse } from 'next';
import { cocktailRepository } from '@/models/Cocktail';
import fetchData from '@/lib/fetchData';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  response.status(200).json(
    await fetchData('cocktails', () => {
      return cocktailRepository.find();
    })
  );
}
