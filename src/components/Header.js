import React, { useEffect } from "react";
import { useSidebar } from "../contexts/SidebarContext";
import { BsBag } from "react-icons/bs";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import Logo from "../img/logo.svg";
import { useState } from "react";
import Navbar from "./Navbar";
import { useFirebase } from "../contexts/FirebaseContext";

const Header = () => {
  const [IsActive, setIsActive] = useState(false);
  const { IsOpen, setIsOpen, handleClose } = useSidebar();
  const {User} = useFirebase();
  const {
    Cart,
    addToCart,
    removeFromCart,
    clearCart,
    increaseAmount,
    decreaseAmount,
    ItemAmount,
  } = useCart();

  useEffect(() => {
    window.addEventListener("scroll", ()=>{
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    })
  }, [])
  

  const openCart = () =>{
    if (User) {
      setIsOpen(!IsOpen); 
    }else{
      alert("Please Login first.....");
    }
  }

  return (
    <header className={`${IsActive ? "bg-white py-4 shadow-md" : "bg-none py-6" } fixed w-full z-10 transition-all`}>
      <div className="container mx-auto flex items-center justify-between h-full">
        <div className="flex justify-center items-center gap-x-5">
          <Link to={"/"}>
            <img className="w-[40px]" src={Logo} alt="" />
          </Link>
          {
          User.email === "md.abdul.zabber.islam.apurbo@g.bracu.ac.bd" ? <Link className="font-bold" to={"/admin"}>Admin Dashboard</Link> : ""
        }
        </div>
        
        <div
          className="cursor-pointer flex relative justify-center items-center gap-x-5"
        >
        <Navbar/>
          <BsBag
          onClick={openCart} className="text-2xl" />
          <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
            {ItemAmount}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
