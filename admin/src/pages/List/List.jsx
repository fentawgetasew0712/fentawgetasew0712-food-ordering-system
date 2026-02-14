import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { X } from 'lucide-react'

const List = ({ url }) => {

    const [list, setList] = useState([]);

    const fetchList = async () => {
        const response = await axios.get(`${url}/api/food/list`);
        if (response.data.success) {
            setList(response.data.data);
        } else {
            toast.error("Error")
        }
    }

    const removeFood = async (foodId) => {
        const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
        await fetchList();
        if (response.data.success) {
            toast.success(response.data.message)
        } else {
            toast.error("Error")
        }
    }

    useEffect(() => {
        fetchList();
    }, [])

    return (
        <div className='w-full'>
            <p className='text-xl mb-4 text-gray-600 font-bold'>All Foods List</p>
            <div className='bg-white rounded-lg shadow'>
                <div className='grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center gap-2.5 p-3 px-5 border-b border-gray-200 text-sm bg-gray-50 text-gray-500 font-bold'>
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {list.map((item, index) => {
                    return (
                        <div key={index} className='grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center gap-2.5 p-3 px-5 border-b border-gray-200 text-sm text-gray-700 hover:bg-gray-50'>
                            <img className='w-12 h-12 rounded object-cover' src={`${url}/images/` + item.image} alt="" />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>${item.price}</p>
                            <X onClick={() => removeFood(item._id)} className='cursor-pointer text-red-500 hover:scale-110 transition' size={20} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default List
