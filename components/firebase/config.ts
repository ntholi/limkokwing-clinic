// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAuaUmZ63M-2BCGaM5GJY-_5gQ0OTmp6ww',
  authDomain: 'limkokwing-clinic.firebaseapp.com',
  projectId: 'limkokwing-clinic',
  storageBucket: 'limkokwing-clinic.appspot.com',
  messagingSenderId: '593873687810',
  appId: '1:593873687810:web:cfbca19c5a332334539e1b',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
