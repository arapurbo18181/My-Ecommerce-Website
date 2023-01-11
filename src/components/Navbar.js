import React from "react";
import { Link } from "react-router-dom";
import { useFirebase } from "../contexts/FirebaseContext";

const Navbar = () => {
  const { User, logOut, } = useFirebase();
  if (User) {
    return (
      <div className="flex gap-x-5">
        <Link to={"/"}>Home</Link>
        <Link to={"/products"}>All Products</Link>
        <button onClick={logOut} >Logout</button>
        <div className="font-bold">
             Welcome, {User.email}
        </div>
      </div>
    );
  }else{
    return (
      <div className="flex gap-x-5">
        <Link to={"/"}>Home</Link>
        <Link to={"/products"}>All Products</Link>
        <Link to={"/login"}>Login</Link>
        <Link to={"/signup"}>Sign Up</Link>
      </div>
    );
  }
};

export default Navbar;
