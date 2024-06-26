import { initializeApp } from 'firebase/app';
export const environment = {
  firebase: {
    // apiKey: 'AIzaSyAWtVd97Hg0xtRNNmnObs85ZVEU4cXD4_4',
    // authDomain: 'chatapp-95b9f.firebaseapp.com',
    // projectId: 'chatapp-95b9f',
    // storageBucket: 'chatapp-95b9f.appspot.com',
    // messagingSenderId: '254377769918',
    // appId: '1:254377769918:web:3f36bbc190c6be730017ef',


    apiKey: "AIzaSyAKzfPhGVYDKwWqLUfrm1dVVH1dBlQcu6M",

  authDomain: "chatchat-b216f.firebaseapp.com",

  projectId: "chatchat-b216f",

  storageBucket: "chatchat-b216f.appspot.com",

  messagingSenderId: "817761990862",

  appId: "1:817761990862:web:eef6bd8c6c2c08a260389f"
  },
  production: false,
};
const app = initializeApp(environment.firebase);
