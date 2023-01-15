import React, { useEffect, useState } from "react";
import { AiFillGooglePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../contexts/FirebaseContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [Name, setName] = useState();
  const [UserName, setUserName] = useState();
  const [Email, setEmail] = useState();
  const [Password, setPassword] = useState();
  const navigate = useNavigate();

  const { signUpWithEmailAndPassword, loginWithGoogle, User } = useFirebase();
  const signUp = async (e) => {
    e.preventDefault();
    await signUpWithEmailAndPassword(Email, Password);
    setUserName(Name);
    setEmail("");
    setName("");
    setPassword("");
  };

  useEffect(() => {
    if (User) {
      User.displayName = UserName;
      navigate("/");
      toast("Sign Up Successfull");
    }
  }, [User, navigate]);

  return (
    <section className="bg-[#f9fafb] w-screen h-screen flex justify-center items-center">
      <form
        onSubmit={signUp}
        className="w-[500px] h-[500px] bg-white drop-shadow-2xl rounded-lg"
      >
        <div className="flex justify-center my-5 text-4xl font-bold">
          <h1>Sign Up</h1>
        </div>
        <div className="px-10">
          <div className="flex flex-col items-start my-4">
            <label htmlFor="email">Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={Name}
              className="w-full outline-none border-2 rounded-md py-1 px-1 mt-1"
              type="text"
              name="name"
              placeholder="Enter Your Name"
              id="name"
              required
            />
          </div>
          <div className="flex flex-col items-start my-4">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={Email}
              className="w-full outline-none border-2 rounded-md py-1 px-1 mt-1"
              type="email"
              name="email"
              placeholder="Enter Your Email"
              id="email"
              required
            />
          </div>
          <div className="flex flex-col items-start my-4">
            <label htmlFor="passsword">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={Password}
              className="w-full outline-none border-2 rounded-md py-1 px-1 mt-1"
              type="password"
              name="password"
              placeholder="Enter Your Password"
              id="password"
              required
            />
          </div>
          <div className="w-full flex justify-center my-4">
            <button className="w-full bg-red-500 text-white py-2 rounded-full hover:bg-red-600">
              Sign Up
            </button>
          </div>
          <div className="flex justify-evenly">
            <div className="h-[1px] w-1/4 bg-gray-300 mt-3"></div>
            <div>Or Log In with</div>
            <div className="h-[1px] w-1/4 bg-gray-300 mt-3"></div>
          </div>
          <div className="flex justify-center items-center mt-4">
            <AiFillGooglePlusCircle
              onClick={loginWithGoogle}
              className="text-4xl text-red-500 hover:text-red-600 cursor-pointer"
            />
          </div>
        </div>
      </form>
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
    </section>
  );
};

export default SignUp;
