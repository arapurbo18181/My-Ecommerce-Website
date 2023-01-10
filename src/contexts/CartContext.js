import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';

const CartContext = createContext();

export const useCart = ()=> useContext(CartContext);

export const CartProvider = (props) => {
  const [Cart, setCart] = useState([]);

  const [ItemAmount, setItemAmount] = useState(0);

  const [Total, setTotal] = useState(0);

  useEffect(() => {
    const total = Cart.reduce((accumulator, currentItem)=>{
      return accumulator + currentItem.price * currentItem.amount;
    }, 0);
    setTotal(total);
  });
  

  useEffect(() => {
    if (Cart) {
      const amount = Cart.reduce((accumulator, currentItem)=>{
        return accumulator + currentItem.amount;
      },0);
      setItemAmount(amount);
    }
  }, [Cart])
  

  const addToCart = (product) =>{
    const newItem = {...product, amount: 1};
    const cartItem = Cart.find(item => {
      return item.id === product.id;
    });
    if (cartItem) {
      const newCart = [...Cart].map((item)=>{
        if (item.id === product.id) {
          return {...item, amount: cartItem.amount + 1};
        }else{
          return item;
        }
      });
      setCart(newCart);
    }else{
      setCart([...Cart, newItem]);
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

  const increaseAmount = (id) =>{
    const cartItem = Cart.find(item=>item.id === id);
    addToCart(cartItem);
  }

  const decreaseAmount = (id) => {
    const cartItem = Cart.find(item => item.id === id);
    if (cartItem) {
      const newCart = Cart.map(item=>{
        if (item.id === id) {
          return {...item, amount: cartItem.amount - 1};
        }else{
          return item;
        }
      });
      setCart(newCart);
    }
      if (cartItem.amount<=1) {
        removeFromCart(id);
      }
  }

  return(
    <CartContext.Provider value={{Cart, addToCart, removeFromCart, clearCart, increaseAmount, decreaseAmount, ItemAmount, Total}}>
      {props.children}
    </CartContext.Provider>
  )
}
