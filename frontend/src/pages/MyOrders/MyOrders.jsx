import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { Package } from 'lucide-react'
import axios from 'axios';

const MyOrders = () => {

    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
        setData(response.data.data);
    }

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token])

    return (
        <div className='my-orders mt-12 mb-12'>
            <h2 className='text-3xl font-bold mb-8'>My Orders</h2>
            <div className='flex flex-col gap-5 mt-8'>
                {data.length === 0 ? (
                    <div className='flex flex-col items-center gap-4 py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200'>
                        <Package size={60} className='text-gray-300' />
                        <p className='text-gray-500 text-lg'>You haven't placed any orders yet.</p>
                    </div>
                ) : (
                    data.map((order, index) => {
                        return (
                            <div key={index} className='grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr] items-center gap-8 text-sm py-5 px-8 text-gray-700 border border-orange-600 rounded-xl bg-white shadow-sm hover:shadow-md transition'>
                                <Package className='text-orange-600' size={40} />
                                <p className='font-medium'>
                                    {order.items.map((item, idx) => {
                                        if (idx === order.items.length - 1) {
                                            return item.name + " x " + item.quantity
                                        } else {
                                            return item.name + " x " + item.quantity + ", "
                                        }
                                    })}
                                </p>
                                <p className='font-bold text-lg'>${order.amount}.00</p>
                                <p>Items: {order.items.length}</p>
                                <p className='flex items-center gap-2'>
                                    <span className='w-2 h-2 rounded-full bg-orange-600 animate-pulse'></span>
                                    <b>{order.status}</b>
                                </p>
                                <button onClick={fetchOrders} className='border-none py-2.5 rounded bg-orange-50 text-orange-600 font-semibold cursor-pointer hover:bg-orange-100 transition'>Track Order</button>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}

export default MyOrders
