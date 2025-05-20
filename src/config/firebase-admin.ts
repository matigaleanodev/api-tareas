import * as admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert({}),
});

export const auth = admin.auth();
export const firestore = admin.firestore();
