import React, { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useFirebase } from "../contexts/FirebaseContext";
import OrderItem from "./OrderItem";

const Orders = ({ ...item }) => {
  const { Total } = useCart();
  const { setReject, setConfirm, Confirm, Reject, User } = useFirebase();
  // console.log(item);
  const { CartItems, Info } = item;
  // console.log(CartItems)
  console.log(item.Info.email);

  const handleConfirm = (e) => {
    e.preventDefault();
    if (item.Info.email) {
      setConfirm(true);
    }
  };

  const handleReject = (e) => {
    e.preventDefault();
    if (item.Info.email) {
      setReject(true);
    }
  };

  return (
    <li className="border my-4 border-red-500">
      <div className="p-4">
        <h1>Order from: {Info.myName}</h1>
        <h1>Email: {Info.email}</h1>
      </div>
      <div className="h-[200px] overflow-y-auto overflow-x-hidden">
        {CartItems.map((item) => {
          return <OrderItem item={item} />;
        })}
      </div>
      <div className="uppercase font-semibold my-2">
        <span className="mr-2"> Total: </span> ${" "}
        {parseFloat(Info.totalAmount).toFixed(2)}
      </div>
      
        <div className="flex justify-evenly items-center my-2">
          <button
            onClick={handleReject}
            className="py-2 px-4 rounded-full text-white bg-red-500"
          >
            Reject
          </button>
          <button
            onClick={handleConfirm}
            className="py-2 px-4 rounded-full text-white bg-green-500"
          >
            Confirm
          </button>
        </div>
      {/* {
          Reject && <div className="bg-red-500 py-2 px-4 rounded-full text-white"> Order Rejected </div>
        }
        {
          Confirm && <div className="bg-green-500 py-2 px-4 rounded-full text-white"> Order Confirmed</div>
        } */}
    </li>
  );
};

export default Orders;
