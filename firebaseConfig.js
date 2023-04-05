// import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/compat/storage";



import { FIREBASE_APIKEY, FIREBASE_AUTHDOMAIN, FIREBASE_PROJECTID, FIREBASE_STORAGEBUCKET, FIREBASE_MESSAGINGSENDERID, FIREBASE_APPID, FIREBASE_MEASUREMENTID } from '@env';


// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
	apiKey: FIREBASE_APIKEY,
	authDomain: FIREBASE_AUTHDOMAIN,
	projectId: FIREBASE_PROJECTID,
	storageBucket: FIREBASE_STORAGEBUCKET,
	messagingSenderId: FIREBASE_MESSAGINGSENDERID,
	appId: FIREBASE_APPID,
	measurementId: FIREBASE_MEASUREMENTID
};

// Initialize Firebase
export const Firebase = firebase.initializeApp(firebaseConfig)
export const Auth = getAuth(Firebase);

export const FirebaseDB = getFirestore(Firebase);
export const FireaseStorage = getStorage(Firebase);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
