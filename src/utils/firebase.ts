import * as admin from "firebase-admin";

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.applicationDefault(),
    });
}

export const firestore = admin.firestore();
export const messaging = admin.messaging();
export const FieldValue = admin.firestore.FieldValue;
