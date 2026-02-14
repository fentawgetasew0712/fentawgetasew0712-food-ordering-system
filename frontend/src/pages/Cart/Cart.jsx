import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

const Cart = () => {

    const { cartItems, food_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
    const navigate = useNavigate();

    return (
        <div className='mt-24'>
            <div className='cart-items'>
                <div className='grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-text-main text-[max(1vw,12px)] border-b border-border-light pb-2'>
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                {food_list.map((item, index) => {
                    if (cartItems[item._id] > 0) {
                        return (
                            <div key={index}>
                                <div className='grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-[max(1vw,12px)] my-2.5 text-text-dark border-b border-[#f3f3f3] pb-2.5'>
                                    <img className='w-12 rounded-lg' src={url + "/images/" + item.image} alt="" />
                                    <p>{item.name}</p>
                                    <p>${item.price}</p>
                                    <p>{cartItems[item._id]}</p>
                                    <p>${item.price * cartItems[item._id]}</p>
                                    <Trash2 onClick={() => removeFromCart(item._id)} className='cursor-pointer text-red-500 hover:text-red-700 transition-all' size={20} />
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
            <div className='mt-20 flex justify-between gap-[max(12vw,20px)] flex-col-reverse md:flex-row'>
                <div className='flex-1 flex flex-col gap-5'>
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
                    <button onClick={() => navigate('/order')} className='border-none text-white bg-primary w-[max(15vw,200px)] py-3 rounded-md cursor-pointer hover:bg-[#e54420] transition-all font-medium'>PROCEED TO CHECKOUT</button>
                </div>
                <div className='flex-1'>
                    <div className='flex flex-col gap-2.5'>
                        <p className='text-text-main font-medium'>If you have a promo code, Enter it here</p>
                        <div className='mt-2.5 flex justify-between items-center bg-[#eaeaea] rounded-md overflow-hidden h-[50px]'>
                            <input className='bg-transparent border-none outline-none pl-4 h-full w-full placeholder:text-gray-400' type="text" placeholder='promo code' />
                            <button className='w-[max(10vw,150px)] h-full px-1 bg-text-dark text-white border-none cursor-pointer hover:bg-black transition-all'>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart
