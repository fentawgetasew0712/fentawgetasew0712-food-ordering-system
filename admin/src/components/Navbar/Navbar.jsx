import React from 'react'
import { User } from 'lucide-react'

const Navbar = () => {
    return (
        <div className='flex justify-between items-center py-2 px-[4%] bg-white border-b border-gray-200'>
            <h1 className='text-2xl font-bold text-orange-600'>Admin Panel</h1>
            <div className='w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center bg-gray-50'>
                <User className='text-gray-600' size={24} />
            </div>
        </div>
    )
}

export default Navbar
