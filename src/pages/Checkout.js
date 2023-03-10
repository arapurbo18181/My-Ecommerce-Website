import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useFirebase } from "../contexts/FirebaseContext";

const Checkout = () => {

  const {Info, setInfo, addProductsForOrder, getProductsForCart, deleteAllDocsFromCart, User} = useFirebase();
  const {Total} = useCart();
  const navigate = useNavigate();

  // const [Info, setInfo] = useState({
  //   myName: "",
  //   email: "",
  //   address: "",
  //   phoneNumber: 0,
  //   city: "",
  //   district: "",
  //   postCode: 0
  // })

  useEffect(() => {
    getProductsForCart();
  }, [])
  
  useEffect(() => {
    if (!User) {
      navigate("/")
    }
  }, [])
  

  const handleSubmit = (e) =>{
    e.preventDefault();
    addProductsForOrder()
    setInfo({...Info ,totalAmount: Total });
    deleteAllDocsFromCart()
    setInfo({
      myName: "",
      email: "",
      address: "",
      phoneNumber: 0,
      city: "",
      district: "",
      postCode: 0,
      totalAmount: 0
    })
  }

  return (
    <section className="w-screen h-screen flex justify-center items-center">
      <form className="w-[1000px] h-[550px]">
        <div className="flex justify-center my-5 text-4xl font-bold">
          <h1>Checkout</h1>
        </div>
        <div className="px-10">
          <div className="flex justify-start items-center">
            <div className="flex flex-col items-start my-4 w-full">
              <label htmlFor="email">Name</label>
              <input onChange={e=>setInfo({...Info ,myName:e.target.value})} value={Info.myName}
                className="w-full outline-none border-2 rounded-md py-1 px-1 mt-1"
                type="text"
                name="name"
                placeholder="Enter Your Name"
                id="name"
                required
              />
            </div>
            <div className="flex flex-col items-start my-4 w-full ml-4">
              <label htmlFor="email">Email</label>
              <input onChange={e=>setInfo({...Info ,email:e.target.value})} value={Info.email}
                className="w-full outline-none border-2 rounded-md py-1 px-1 mt-1"
                type="email"
                name="email"
                placeholder="Enter Your Email"
                id="email"
                required
              />
            </div>
          </div>
          <div className="flex flex-col items-start my-4">
            <label htmlFor="address">Address</label>
            <textarea onChange={e=>setInfo({...Info ,address:e.target.value})} value={Info.address}
              className="w-full outline-none border-2 rounded-md py-1 px-1 mt-1"
              type="text"
              name="address"
              placeholder="Enter Your Address"
              id="address"
              required
            />
          </div>

          <div className="flex justify-start items-center">
            <div className="flex flex-col items-start my-4 w-full">
              <label htmlFor="phone">Phone</label>
              <input onChange={e=>setInfo({...Info ,phoneNumber: parseInt(e.target.value)})} value={Info.phoneNumber}
                className="w-full outline-none border-2 rounded-md py-1 px-1 mt-1"
                type="number"
                name="phone"
                placeholder="Enter Your phone number"
                id="phone"
                required
              />
            </div>
            <div className="flex flex-col items-start my-4 w-full ml-4">
              <label htmlFor="city">City</label>
              <input onChange={e=>setInfo({...Info ,city:e.target.value})} value={Info.city}
                className="w-full outline-none border-2 rounded-md py-1 px-1 mt-1"
                type="text"
                name="city"
                placeholder="Enter Your city"
                id="city"
                required
              />
            </div>
          </div>
          <div className="flex justify-start items-center">
            <div className="flex flex-col items-start my-4 w-full">
              <label htmlFor="district">District</label>
              <input onChange={e=>setInfo({...Info ,district:e.target.value})} value={Info.district}
                className="w-full outline-none border-2 rounded-md py-1 px-1 mt-1"
                type="text"
                name="district"
                placeholder="Enter Your district"
                id="district"
                required
              />
            </div>
            <div className="flex flex-col items-start my-4 w-full ml-4">
              <label htmlFor="postcode">Post Code</label>
              <input onChange={e=>setInfo({...Info ,postCode:parseInt(e.target.value)})} value={Info.postCode}
                className="w-full outline-none border-2 rounded-md py-1 px-1 mt-1"
                type="number"
                name="postcode"
                placeholder="Enter Your postcode"
                id="postcode"
                required
              />
            </div>
          </div>
          <div className="w-full flex text-sm sm:text-xl justify-center my-4">
            <button className="w-full bg-red-500 px-2 sm:px-4 text-white py-2 rounded-full hover:bg-red-600">
              Make Payment
            </button>
            <span className="mx-5 mt-2">Or</span>
            <button onClick={handleSubmit} className="w-full bg-red-500 px-2 sm:px-4 text-white py-2 rounded-full hover:bg-red-600">
              Cash On Delivery
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Checkout;
