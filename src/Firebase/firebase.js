// Import the functions you need from the SDKs you need
import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore/lite";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALByJVEEeI1HB5i2FhW2stfwg4IaIt8NY",
  authDomain: "book-acbcb.firebaseapp.com",
  projectId: "book-acbcb",
  storageBucket: "book-acbcb.appspot.com",
  messagingSenderId: "71645585256",
  appId: "1:71645585256:web:6414bb84b256e35acfc0dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let db = getFirestore(app);

export const getData = async (table = "organization") => {
  try {
    let dataCol = collection(db, table);
    let dataSnapShot = await getDocs(dataCol);
    let dataList = dataSnapShot.docs.map((doc) => {
     //  console.log(`${doc.id} => `, doc.data());
     if (doc.data().orgID) {
      return doc.data() ;
       
     }
      return {...doc.data() , orgID:doc.id};
    });
    return dataList;
  } catch (error) {
    console.log("error", error);
  }
};


export const addDataDoc = async (
  table = "users",
  docDetails = {}
) => {
  // let objectToAdd = { name, age };
   let objectToAdd = docDetails;
  try {
    const docRef = await addDoc(collection(db, table), objectToAdd);
    console.log("Document added with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};


export const updateData = async (table = "users", docToUpdate = {}) => {
  try {
    const docRef = await setDoc(
      doc(db, table, docToUpdate.id || "gQKjMYaaW2AyF246z6TW"),
      {
        ...docToUpdate,
        name: "yooooo",
        //   age: 123,
      }
    );
    console.log("Document updated with ID: ", docRef);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};


export const deleteThisDoc = async (id = "", table = "users") => {
  try {
    let res = await deleteDoc(doc(db, table, id || "C3hYExOTSfJZflN9eMxF"));
    console.log("the document has been deleted", res);
  } catch (error) {
    console.log("error - deleating operation has been faild", error);
  }
};


export const getById = async (id = "bqpOYRU45Lp3IVNvmzOB", table = "users") => {
  const docRef = doc(db, table, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    console.log("No such document!");
  }
};

