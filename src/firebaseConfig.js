import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBmjsmbV9rpXILfcoXsoe8p1EMighK8NgM",
    authDomain: "celeriumpatinaje-4fea7.firebaseapp.com",
    projectId: "celeriumpatinaje-4fea7",
    storageBucket: "celeriumpatinaje-4fea7.firebasestorage.app",
    messagingSenderId: "555048583746",
    appId: "1:555048583746:web:c0b9766231d794cf5e63db",
    measurementId: "G-J3EE6WSHHC"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);