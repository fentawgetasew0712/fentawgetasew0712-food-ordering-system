import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'

const ExploreMenu = ({ category, setCategory }) => {
    const { menu_list } = useContext(StoreContext);

    return (
        <div className='flex flex-col gap-5 py-5' id='explore-menu'>
            <h1 className='text-[#262626] font-semibold text-4xl'>Explore our menu</h1>
            <p className='max-w-[80%] text-[#808080]'>Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
            <div className='flex justify-between items-center gap-8 text-center my-5 overflow-x-scroll no-scrollbar'>
                {menu_list.map((item, index) => {
                    return (
                        <div key={index} onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} className='flex-shrink-0 cursor-pointer'>
                            <img className={`w-[7.5vw] min-w-[80px] rounded-full transition-all duration-300 p-1 ${category === item.menu_name ? "border-4 border-orange-600 p-0.5" : ""}`} src={item.menu_image} alt="" />
                            <p className='mt-2.5 text-[#747474] text-[max(1.4vw,16px)]'>{item.menu_name}</p>
                        </div>
                    )
                })}
            </div>
            <hr className='my-2.5 h-0.5 bg-[#e2e2e2] border-none' />
        </div>
    )
}

export default ExploreMenu
