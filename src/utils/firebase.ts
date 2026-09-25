import { applicationDefault, getApps, initializeApp } from "firebase-admin/app";
import { FieldValue, getFirestore } from "firebase-admin/firestore";
import { getMessaging } from "firebase-admin/messaging";

if (!getApps().length) {
    initializeApp({
        credential: applicationDefault(),
    });
}

export const firestore = getFirestore();
export const messaging = getMessaging();
export { FieldValue };
