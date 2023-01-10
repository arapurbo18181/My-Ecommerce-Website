import React from 'react';
import Product from '../components/Product';
import { useProduct } from '../contexts/ProductContext';
import Hero from "../components/Hero";

const Home = () => {

  const {AllProducts} = useProduct();

  const filterProducts = AllProducts.filter((product)=>{
    return product.category === "men's clothing" || product.category === "women's clothing";
  });


  return (
    <div>
    <Hero/>
    <section className='py-16'>
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0'>
          {filterProducts.map((item)=>{
            return <Product key={item.id} {...item} />
          })}
        </div>
      </div>
    </section>
    </div>
  );
};

export default Home;
