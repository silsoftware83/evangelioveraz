// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// Tu configuración de Firebase
const firebaseConfig = {

  apiKey: "AIzaSyCa2dkRGsX2etMNIoSQbkqz_Eg45fkCjdc",

  authDomain: "evangelioveraz.firebaseapp.com",

  projectId: "evangelioveraz",

  storageBucket: "evangelioveraz.firebasestorage.app",

  messagingSenderId: "768758413360",

  appId: "1:768758413360:web:e460210a9f6534bd3d55f5",

  measurementId: "G-W9KWWE2VJF"

};



// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(app);
const storage = getStorage(app);


const auth = getAuth(app);
export { db,storage,auth};

