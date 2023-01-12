import React, { useState } from "react";
import { useEffect } from "react";
import { AiFillGooglePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../contexts/FirebaseContext";

const Login = () => {
    const {loginWithEmailAndPassword, loginWithGoogle, User} = useFirebase();

    const [Email, setEmail] = useState();
    const [Password, setPassword] = useState();
    const navigate = useNavigate();

    const login = async (e) =>{
        e.preventDefault();
        await loginWithEmailAndPassword(Email,Password);
        setEmail("");
        setPassword("");
    }

    

    useEffect(() => {
        if (User) {
            navigate("/")
        }
    }, [User, navigate])
    

  return (
    <section className="bg-[#f9fafb] w-screen h-screen flex justify-center items-center">
      <form onSubmit={login} className="w-[500px] h-[500px] bg-white drop-shadow-2xl rounded-lg">
        <div className="flex justify-center my-5 text-4xl font-bold">
          <h1>Log In</h1>
        </div>
        <div className="px-10">
          <div className="flex flex-col items-start my-4">
            <label htmlFor="email">Email</label>
            <input onChange={e=>setEmail(e.target.value)} value={Email}
              className="w-full outline-none border-2 rounded-md py-1 px-1 mt-1"
              type="email"
              name="email"
              placeholder="Enter Your Email"
              id=""
              required
            />
          </div>
          <div className="flex flex-col items-start my-4">
            <label htmlFor="passsword">Password</label>
            <input onChange={e=>setPassword(e.target.value)} value={Password}
              className="w-full outline-none border-2 rounded-md py-1 px-1 mt-1"
              type="password"
              name="password"
              placeholder="Enter Your Password"
              id=""
              required
            />
          </div>
          <div className="flex justify-end">
            <h2 className="cursor-pointer">Forgot Your Password?</h2>
          </div>
          <div className="w-full flex justify-center my-4">
            <button className="w-full bg-red-500 text-white py-2 rounded-full hover:bg-red-600">
              Log In
            </button>
          </div>
          <div className="flex justify-evenly">
            <div className="h-[1px] w-1/4 bg-gray-300 mt-3"></div>
            <div>Or Log In with</div>
            <div className="h-[1px] w-1/4 bg-gray-300 mt-3"></div>
          </div>
          <div className="flex justify-center items-center mt-4">
            <AiFillGooglePlusCircle onClick={loginWithGoogle} className="text-4xl text-red-500 hover:text-red-600 cursor-pointer" />
          </div>
        </div>
      </form>
    </section>
  );
};

export default Login;
