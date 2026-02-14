import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext);

    return (
        <div className='mt-8' id='food-display'>
            <h2 className='text-[max(2vw,24px)] font-semibold text-[#262626] mb-5'>Top dishes near you</h2>
            <div className='grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-8 row-gap-12 mt-8 animate-fadeIn'>
                {food_list.length > 0 ? (
                    food_list.map((item, index) => {
                        if (category === "All" || category === item.category) {
                            return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} available={item.available || true} />
                        }
                    })
                ) : (
                    <p className='text-gray-500 italic col-span-full py-10 text-center border-2 border-dashed border-gray-100 rounded-2xl'>No food items found. Please start the backend and add food via the Admin Panel.</p>
                )}
            </div>
        </div>
    )
}

export default FoodDisplay
