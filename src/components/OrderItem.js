import React, { useEffect, useState } from "react";
import { useFirebase } from "../contexts/FirebaseContext";

const OrderItem = ({item}) => {
    const [Url, setUrl] = useState();
    const { getImageUrl} = useFirebase();

    useEffect(() => {
        getImageUrl(imageURL).then((url) => setUrl(url));
      }, []);
    const {title, price, imageURL, amount } = item;

  return (
    <div className="flex h-full bg-gray-100 gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500">
      <div className="w-full min-h-[150px] flex justify-between items-center gap-x-4">
        <div className="flex flex-col sm:flex-row gap-x-4 gap-y-2 flex-1">
          <div>
            <img className="max-w-[60px]" src={Url} alt="" />
          </div>
          <div className="flex flex-col gap-y-1 justify-start">
            <div className="text-xs uppercase hidden sm:block font-medium max-w-[240px] text-primary hover:underline">
              {title}
            </div>
            <div className="flex items-start justify-start">$ {price} </div>
          </div>
        </div>
        <div className="flex flex-1 justify-center w-full items-center h-full font-medium">
          <div className="flex w-20 items-center h-10 border text-primary font-medium">
            <div className="h-full flex justify-center items-center px-2">
                Total: {amount}
            </div>
          </div>
        </div>
        <div className="flex flex-1 justify-end items-center text-primary font-medium">
          {" "}
          {`$ ${parseFloat(price * amount).toFixed(2)}`}{" "}
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
