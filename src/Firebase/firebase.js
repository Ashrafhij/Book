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
  query,
  where
} from "firebase/firestore/lite";


import { v4 as uuidv4 } from 'uuid';

// import { getStorage, ref } from "firebase/storage";
import { getStorage, ref, uploadBytes , uploadString ,getDownloadURL} from "firebase/storage";

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
const storage = getStorage(app);
const storageRef = ref(storage);

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


export const uploadImage = async (imageName, uploadUri) => {


// Create a root reference
// const storage = getStorage();

// Create a reference to 'mountains.jpg'
const mountainsRef = ref(storage, 'mountains.jpg');

// Create a reference to 'images/mountains.jpg'
const mountainImagesRef = ref(storage, 'images/mountains.jpg');

// // While the file names are the same, the references point to different files
// mountainsRef.name === mountainImagesRef.name;           // true
// mountainsRef.fullPath === mountainImagesRef.fullPath;   // false 

  // firebase
    // db.
    // storage
    // .ref(imageName)
    // .putFile(uploadUri)
    // .then((snapshot) => {
    //   //You can check the image is now uploaded in the storage bucket
    //   console.log(`${imageName} has been successfully uploaded.`);
    // })
    // .catch((e) => console.log('uploading image error => ', e));

    //const storage = getStorage();
    const ImageStorageRef = ref(storage, uploadUri);

    // Data URL string
  /*  uploadString(ImageStorageRef, uploadUri, 'data_url').then((snapshot) => {
      console.log('Uploaded a data_url string!');
    });
*/
    const message4 = 'data:text/plain;base64,5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB';
    
    // 'file' comes from the Blob or File API
     uploadBytes(ImageStorageRef, uploadUri).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });


    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  
    const fileRef = ref(getStorage(), uuid.v4());
    const result = await uploadBytes(fileRef, blob);
  
    // We're done with the blob, close and release it
    blob.close();
  
    return await getDownloadURL(fileRef);
  

};

export async function uploadImageAsync(uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const fileRef = ref(getStorage(),getRandomID());
  const result = await uploadBytes(fileRef, blob);
  // We're done with the blob, close and release it
  blob.close();
  let imageUrl = ""
  getDownloadURL(fileRef).then(imgUrl=>{
    console.log("imgUrl " +imgUrl);
    imageUrl = imgUrl
  }).catch(err=>{
    console.log("err" ,imageUrl);
  })
  return imageUrl
   
}

export const getRandomID = () => {
  var S4 = function() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  };
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());

}

export const authenticateUser = async (userDetails) => {

  let dataCol = collection(db, "organization");

  const q1 = query(dataCol, where("password", "==", userDetails.password),
                           where("username", "==", userDetails.username) );

  const q2 = query(dataCol, where("password", "==", userDetails.password),
                            where("phone", "==", userDetails.username) );

  const querySnapshot1 = await getDocs(q1);
  const querySnapshot2 = await getDocs(q2);

  let authenticationDetails={authenticated:false,orgDetails:{}}

  querySnapshot1.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    let temp = {authenticated:true,orgDetails:doc.data(),orgID:doc.id}
    authenticationDetails = temp
  });

  querySnapshot2.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    let temp = {authenticated:true,orgDetails:doc.data(),orgID:doc.id}
    authenticationDetails = temp
    // return doc.data()
  });
  return authenticationDetails
}

export const getAppsOfSpecificOrg = async (orgID) => {

  let dataCol = collection(db, "appointments");

  const q = query(dataCol, where("orgID", "==", orgID) );

  const querySnapshot = await getDocs(q);

  let dataList = querySnapshot.docs.map((doc) => {
    if (doc.data().appID) {
     return doc.data() ;
    }
     return {...doc.data() , appID:doc.id};
   });
   return dataList;
}
