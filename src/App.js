import React from 'react';
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from 'react-router-dom';
import AllProducts from './pages/AllProducts';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AdminPanel from './pages/AdminPanel';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import MyAccount from './pages/MyAccount';

const App = () => {
  return(

  <div className='overflow-hidden'>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/products' element={<AllProducts/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<SignUp/>} />
      <Route path='/product/:id' element={<ProductDetails/>} />
      <Route path='/admin' element={<AdminPanel/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/checkout' element={<Checkout/>} />
      <Route path='/myaccount' element={<MyAccount/>} />
      <Route path='/products' element={<AllProducts/>} />
    </Routes>
    <Sidebar/>
  </div>
  ) 
};

export default App;
