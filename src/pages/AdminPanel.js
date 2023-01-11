import React, {  useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../contexts/FirebaseContext'

const AdminPanel = () => {
    const [Id, setId] = useState();
    const [Title, setTitle] = useState();
    const [Price, setPrice] = useState();
    const [Description, setDescription] = useState();
    const [Category, setCategory] = useState();
    const [Image, setImage] = useState();
    
    const {addProduct, User} = useFirebase();

    const navigate = useNavigate();

    const addNewItem = async (e) =>{
        e.preventDefault();
        await addProduct(Id, Title, Price, Description, Category, Image);
        setId('');
        setTitle('');
        setPrice('');
        setDescription('');
        setCategory('');
        setImage('');
        alert("New Product Uploaded");
    }

    useEffect(() => {
        if (!User) {
            navigate("/")
        }
    }, [User, navigate])

  return (
    <section className="bg-[#f9fafb] w-screen h-screen flex justify-center items-center">
      <form onSubmit={addNewItem} className="w-[500px] h-[650px] bg-white drop-shadow-2xl rounded-lg mt-16">
        <div className="flex justify-center my-5 text-4xl font-bold">
          <h1>Add Product</h1>
        </div>
        <div className="px-10">
          <div className="flex flex-col items-start my-4">
            <label htmlFor="Id">Id</label>
            <input onChange={e=>setId(e.target.value)} value={Id}
              className="w-full outline-none border-2 rounded-md py-1 px-1 mt-1"
              type="number"
              name="id"
              placeholder="Enter id"
              id="id"
              required
            />
          </div>
          <div className="flex flex-col items-start my-4">
            <label htmlFor="title">title</label>
            <input onChange={e=>setTitle(e.target.value)} value={Title}
              className="w-full outline-none border-2 rounded-md py-1 px-1 mt-1"
              type="text"
              name="title"
              placeholder="Enter title"
              id="title"
              required
            />
          </div>
          <div className="flex flex-col items-start my-4">
            <label htmlFor="price">price</label>
            <input onChange={e=>setPrice(e.target.value)} value={Price}
              className="w-full outline-none border-2 rounded-md py-1 px-1 mt-1"
              type="number"
              name="price"
              placeholder="Enter price"
              id="price"
              required
            />
          </div>
          <div className="flex flex-col items-start my-4">
            <label htmlFor="description">description</label>
            <textarea onChange={e=>setDescription(e.target.value)} value={Description}
              className="w-full outline-none border-2 rounded-md py-1 px-1 mt-1"
              type="number"
              name="description"
              placeholder="Enter description"
              id="descriptiondescription"
              required
            />
          </div>
          <div className="flex flex-col items-start my-4">
            <label htmlFor="category">category</label>
            <input onChange={e=>setCategory(e.target.value)} value={Category}
              className="w-full outline-none border-2 rounded-md py-1 px-1 mt-1"
              type="text"
              name="category"
              placeholder="Enter category"
              id="category"
              required
            />
          </div>
          <div className="flex flex-col items-start my-4">
            <label htmlFor="image">image</label>
            <input onChange={e=>setImage(e.target.files[0])}
              className="w-full outline-none border-2 rounded-md py-1 px-1 mt-1"
              type="file"
              name="image"
              id="image"
              required
            />
          </div>
          <div className="w-full flex justify-center my-4">
            <button className="w-full bg-red-500 text-white py-2 rounded-full hover:bg-red-600">
              Update
            </button>
          </div>
        </div>
      </form>
    </section>
  )
}

export default AdminPanel