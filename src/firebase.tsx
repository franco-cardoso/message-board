import { initializeApp } from "firebase/app";
import 'firebase/firestore'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB6pkMOND4A2WxyRmXWTPDk4ofH9XxEXzM",
    authDomain: "cool-message-board-87941.firebaseapp.com",
    projectId: "cool-message-board-87941",
    storageBucket: "cool-message-board-87941.appspot.com",
    messagingSenderId: "1001334938594",
    appId: "1:1001334938594:web:fe529630988de9314e37bb"
}

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)

