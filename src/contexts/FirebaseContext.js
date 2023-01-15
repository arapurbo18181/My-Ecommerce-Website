import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  increment,
  getDoc,
  query,
  where,
  deleteDoc,
  onSnapshot
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

const FirebaseContext = createContext();

export const useFirebase = () => useContext(FirebaseContext);

const firebaseConfig = {
  apiKey: "AIzaSyDXsTG6hG356eKkQxISGrPVAD4SD3DR9D4",
  authDomain: "ecommerce-30ffe.firebaseapp.com",
  projectId: "ecommerce-30ffe",
  storageBucket: "ecommerce-30ffe.appspot.com",
  messagingSenderId: "860109325224",
  appId: "1:860109325224:web:15578d623e1ddde5f0939d",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {
  const [User, setUser] = useState(false);
  const [Url, setUrl] = useState();
  const [CartItems, setCartItems] = useState([])

  const signUpWithEmailAndPassword = async (email, passsword) => {
    await createUserWithEmailAndPassword(auth, email, passsword).catch((err) =>
      alert(err)
    );
  };

  const loginWithEmailAndPassword = (email, passsword) => {
    return signInWithEmailAndPassword(auth, email, passsword).catch((err) =>
      alert(err)
    );
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });
  }, []);

  const addProduct = async (id, title, price, description, category, image) => {
    const imageRef = ref(storage, `uploads/images/${Date.now()}${image.name}`);
    const uploadImage = await uploadBytes(imageRef, image);
    return await addDoc(collection(db, "products"), {
      id: Number(id),
      title,
      price: Number(price),
      description,
      category,
      imageURL: uploadImage.ref.fullPath,
    });
  };

  const addProductForCart = async (product) => {
    const { amount, id, category, description, email, imageURL, price, title } = product;
    return await setDoc(doc(db, `orders/${id}`), {
      id: Number(id),
      amount: Number(amount),
      category,
      description,
      email,
      imageURL,
      price: Number(price),
      title
    });
  };

  const plusAmount = async (product) => {
    const {id} = product
    await updateDoc(doc(db, `orders/${id}`), {
      amount: increment(1),
    });
  };

  const getDocument = (product) =>{
    const {id} = product
    return getDoc(doc(db,`orders/${id}` ));
  }

  const minusAmount = async (product) => {
    const { id, amount } = product;
    if (amount < 2) {
      removeProductFromCart(product);
    } else {
      await updateDoc(doc(db, `orders/${id}`), {
        amount: increment(-1),
      });
    }
  };

  const getProducts = () => {
    return getDocs(collection(db, "products"));
  };

  const getProductsForCart = () => {
    onSnapshot(collection(db, "orders"),(querySnapshot)=>{
      const items = [];
      querySnapshot.forEach((doc)=>{
        items.push(doc.data());
      })
      setCartItems(items);
    })
  };

  const getImageUrl = (path) => {
    return getDownloadURL(ref(storage, path));
  };

  const loginWithGoogle = () => {
    signInWithPopup(auth, provider);
  };

  const getProductById = async (id) => {
    const collectionRef = collection(db, "products");
    const q = query(collectionRef, where("id", "==", id));

    const result = await getDocs(q);
    return result;
  };

  const removeProductFromCart = async (product) => {
    const { id } = product;
    await deleteDoc(doc(db, `orders/${id}`));
  };

  const getItems = (product) =>{
    // const {id} = product;
    // onSnapshot(collection(db, "orders"),(querySnapshot)=>{
    //   const items = [];
    //   querySnapshot.forEach((doc)=>{
    //     console.log(doc.data())
    //   })
    // })
  }

  return (
    <FirebaseContext.Provider
      value={{
        signUpWithEmailAndPassword,
        loginWithEmailAndPassword,
        logOut,
        addProduct,
        getProducts,
        getImageUrl,
        loginWithGoogle,
        addProductForCart,
        getProductsForCart,
        plusAmount,
        minusAmount,
        getProductById,
        removeProductFromCart,
        getDocument,
        getItems,
        CartItems,
        User,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
