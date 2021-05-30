import firebase from 'firebase';
require ( '@firebase/firestore' );

var firebaseConfig = {
    apiKey: "AIzaSyCEcB18z4rP5ZCdewXTcvoPkHBdYmiVozg",
    authDomain: "book-santa-3b129.firebaseapp.com",
    projectId: "book-santa-3b129",
    storageBucket: "book-santa-3b129.appspot.com",
    messagingSenderId: "764024316182",
    appId: "1:764024316182:web:da6ee3477f65c9771f7037"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();