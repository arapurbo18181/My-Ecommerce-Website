import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFirebase } from "../contexts/FirebaseContext";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const { User, logOut } = useFirebase();
  const [ToggleMenu, setToggleMenu] = useState(false);
  const navigate = useNavigate();

  const toggle = () => {
    setToggleMenu(!ToggleMenu);
  };

  const logOutAndToggle = () => {
    logOut();
    toggle();
    navigate("/");
    toast("You Are Logged Out");
  };

  const handleLogout = () => {
    logOut();
    navigate("/");
    toast("You Are Logged Out");
  };

  if (User) {
    return (
      <>
        <div className="gap-x-5 hidden lg:flex">
          <Link to={"/"}>Home</Link>
          <Link to={"/products"}>All Products</Link>
          <Link to={"/myaccount"}>My Account</Link>
          <button onClick={handleLogout}>Logout</button>
          <div className="font-bold">Welcome, {User.email}</div>
        </div>
        <div className="block lg:hidden">
          <FaBars onClick={toggle} className="text-2xl" />
        </div>
        <div
          className={`h-screen w-screen fixed ${
            ToggleMenu ? "right-0" : "-right-full"
          } transition-all duration-500 top-0 text-black bg-white flex flex-col z-20`}
        >
          <div className="flex flex-col justify-center items-start w-full h-full relative px-4 text-2xl gap-y-4">
            <div className="absolute top-2 right-2">
              <IoMdClose onClick={toggle} className="text-2xl" />
            </div>
            <Link
              onClick={toggle}
              className="border-b bg-white border-black pb-1"
              to={"/"}
            >
              Home
            </Link>
            <Link
              onClick={toggle}
              className="border-b bg-white border-black pb-1"
              to={"/products"}
            >
              All Products
            </Link>
            <Link
              onClick={toggle}
              className="border-b bg-white border-black pb-1"
              to={"/myaccount"}
            >
              My Account
            </Link>
            <button
              className="border-b border-black pb-1"
              onClick={logOutAndToggle}
            >
              Logout
            </button>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="gap-x-5 hidden lg:flex">
          <Link to={"/"}>Home</Link>
          <Link to={"/products"}>All Products</Link>
          <Link to={"/login"}>Login</Link>
          <Link to={"/signup"}>Sign Up</Link>
        </div>
        <div className="block lg:hidden">
          <FaBars onClick={toggle} className="text-2xl" />
        </div>
        <div
          className={`h-screen w-screen fixed ${
            ToggleMenu ? "right-0" : "-right-full"
          } transition-all duration-500 top-0 text-black bg-white flex flex-col z-20`}
        >
          <div className="flex flex-col justify-center items-start w-full h-full relative px-4 text-2xl gap-y-4">
            <div className="absolute top-2 right-2">
              <IoMdClose onClick={toggle} className="text-2xl" />
            </div>
            <Link
              onClick={toggle}
              className="border-b border-black pb-1"
              to={"/"}
            >
              Home
            </Link>
            <Link
              onClick={toggle}
              className="border-b border-black pb-1"
              to={"/products"}
            >
              All Products
            </Link>
            <Link
              onClick={toggle}
              to={"/login"}
              className="border-b border-black pb-1"
            >
              Login
            </Link>
            <Link
              onClick={toggle}
              to={"/signup"}
              className="border-b border-black pb-1"
            >
              Sign Up
            </Link>
          </div>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </>
    );
  }
};

export default Navbar;
