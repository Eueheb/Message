// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCebXii9Iv-eqsyavIongVE_SVnkqAa_Lk",
    authDomain: "demoapp-e06fa.firebaseapp.com",
    projectId: "demoapp-e06fa",
    storageBucket: "demoapp-e06fa.appspot.com",
    messagingSenderId: "460199505469",
    appId: "1:460199505469:web:a05940d270ef565a7b0454",
    measurementId: "G-K7JF317RC0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };