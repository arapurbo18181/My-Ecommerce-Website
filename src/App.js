import React from 'react';
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return(

  <div className='overflow-hidden'>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/product/:id' element={<ProductDetails/>} />
    </Routes>
    <Sidebar/>
    <Footer/>
  </div>
  ) 
};

export default App;
