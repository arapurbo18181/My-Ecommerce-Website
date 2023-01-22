import React, { useEffect } from 'react'
import { useFirebase } from '../contexts/FirebaseContext'

const Category = ({item}) => {
    const {setMyCategory, MyProduct, getAllProducts} = useFirebase();

    useEffect(() => {
        getAllProducts();
    }, []);

    const setCategory = (e) =>{
        e.preventDefault()
        if (MyProduct) {
            const categories = MyProduct.filter(elem=>{
                return elem.category === item
            })
            setMyCategory(categories);
        }
    }
    

  return (
    <div className='my-2'>
        <button onClick={setCategory} className='bg-red-500 py-2 px-4 text-white rounded-2xl'>{item}</button>
    </div>
  )
}

export default Category