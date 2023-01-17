import userEvent from '@testing-library/user-event';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import { useFirebase } from './FirebaseContext';

const CartContext = createContext();

export const useCart = ()=> useContext(CartContext);

export const CartProvider = (props) => {
  const [Cart, setCart] = useState([]);
  const [Data, setData] = useState([]);

  const [ItemAmount, setItemAmount] = useState(0);

  const [Total, setTotal] = useState(0);

  const {addProductForCart, plusAmount, minusAmount, removeProductFromCart, getProducts, getProductsForCart, User, CartItems} = useFirebase()

  
  const [MyProduct, setMyProduct] = useState([]);
  
  // useEffect(() => {
  //   getProductsForCart().then((item) =>
  //     setMyProduct(
  //       item.docs.map((elem) => {
  //         return elem.data();
  //       })
  //     )
  //   );
  // }, [getProductsForCart]);

  useEffect(() => {
    const total = CartItems.reduce((accumulator, currentItem)=>{
      return accumulator + currentItem.price * currentItem.amount;
    }, 0);
    setTotal(total);
  });
  

  useEffect(() => {
    if (CartItems) {
      const amount = CartItems.reduce((accumulator, currentItem)=>{
        return (accumulator + currentItem.amount)
      },0);
      setItemAmount(Number(amount));
    }
  }, [CartItems])
  

  const totalAmount = (product) => {
    // const amount = product.reduce((accumulator, currentItem)=>{
    //   console.log(accumulator + currentItem.amount)
    // },0);
    // setItemAmount(Number(amount));
  }

  const addToCart = (product) =>{
    const newItem = {...product, amount: 1, email: User.email};
    const cartItem = MyProduct.find(item => {
      return item.ProductId === product.ProductId;
    });
    if (cartItem) {
      // const newCart = [...Cart].map((item)=>{
      //   if (item.id === product.id) {
      //     console.log({...item, amount: cartItem.amount + 1, email: User.email});
      //   }else{
      //     return item;
      //   }
      // });
      // const newitem = [...Cart].find((item)=>{
      //   if (item.id === product.id) {
      //     return item;
      //   }
      // });
      // setCart(newCart);
      plusAmount(cartItem);
    }else{
      setMyProduct([...MyProduct, newItem]);
      addProductForCart(newItem);
    }
  };

  














  const removeFromCart = (id)=>{
    const newCart = Cart.filter(item =>{
      return item.id !== id; 
    });
    setCart(newCart);
  }

  const clearCart = () =>{
    setCart([]);
  }

  const increaseAmount = (product) =>{
    const {id} = product;
    const cartItem = Cart.find(item=>item.id === id);
    addToCart(product);
  }

  const decreaseAmount = (product) => {
    const {id} = product
    const cartItem = Cart.find(item => item.id === id);
    if (cartItem) {
      const newCart = Cart.map(item=>{
        if (item.id === id) {
          return {...item, amount: cartItem.amount - 1};
        }else{
          return item;
        }
      });
      const newitem = Cart.find(item=>{
        if (item.id === id) {
          return {...item, amount: cartItem.amount - 1};
        }
      });
      setCart(newCart);
      minusAmount(product);
    }
      if (product.amount<1) {
        removeProductFromCart(product);
      }
  }

  return(
    <CartContext.Provider value={{Cart, addToCart, removeFromCart, clearCart, increaseAmount, decreaseAmount, ItemAmount, Total, Data, setData, totalAmount, MyProduct, setMyProduct}}>
      {props.children}
    </CartContext.Provider>
  )
}
