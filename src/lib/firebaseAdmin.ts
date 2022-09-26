import * as firebaseAdmin from 'firebase-admin';
import * as fireorm from 'fireorm';

import serviceAccount from '@/lib/firebaseSecrets';
import { EntityConstructorOrPath, IEntity } from 'fireorm/lib/src/types';

function setupFirestore() {
  const db = firebaseAdmin.firestore();
  fireorm.initialize(db);
}

export function getFirestoreRepository<T extends IEntity>(
  collectionName: EntityConstructorOrPath<T>
) {
  setupFirestore();
  return fireorm.getRepository(collectionName);
}

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: serviceAccount.private_key,
      clientEmail: serviceAccount.client_email,
      projectId: serviceAccount.project_id,
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

export { firebaseAdmin, setupFirestore };
