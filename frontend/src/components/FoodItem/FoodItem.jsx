import React, { useContext } from 'react'
import { Plus, Minus } from 'lucide-react'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({ id, name, price, description, image, available }) => {
    const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

    return (
        <div className='w-full m-auto rounded-2xl shadow-md transition duration-300 hover:shadow-xl relative bg-white border border-[#f0f0f0]'>
            <div className='relative overflow-hidden rounded-t-2xl'>
                <img className={`w-full transition-transform duration-500 hover:scale-105 ${!available ? 'grayscale opacity-60' : ''}`} src={url + "/images/" + image} alt="" />
                {!available ? (
                    <div className='absolute inset-0 flex items-center justify-center bg-black/10 transition-all'>
                        <span className='bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg uppercase tracking-wider'>Out of Stock</span>
                    </div>
                ) : (
                    !cartItems[id]
                        ? <div className='absolute bottom-4 right-4 cursor-pointer bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-all active:scale-95 text-primary border border-orange-100' onClick={() => addToCart(id)}>
                            <Plus size={24} />
                        </div>
                        : <div className='absolute bottom-4 right-4 flex items-center gap-2.5 p-2 bg-white rounded-full shadow-lg border border-orange-100 animate-fadeIn'>
                            <div className='bg-[#fff4f2] p-1.5 rounded-full cursor-pointer text-primary hover:bg-[#ffece8] transition-all' onClick={() => removeFromCart(id)}>
                                <Minus size={20} />
                            </div>
                            <p className='font-bold text-text-dark text-lg w-5 text-center'>{cartItems[id]}</p>
                            <div className='bg-[#f0fff0] p-1.5 rounded-full cursor-pointer text-green-600 hover:bg-[#e4ffe4] transition-all' onClick={() => addToCart(id)}>
                                <Plus size={20} />
                            </div>
                        </div>
                )}
            </div>
            <div className='p-5'>
                <div className='flex justify-between items-center mb-2.5'>
                    <p className='text-xl font-bold text-text-dark'>{name}</p>
                    <div className='flex items-center gap-1 bg-[#fff4f2] px-2 py-1 rounded-md'>
                        <span className='text-primary font-bold'>4.5</span>
                        <div className='flex text-primary'>
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className={`w-3 h-3 fill-current ${i < 4 ? '' : 'text-[#bdbdbd]'}`} viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                            ))}
                        </div>
                    </div>
                </div>
                <p className='text-text-main text-sm leading-relaxed line-clamp-2 h-10'>{description}</p>
                <p className='text-primary text-2xl font-black mt-4'>${price}</p>
            </div>
        </div>
    );
};

export default FoodItem
