// src/services/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const firebaseConfig = {
  // Your web app's Firebase configuration
  // Replace with your actual Firebase config object
  apiKey: "AIzaSyBuPohhh3mhxzdGOFrjt7XbmC2v0Kx9u9c",
  authDomain: "hwasungflix.firebaseapp.com",
  projectId: "hwasungflix",
  storageBucket: "hwasungflix.appspot.com",
  messagingSenderId: "864248956011",
  appId: "1:864248956011:web:4d23ed52dd0d3112471d2e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Auth functions
export const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = () => {
  return signOut(auth);
};

// Firestore functions
export const addFile = (userId, fileData) => {
  return addDoc(collection(db, 'users', userId, 'files'), fileData);
};

export const getFiles = async (userId) => {
  const querySnapshot = await getDocs(collection(db, 'users', userId, 'files'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const deleteFile = (userId, fileId) => {
  return deleteDoc(doc(db, 'users', userId, 'files', fileId));
};

// Storage functions
export const uploadFile = async (file, userId, fileName) => {
    const storage = getStorage();
    const storageRef = ref(storage, `files/${userId}/${fileName}`);
    
    try {
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return { downloadURL };
    } catch (error) {
      console.error("Error in uploadFile:", error);
      throw error;
    }
  };

export const getFileUrl = (userId, fileName) => {
  const storageRef = ref(storage, `files/${userId}/${fileName}`);
  return getDownloadURL(storageRef);
};

export const deleteFileFromStorage = (userId, fileName) => {
  const storageRef = ref(storage, `files/${userId}/${fileName}`);
  return deleteObject(storageRef);
};

export { auth, db, storage };