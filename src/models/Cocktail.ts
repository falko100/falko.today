import { Collection } from 'fireorm';
import { getFirestoreRepository } from '@/lib/firebaseAdmin';

@Collection()
export class Cocktail {
  public id: string;
  public name: string;
  public slug: string;
  public isAlcoholic: boolean;
  public category: string;
  public glass: string;
  public instructions: string | null;
  public thumbnail: string;

  public ingredientIdList: string[];
  public ingredients: { ingredientId: string; measurement: string | null }[];
}

export const cocktailRepository = getFirestoreRepository(Cocktail);
