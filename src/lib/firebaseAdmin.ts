import * as firebaseAdmin from 'firebase-admin';

import serviceAccount from '@/lib/firebaseSecrets';

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

export { firebaseAdmin };
