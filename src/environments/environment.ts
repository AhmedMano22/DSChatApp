import { initializeApp } from 'firebase/app';
export const environment = {
  firebase: {
    apiKey: 'AIzaSyAWtVd97Hg0xtRNNmnObs85ZVEU4cXD4_4',
    authDomain: 'chatapp-95b9f.firebaseapp.com',
    projectId: 'chatapp-95b9f',
    storageBucket: 'chatapp-95b9f.appspot.com',
    messagingSenderId: '254377769918',
    appId: '1:254377769918:web:3f36bbc190c6be730017ef',
  },
  production: false,
};
const app = initializeApp(environment.firebase);
