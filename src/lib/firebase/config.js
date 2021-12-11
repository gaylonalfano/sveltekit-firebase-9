import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDaJmTQHq7knLY4L7FKEIHFwMtSpEK6IVM',
	authDomain: 'nftygmi.firebaseapp.com',
	projectId: 'nftygmi',
	storageBucket: 'nftygmi.appspot.com',
	messagingSenderId: '1011000921181',
	appId: '1:1011000921181:web:e8b5c7a6037cd846d891b4'
};

// === Init Firebase App connection to backend
export const fb = initializeApp(firebaseConfig);

// === Init Services
// Initialize Authentication Service
// const auth = firebase.auth(); // Or, projectAuth

// Initialize Firestore Service
export const db = getFirestore(fb);

// Initialize Firebase Storage Service
// const storage = storage();

// === Timestamp
// Let's add a timestamp FieldValue to export to other files.
// NOTE We are storing a FUNCTION REFERENCE in timestamp
// const timestamp = firebase.firestore.FieldValue.serverTimestamp;
