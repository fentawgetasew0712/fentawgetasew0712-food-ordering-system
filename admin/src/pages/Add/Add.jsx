import React, { useState } from 'react'
import { Upload } from 'lucide-react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({ url }) => {

    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("price", Number(data.price))
        formData.append("category", data.category)
        formData.append("image", image)
        const response = await axios.post(`${url}/api/food/add`, formData);
        if (response.data.success) {
            setData({
                name: "",
                description: "",
                price: "",
                category: "Salad"
            })
            setImage(false)
            toast.success(response.data.message)
        } else {
            toast.error(response.data.message)
        }
    }

    return (
        <div className='w-full'>
            <form className='flex flex-col gap-5 text-gray-600' onSubmit={onSubmitHandler}>
                <div className='flex flex-col gap-2'>
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <div className='w-40 h-24 border border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer overflow-hidden'>
                            {image ? (
                                <img className='w-full h-full object-cover' src={URL.createObjectURL(image)} alt="" />
                            ) : (
                                <Upload size={40} className='text-gray-300' />
                            )}
                        </div>
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                </div>
                <div className='flex flex-col gap-2 w-full max-w-[400px]'>
                    <p>Product Name</p>
                    <input onChange={onChangeHandler} value={data.name} className='p-2 outline-none border border-gray-300 rounded' type="text" name='name' placeholder='Type here' required />
                </div>
                <div className='flex flex-col gap-2 w-full max-w-[400px]'>
                    <p>Product Description</p>
                    <textarea onChange={onChangeHandler} value={data.description} className='p-2 outline-none border border-gray-300 rounded' name="description" rows="6" placeholder='Write content here' required></textarea>
                </div>
                <div className='flex gap-5'>
                    <div className='flex flex-col gap-2'>
                        <p>Category</p>
                        <select onChange={onChangeHandler} name="category" className='p-2 outline-none border border-gray-300 rounded cursor-pointer'>
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p>Price</p>
                        <input onChange={onChangeHandler} value={data.price} className='p-2 outline-none border border-gray-300 rounded w-[120px]' type="number" name='price' placeholder='$20' required />
                    </div>
                </div>
                <button type='submit' className='max-w-[120px] bg-black text-white p-2.5 rounded cursor-pointer hover:bg-gray-800 transition'>ADD</button>
            </form>
        </div>
    )
}

export default Add
