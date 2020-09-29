import firebase from 'firebase';
import 'firebase/firestore';

import { firebaseConfig } from '../../config';

firebase.initializeApp(firebaseConfig);

export const firebase_auth = firebase.auth();
export const firestore = firebase.firestore();
export const firebase_instance = firebase;
export const firebase_storage_ref = firebase.storage().ref();
