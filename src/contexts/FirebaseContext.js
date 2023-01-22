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
  apiKey: "AIzaSyDgNqiAv2XhDiPyBRVhULsuCabDC-x8eYo",
  authDomain: "ecommerce-29f43.firebaseapp.com",
  projectId: "ecommerce-29f43",
  storageBucket: "ecommerce-29f43.appspot.com",
  messagingSenderId: "96470295319",
  appId: "1:96470295319:web:a87455db04f76b2b244d52"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {
  const [User, setUser] = useState(false);
  const [MyCategory, setMyCategory] = useState([]);
  const [Confirm, setConfirm] = useState(false);
  const [Reject, setReject] = useState(false);
  const [MyOrders, setMyOrders] = useState();
  const [OrderItem, setOrderItem] = useState([]);
  const [CartItems, setCartItems] = useState([])
  const [MyProduct, setMyProduct] = useState([])
  const [Info, setInfo] = useState({
    myName: "",
    email: "",
    address: "",
    phoneNumber: 0,
    city: "",
    district: "",
    postCode: 0,
    totalAmount: 0
  })

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

  const addProduct = async (ProductId, title, price, description, category, image) => {
    const imageRef = ref(storage, `uploads/images/${Date.now()}${image.name}`);
    const uploadImage = await uploadBytes(imageRef, image);
    return await addDoc(collection(db, "products"), {
      ProductId: Number(ProductId),
      title,
      price: Number(price),
      description,
      category,
      imageURL: uploadImage.ref.fullPath,
    });
  };

  const addProductForCart = async (product) => {
    const { amount, ProductId, category, description, email, imageURL, price, title } = product;
    return await setDoc(doc(db, `${User.email}/${ProductId}`), {
      ProductId: Number(ProductId),
      amount: Number(amount),
      category,
      description,
      email,
      imageURL,
      price: Number(price),
      title
    });
  };

  const addProductsForOrder = async () =>{
    getProductsForCart();
    console.log(CartItems)
    console.log(Info)
    return await setDoc(doc(db, `orders/${User.email}`),{
      CartItems,
      Info
    });
  }

  const plusAmount = async (product) => {
    // const { amount, ProductId, category, description, email, imageURL, price, title } = product;
    // const q = query(collection(db, "orders"), where("email" && "ProductId", "==", User.email && ProductId ));
    const {ProductId} = product
     await updateDoc( doc(db, `${User.email}/${ProductId}` ) , {
      amount: increment(1),
    });
  };

  const getDocument = (product) =>{
    const {id} = product
    return getDoc(doc(db,`orders/${id}` ));
  }

  const minusAmount = async (product) => {
    const { amount, ProductId } = product;
    if (amount < 2) {

    } else {
      await updateDoc(doc(db, `${User.email}/${ProductId}` ), {
        amount: increment(-1),
      });
    }
  };

  const getProducts = () => {
    return getDocs(collection(db, "products"));
  };

  const getAllProducts = () =>{
    getProducts().then((item) =>
      setMyProduct(
        item.docs.map((elem) => {
          return elem.data();
        })
      )
    );
    setMyCategory(MyProduct);
  }

  const getProductsForCart = () => {
    // const q = query(collection(db, "orders"), where("email", "==", User.email));
    // console.log(q)
    onSnapshot(collection(db, `${User.email}`),(querySnapshot)=>{
      // console.log(querySnapshot);
      const items = [];
      querySnapshot.forEach((doc)=>{
        items.push(doc.data());
        // console.log(doc.data())
      })
      setCartItems(items);
      // console.log(items);
    })
  };

  const getProductsForOrders = () =>{
    onSnapshot(collection(db, "orders"),(querySnapshot)=>{
      const items = [];
      querySnapshot.docs.forEach((doc)=>{
        items.push(doc.data());
        // console.log(doc.data())
      })
      setOrderItem(items);
      // console.log(items)
    })
  }

  const getMyOrders = () =>{
    onSnapshot(doc(db, `orders/${User.email}`), (querySnapshot)=>{
      setMyOrders(querySnapshot.data());
    })
  }

  const getImageUrl = (path) => {
    return getDownloadURL(ref(storage, path));
  };

  const loginWithGoogle = () => {
    signInWithPopup(auth, provider);
  };

  const deleteAllDocsFromCart = async ()=> {
    const data = await getDocs(collection(db, `${User.email}`)).then(item=>item)
    data.docs.map(item=>{
      deleteDoc(doc(db, `${User.email}/${item.data().ProductId}`));
    })
  }

  const getProductById = async (id) => {
    const collectionRef = collection(db, "products");
    const q = query(collectionRef, where("id", "==", id));

    const result = await getDocs(q);
    return result;
  };

  const removeProductFromCart = async (product) => {
    const { ProductId } = product;
    await deleteDoc(doc(db, `${User.email}/${ProductId}`));
    getProductsForCart()
  };

  const removeMyOrder = async () => {
    await deleteDoc(doc(db, `orders/${User.email}`));
  }

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
        deleteAllDocsFromCart,
        getAllProducts,
        addProductsForOrder,
        getProductsForOrders,
        OrderItem,
        MyProduct,
        setMyProduct,
        CartItems,
        User,
        Info,
        setInfo,
        getMyOrders,
        MyOrders,
        Confirm,
        setConfirm,
        Reject,
        setReject,
        removeMyOrder,
        MyCategory,
        setMyCategory
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
