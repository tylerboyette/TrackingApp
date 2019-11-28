/* eslint-disable prettier/prettier */
import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBbptOH7dBDj_S94G-5q38s6VwqRLrUZ38',
  authDomain: 'jogging-track-yuki.firebaseapp.com',
  databaseURL: 'https://jogging-track-yuki.firebaseio.com',
  projectId: 'jogging-track-yuki',
  storageBucket: 'jogging-track-yuki.appspot.com',
  messagingSenderId: '857715225804',
  appId: '1:857715225804:web:e981deb4aed9dfe24c7e69',
  measurementId: 'G-L1KVX9VHH0',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
