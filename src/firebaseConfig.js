import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getFirestore,
    collection,
    getDocs,
    getDoc,
    addDoc,
    doc,
    query,
    where
} from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBmjsmbV9rpXILfcoXsoe8p1EMighK8NgM",
    authDomain: "celeriumpatinaje-4fea7.firebaseapp.com",
    projectId: "celeriumpatinaje-4fea7",
    storageBucket: "celeriumpatinaje-4fea7.firebasestorage.app",
    messagingSenderId: "555048583746",
    appId: "1:555048583746:web:c0b9766231d794cf5e63db",
    measurementId: "G-J3EE6WSHHC"
};

// Inicialización de Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Firestore

// Exportar las funciones necesarias
export {
    db,           // La base de datos
    collection,   // Función para obtener colecciones
    getDocs,      // Función para obtener documentos
    getDoc,       // Función para obtener un documento específico
    addDoc,       // Función para agregar un documento
    doc,          // Función para obtener la referencia de un documento
    query,        // Función para realizar consultas
    where,        // Función para consultas condicionales
    getAnalytics  // Función para obtener análisis
};