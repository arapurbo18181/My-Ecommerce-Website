import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useFirebase } from "../contexts/FirebaseContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { User, getImageUrl, updateAmount, MyProduct } = useFirebase();
  const [Url, setUrl] = useState();
  const [OneProduct, setOneProduct] = useState();

  useEffect(() => {
    setOneProduct(
      MyProduct.find((item) => {
        return item.ProductId === parseInt(id);
      })
    );
  }, [MyProduct]);

  const addCart = () => {
    if (User) {
      updateAmount()
      addToCart(OneProduct);
    } else {
      toast("Please Login first.....");
    }
  };

  if (!OneProduct) {
    return (
      <section className="h-screen flex justify-center items-center">
        Loading.......
      </section>
    );
  } else {
    getImageUrl(OneProduct.imageURL).then((url) => setUrl(url));
    return (
      <section className="pt-32 pb-12 lg:py-32 h-screen flex items-center">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
              <img className="max-w-[200px] lg:max-w-sm" src={Url} alt="" />
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">
                {OneProduct.title}
              </h1>
              <div className="text-xl text-red-500 font-medium mb-6">
                $ {OneProduct.price}
              </div>
              <p className="mb-8"> {OneProduct.description} </p>
              <button
                onClick={addCart}
                className="bg-primary py-4 px-8 text-white"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="dark"
        />
      </section>
    );
  }
};

export default ProductDetails;
