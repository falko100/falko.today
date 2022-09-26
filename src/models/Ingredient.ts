import { Collection } from 'fireorm';
import { getFirestoreRepository } from '@/lib/firebaseAdmin';

@Collection()
export class Ingredient {
  public id: string;
  public name: string;
  public slug: string;
}

export const ingredientRepository = getFirestoreRepository(Ingredient);
