import React, { useContext, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {

    const { getTotalCartAmount, placeOrder } = useContext(StoreContext);
    const navigate = useNavigate();

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(prev => ({ ...prev, [name]: value }));
    }

    const handleOrder = async (event) => {
        event.preventDefault();
        const success = await placeOrder(data);
        if (success) {
            navigate('/myorders');
        }
    }

    return (
        <form onSubmit={handleOrder} className='flex items-start justify-between gap-12 mt-24 mb-12 flex-col md:flex-row'>
            <div className='w-full max-w-[max(30%,500px)]'>
                <p className='text-3xl font-semibold mb-12'>Delivery Information</p>
                <div className='multi-fields flex gap-2.5 mb-4'>
                    <input name='firstName' onChange={onChangeHandler} value={data.firstName} className='w-full p-2.5 border border-gray-300 rounded-md outline-orange-600' type="text" placeholder='First name' required />
                    <input name='lastName' onChange={onChangeHandler} value={data.lastName} className='w-full p-2.5 border border-gray-300 rounded-md outline-orange-600' type="text" placeholder='Last name' required />
                </div>
                <input name='email' onChange={onChangeHandler} value={data.email} className='w-full p-2.5 border border-gray-300 rounded-md outline-orange-600 mb-4' type="email" placeholder='Email address' required />
                <input name='street' onChange={onChangeHandler} value={data.street} className='w-full p-2.5 border border-gray-300 rounded-md outline-orange-600 mb-4' type="text" placeholder='Street' required />
                <div className='multi-fields flex gap-2.5 mb-4'>
                    <input name='city' onChange={onChangeHandler} value={data.city} className='w-full p-2.5 border border-gray-300 rounded-md outline-orange-600' type="text" placeholder='City' required />
                    <input name='state' onChange={onChangeHandler} value={data.state} className='w-full p-2.5 border border-gray-300 rounded-md outline-orange-600' type="text" placeholder='State' required />
                </div>
                <div className='multi-fields flex gap-2.5 mb-4'>
                    <input name='zipcode' onChange={onChangeHandler} value={data.zipcode} className='w-full p-2.5 border border-gray-300 rounded-md outline-orange-600' type="text" placeholder='Zip code' required />
                    <input name='country' onChange={onChangeHandler} value={data.country} className='w-full p-2.5 border border-gray-300 rounded-md outline-orange-600' type="text" placeholder='Country' required />
                </div>
                <input name='phone' onChange={onChangeHandler} value={data.phone} className='w-full p-2.5 border border-gray-300 rounded-md outline-orange-600' type="text" placeholder='Phone' required />
            </div>
            <div className='w-full max-w-[max(40%,500px)]'>
                <div className='cart-total flex flex-col gap-5'>
                    <h2 className='text-2xl font-semibold'>Cart Totals</h2>
                    <div>
                        <div className='flex justify-between text-[#555] py-2.5 border-b border-gray-100'>
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <div className='flex justify-between text-[#555] py-2.5 border-b border-gray-100'>
                            <p>Delivery Fee</p>
                            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
                        </div>
                        <div className='flex justify-between text-black font-semibold py-2.5'>
                            <b>Total</b>
                            <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
                        </div>
                    </div>
                    <button type='submit' className='border-none text-white bg-orange-600 w-[max(15vw,200px)] py-3 rounded-md cursor-pointer hover:bg-orange-700 transition mt-8'>PROCEED TO PAYMENT</button>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder
