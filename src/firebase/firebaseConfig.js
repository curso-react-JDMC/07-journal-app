import firebase  from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA_qvuVPAvEBgTX9XwbSRYnG1CVoF-Mkr8",
    authDomain: "react-app-curso-92e05.firebaseapp.com",
    projectId: "react-app-curso-92e05",
    storageBucket: "react-app-curso-92e05.appspot.com",
    messagingSenderId: "88414936480",
    appId: "1:88414936480:web:fac345986e5ba7469e18c5"
  };

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export {
    db,
    googleAuthProvider,
    firebase
}