import React from 'react';
import { Link } from 'react-router-dom';
import {IoMdArrowForward} from "react-icons/io";
import {FiTrash2} from "react-icons/fi";
import CartItem from "./CartItem";
import { useSidebar } from '../contexts/SidebarContext';
import { useCart } from '../contexts/CartContext';
import { useFirebase } from '../contexts/FirebaseContext';
import { useEffect } from 'react';
import { useState } from 'react';

const Sidebar = () => {
  const {Cart, clearCart, Total, ItemAmount, Data, setData} = useCart();
  const {IsOpen,  handleClose} = useSidebar();
  const {getProductsForCart, getProductById, getItems, CartItems, deleteAllDocsFromCart} = useFirebase();
  const [Items, setItems] = useState([]);

  useEffect(() => {
    getProductsForCart()
  },[]);

  return(
    <div className={` ${IsOpen ? "right-0" : "-right-full"} w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-500 z-20 px-4 lg:px-[35px]`}>
      <div className='flex items-center justify-between py-6 border-b'>
      <div className='uppercase text-sm font-semibold'>
        Shooping Bag ({ItemAmount})
      </div>
        <div onClick={handleClose} className='cursor-pointer w-8 h-8 flex justify-center items-center'>
          <IoMdArrowForward className='text-2xl' />
        </div>
      </div>
      <div className='flex flex-col gap-y-2 h-[430px] lg:h-640px overflow-y-auto overflow-x-hidden border-b'>
        {CartItems.map((item)=>{
          return(
            <CartItem {...item} key={item.ProductId} />
          )
        })}
       </div>
       <div className='flex flex-col gap-y-3 py-4 mt-4'>
        <div className='flex justify-between items-center w-full'>
          <div className='uppercase font-semibold'>
            <span className='mr-2'> Total: </span> $ {parseFloat(Total).toFixed(2)}
          </div>
          <div onClick={deleteAllDocsFromCart} className='cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl'>
            <FiTrash2/>
          </div>
        </div>
        <Link onClick={handleClose} to={"/cart"} className="bg-gray-200 flex p-4 justify-center items-center text-primary w-full font-medium" >View Cart</Link>
        <Link onClick={handleClose} to={"/checkout"} className="bg-primary flex p-4 justify-center items-center text-white w-full font-medium">Checkout</Link>
       </div>
    </div>
  )
};

export default Sidebar;
