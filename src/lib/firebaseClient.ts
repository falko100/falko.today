// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { browserSessionPersistence } from 'firebase/auth';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD_8fhOChwShIHng3EeuedZfrqcdYWufwg',
  authDomain: 'falkotoday.firebaseapp.com',
  projectId: 'falkotoday',
  storageBucket: 'falkotoday.appspot.com',
  messagingSenderId: '469036161233',
  appId: '1:469036161233:web:55fec498c1fcddf87f8df0',
  measurementId: 'G-QSNFXXVSFZ',
};

const firebaseClient = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseClient);
firebaseAuth.languageCode = 'en';
firebaseAuth.setPersistence(browserSessionPersistence);

export { firebaseClient, firebaseAuth };
