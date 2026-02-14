import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Package } from 'lucide-react'

const Orders = ({ url }) => {

    const [orders, setOrders] = useState([]);

    const fetchAllOrders = async () => {
        const response = await axios.get(url + "/api/order/list");
        if (response.data.success) {
            setOrders(response.data.data);
        } else {
            toast.error("Error")
        }
    }

    const statusHandler = async (event, orderId) => {
        const response = await axios.post(url + "/api/order/status", {
            orderId,
            status: event.target.value
        })
        if (response.data.success) {
            await fetchAllOrders();
        }
    }

    useEffect(() => {
        fetchAllOrders();
    }, [])

    return (
        <div className='w-full'>
            <h3 className='text-xl font-bold text-gray-600 mb-5'>Order Page</h3>
            <div className='flex flex-col gap-4'>
                {orders.map((order, index) => (
                    <div key={index} className='grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr] items-start gap-8 border border-gray-300 p-5 my-3 text-sm text-gray-700 bg-white rounded-md'>
                        <Package size={40} className='text-orange-600' />
                        <div>
                            <p className='font-bold'>
                                {order.items.map((item, index) => {
                                    if (index === order.items.length - 1) {
                                        return item.name + " x " + item.quantity
                                    } else {
                                        return item.name + " x " + item.quantity + ", "
                                    }
                                })}
                            </p>
                            <p className='mt-8 mb-1.5 font-semibold'>{order.address.firstName + " " + order.address.lastName}</p>
                            <div className='mb-2.5'>
                                <p>{order.address.street + ","}</p>
                                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                            </div>
                            <p className='font-medium'>{order.address.phone}</p>
                        </div>
                        <p>Items: {order.items.length}</p>
                        <p className='font-bold text-orange-600'>${order.amount}</p>
                        <select onChange={(event) => statusHandler(event, order._id)} value={order.status} className='bg-orange-50 border border-orange-600 p-2 outline-none rounded-md cursor-pointer'>
                            <option value="Food Processing">Food Processing</option>
                            <option value="Out for delivery">Out for delivery</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Orders
