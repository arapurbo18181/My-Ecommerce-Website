import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

const FirebaseContext = createContext();

export const useFirebase = ()=> useContext(FirebaseContext);



const firebaseConfig = {
    apiKey: "AIzaSyDXsTG6hG356eKkQxISGrPVAD4SD3DR9D4",
    authDomain: "ecommerce-30ffe.firebaseapp.com",
    projectId: "ecommerce-30ffe",
    storageBucket: "ecommerce-30ffe.appspot.com",
    messagingSenderId: "860109325224",
    appId: "1:860109325224:web:15578d623e1ddde5f0939d"
  };
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);
  const provider = new GoogleAuthProvider();



export const FirebaseProvider = (props)=> {

    const [User, setUser] = useState(false);

    const signUpWithEmailAndPassword = async (email, passsword) => {
        // setUserName(name);
        await createUserWithEmailAndPassword(auth, email, passsword).catch(err=>alert(err));
      }
    
      const loginWithEmailAndPassword = (email, passsword) => {
        signInWithEmailAndPassword(auth, email, passsword).catch(err=>alert(err));
      }

      const logOut = () =>{
        signOut(auth);
      }
    

      useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }else{
                setUser(false)
            }
        })

      }, []);

      const addProduct = async (id, title, price, description, category, image) => {
        const imageRef = ref(storage, `uploads/images/${Date.now()}${image.name}`);
        const uploadImage = await uploadBytes(imageRef, image);
        return await addDoc(collection(db, "products"),{
          id : Number(id),
          title,
          price : Number(price),
          description,
          category,
          imageURL: uploadImage.ref.fullPath
        });
      }

      const getProducts = () =>{
        return getDocs(collection(db, "products"));
      }

      const getImageUrl = (path) =>{
        return getDownloadURL(ref(storage,path));
      }

      const loginWithGoogle = () => {
        return signInWithPopup(auth, provider)
      }
      


    return (
        <FirebaseContext.Provider value={{signUpWithEmailAndPassword, loginWithEmailAndPassword, logOut, addProduct, getProducts, getImageUrl, loginWithGoogle, User}}>
            {props.children}
        </FirebaseContext.Provider>
    )
}
