import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MyOrderItem from '../components/MyOrderItem';
import { useFirebase } from '../contexts/FirebaseContext'

const MyAccount = () => {
    const {getMyOrders, MyOrders, Confirm, setConfirm, Reject, setReject, User, removeMyOrder} = useFirebase(); 
    const navigate = useNavigate();

    useEffect(() => {
      if (!User) {
        navigate("/")
      }
    }, [])

    useEffect(() => {
      getMyOrders()
    }, [])
    
    const handleClick = () => {
      removeMyOrder()
      setConfirm(false);
      setReject(false);
    }

  return (
    <div className='flex justify-center h-screen items-center'>
        <div className="w-[500px] h-[650px] flex flex-col justify-center items-center bg-white drop-shadow-2xl rounded-lg mt-16">
        <div className="flex flex-col justify-center items-center my-5 text-4xl font-bold">
          <h1>My Orders</h1>
          {
            Confirm && <h2 className='my-3 text-xl py-2 px-4 rounded-full text-white bg-green-500'>Order is Confirmed.......</h2>
          }
          {
            Reject && <h2 className='my-3 text-xl py-2 px-4 rounded-full text-white bg-red-500'>Order is Rejected.......</h2>
          }
          {
            MyOrders && !Reject && !Confirm && <h2 className='my-3 text-xl py-2 px-4 rounded-full text-white bg-yellow-500'>Order is pending.......</h2>
          }
        </div>
        
        {

        (Reject || Confirm) && <button onClick={handleClick} className='text-center bg-red-500 px-4 py-2 my-4 rounded-full text-white cursor-pointer'>remove this order</button>
        } 
        <div className="list-decimal h-[470px] overflow-y-auto overflow-x-hidden">
          {
            MyOrders ? MyOrders.CartItems.map(item=>{
              return <MyOrderItem {...item} />
            }) : ""
          }
        </div>
      </div>
    </div>
  )
}

export default MyAccount