import React from "react";
import Product from "../components/Product";
import Hero from "../components/Hero";
import { useFirebase } from "../contexts/FirebaseContext";
import { useEffect } from "react";
import { useState } from "react";

const Home = () => {
  const { getAllProducts, MyProduct } = useFirebase();

  useEffect(() => {
    getAllProducts();
  }, [MyProduct]);

  return (
    <div>
      <Hero />
      <section className="py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
            {MyProduct.map((item) => {
              return <Product key={item.id} {...item} />;
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
