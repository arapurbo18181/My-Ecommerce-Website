import React from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import { AllProducts } from '../AllProducts';

const ProductContext = createContext();
export const useProduct = ()=> useContext(ProductContext);

export const ProductProvider = (props) => {
  

  return (
    <ProductContext.Provider value={{AllProducts}}>
      {props.children}
    </ProductContext.Provider>
  )
};
