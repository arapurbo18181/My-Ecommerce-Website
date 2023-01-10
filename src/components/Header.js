import React, { useEffect } from "react";
import { useSidebar } from "../contexts/SidebarContext";
import { BsBag } from "react-icons/bs";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import Logo from "../img/logo.svg";
import { useState } from "react";

const Header = () => {
  const [IsActive, setIsActive] = useState(false);
  const { IsOpen, setIsOpen, handleClose } = useSidebar();
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
  

  return (
    <header className={`${IsActive ? "bg-white py-4 shadow-md" : "bg-none py-6" } fixed w-full z-10 transition-all`}>
      <div className="container mx-auto flex items-center justify-between h-full">
        <Link to={"/"}>
          <div>
            <img className="w-[40px]" src={Logo} alt="" />
          </div>
        </Link>
        <div
          className="cursor-pointer flex relative"
          onClick={() => setIsOpen(!IsOpen)}
        >
          <BsBag className="text-2xl" />
          <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
            {ItemAmount}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
