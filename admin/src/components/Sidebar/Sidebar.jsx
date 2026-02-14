import React from 'react'
import { PlusCircle, ListChecks, ShoppingBag } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className='w-1/5 min-h-screen border-r border-gray-200'>
            <div className='pt-12 pl-[20%] flex flex-col gap-5'>
                <NavLink to='/add' className={({ isActive }) => `flex items-center gap-3 border border-orange-600 border-r-0 py-2 px-3 rounded-l-md cursor-pointer transition ${isActive ? 'bg-orange-50' : 'border-gray-300'}`}>
                    <PlusCircle size={20} className='text-orange-600' />
                    <p className='hidden md:block'>Add Items</p>
                </NavLink>
                <NavLink to='/list' className={({ isActive }) => `flex items-center gap-3 border border-orange-600 border-r-0 py-2 px-3 rounded-l-md cursor-pointer transition ${isActive ? 'bg-orange-50' : 'border-gray-300'}`}>
                    <ListChecks size={20} className='text-orange-600' />
                    <p className='hidden md:block'>List Items</p>
                </NavLink>
                <NavLink to='/orders' className={({ isActive }) => `flex items-center gap-3 border border-orange-600 border-r-0 py-2 px-3 rounded-l-md cursor-pointer transition ${isActive ? 'bg-orange-50' : 'border-gray-300'}`}>
                    <ShoppingBag size={20} className='text-orange-600' />
                    <p className='hidden md:block'>Orders</p>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar
