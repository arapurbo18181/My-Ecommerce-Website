import React from "react";
import CartItemForViewCart from "../components/CartItemForViewCart";
import { useCart } from "../contexts/CartContext";
import {FiTrash2} from "react-icons/fi";
import { Link } from "react-router-dom";

const Cart = () => {
  const { Cart, Total, clearCart } = useCart();
  return (
    <section className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="mb-4 underline mt-16">
        <h1 className="text-3xl font-bold">Your Cart</h1>
      </div>
      <div className="w-full px-7 lg:px-40">
        <div className="flex justify-between items-center bg-red-500 text-white px-4 rounded py-2 my-4">
          <div>Product</div>
          <div>Quantity</div>
          <div>Subtotal</div>
        </div>
        <div className="flex flex-col gap-y-2 h-[380px] justify-between overflow-y-auto overflow-x-hidden">
          {Cart.map((item) => {
            return <CartItemForViewCart {...item} key={item.id} />;
          })}

          
        </div>
        <div className="w-full h-[1px] bg-red-500 mt-4"></div>
        
        
        <div className='flex justify-between items-center w-full mt-5'>
          <div className='uppercase font-semibold'>
            <span className='mr-2'> Total: </span> $ {parseFloat(Total).toFixed(2)}
          </div>
          <div onClick={clearCart} className='cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl'>
            <FiTrash2/>
          </div>
        </div>
      </div>
      <div className="my-4">
      <Link to={"/checkout"} className="bg-primary flex p-4 justify-center items-center text-white w-full font-medium">Place Order</Link>
      </div>
    </section>
  );
};

export default Cart;
