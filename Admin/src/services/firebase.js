import * as firebase from 'firebase';

// Optionally import the services that you want to use
import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCa3UKMWxlKgMv1MfNV3uCWutkRs-DR5tw",
    authDomain: "clone-mercado-livre.firebaseapp.com",
    databaseURL: "https://clone-mercado-livre.firebaseio.com",
    projectId: "clone-mercado-livre",
    storageBucket: "clone-mercado-livre.appspot.com",
    messagingSenderId: "736014324582",
    appId: "1:736014324582:web:3e4fd85162080d4dc0aea7",
    measurementId: "G-0X9WNZ1YWK"
};

firebase.initializeApp(firebaseConfig);

export default firebase