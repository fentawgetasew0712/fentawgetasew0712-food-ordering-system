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
        phone: "",
        paymentMethod: "COD"
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
                <p className='text-3xl font-bold mb-12 text-text-dark'>Delivery Information</p>
                <div className='flex gap-2.5 mb-4'>
                    <input name='firstName' onChange={onChangeHandler} value={data.firstName} className='w-full p-2.5 border border-border-light rounded-md outline-primary' type="text" placeholder='First name' required />
                    <input name='lastName' onChange={onChangeHandler} value={data.lastName} className='w-full p-2.5 border border-border-light rounded-md outline-primary' type="text" placeholder='Last name' required />
                </div>
                <input name='email' onChange={onChangeHandler} value={data.email} className='w-full p-2.5 border border-border-light rounded-md outline-primary mb-4' type="email" placeholder='Email address' required />
                <input name='street' onChange={onChangeHandler} value={data.street} className='w-full p-2.5 border border-border-light rounded-md outline-primary mb-4' type="text" placeholder='Street' required />
                <div className='flex gap-2.5 mb-4'>
                    <input name='city' onChange={onChangeHandler} value={data.city} className='w-full p-2.5 border border-border-light rounded-md outline-primary' type="text" placeholder='City' required />
                    <input name='state' onChange={onChangeHandler} value={data.state} className='w-full p-2.5 border border-border-light rounded-md outline-primary' type="text" placeholder='State' required />
                </div>
                <div className='flex gap-2.5 mb-4'>
                    <input name='zipcode' onChange={onChangeHandler} value={data.zipcode} className='w-full p-2.5 border border-border-light rounded-md outline-primary' type="text" placeholder='Zip code' required />
                    <input name='country' onChange={onChangeHandler} value={data.country} className='w-full p-2.5 border border-border-light rounded-md outline-primary' type="text" placeholder='Country' required />
                </div>
                <input name='phone' onChange={onChangeHandler} value={data.phone} className='w-full p-2.5 border border-border-light rounded-md outline-primary' type="text" placeholder='Phone' required />
            </div>
            <div className='w-full max-w-[max(40%,500px)]'>
                <div className='flex flex-col gap-5'>
                    <h2 className='text-2xl font-bold text-text-dark'>Cart Totals</h2>
                    <div>
                        <div className='flex justify-between text-text-main py-2.5 border-b border-border-light'>
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <div className='flex justify-between text-text-main py-2.5 border-b border-border-light'>
                            <p>Delivery Fee</p>
                            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
                        </div>
                        <div className='flex justify-between text-text-dark font-bold py-2.5'>
                            <b>Total</b>
                            <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 mt-8'>
                        <h2 className='text-xl font-bold text-text-dark'>Select Payment Method</h2>
                        <div className='flex flex-col gap-3'>
                            <label className='flex items-center gap-3 p-3 border border-border-light rounded-md cursor-pointer hover:bg-gray-50 transition-all'>
                                <input type="radio" name="paymentMethod" value="COD" checked={data.paymentMethod === "COD"} onChange={onChangeHandler} required className='accent-primary w-4 h-4' />
                                <span className='text-text-main font-medium'>Cash on Delivery (COD)</span>
                            </label>
                            <label className='flex items-center gap-3 p-3 border border-border-light rounded-md cursor-pointer hover:bg-gray-50 transition-all'>
                                <input type="radio" name="paymentMethod" value="PayPal" checked={data.paymentMethod === "PayPal"} onChange={onChangeHandler} required className='accent-primary w-4 h-4' />
                                <span className='text-text-main font-medium'>Online Payment (PayPal Simulation)</span>
                            </label>
                        </div>
                    </div>
                    <button type='submit' className='border-none text-white bg-primary w-[max(15vw,200px)] py-3 rounded-md cursor-pointer hover:bg-[#e54420] transition-all hover:scale-105 active:scale-95 font-medium mt-8 uppercase tracking-wider'>
                        {data.paymentMethod === "COD" ? "Place Order" : "Proceed to Payment"}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder
