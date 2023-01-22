import React, { useEffect } from "react";
import { useState } from "react";
import Category from "../components/Category";
import Product from "../components/Product";
import { useFirebase } from "../contexts/FirebaseContext";

const AllProducts = () => {
  const { getAllProducts, MyProduct, MyCategory, setMyCategory } =
    useFirebase();

  useEffect(() => {
    getAllProducts();
  }, []);

  if (MyCategory) {
    const setCategory = (e) => {
      e.preventDefault();
      const categories = MyProduct.map((item) => {
        return item;
      });
      setMyCategory(categories);
    };

    const allCategory = MyProduct.map((item) => {
      return item.category;
    });

    const category = new Set(allCategory);
    const items = [];
    category.forEach((item) => items.push(item));

    return (
      <div className="mt-10">
        <section className="py-16">
          <div className="container flex flex-col md:flex-row space-x-6 justify-start mx-auto">
            <div>
              <h1 className="text-xl font-bold">Categories:</h1>
              <div className="flex justify-center items-center space-x-2 md:flex-col text-base">
                <div className="my-2 ">
                  <button
                    onClick={setCategory}
                    className="bg-red-500 py-2 px-4 text-white rounded-2xl"
                  >
                    All Items
                  </button>
                </div>
                <div className="flex justify-start items-center md:flex-col space-x-2">
                  {items.map((item) => {
                    return <Category key={item} item={item} />;
                  })}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
              {MyCategory.map((item) => {
                return <Product key={item.ProductId} {...item} />;
              })}
            </div>
          </div>
        </section>
      </div>
    );
  }
};

export default AllProducts;
