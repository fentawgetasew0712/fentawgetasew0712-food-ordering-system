import React from 'react'
import { Facebook, Twitter, Linkedin } from 'lucide-react'

const Footer = () => {
    return (
        <div className='text-white bg-[#323232] flex flex-col items-center gap-5 py-5 px-[8vw] pt-20 mt-24' id='footer'>
            <div className='w-full grid grid-cols-[2fr_1fr_1fr] gap-20'>
                <div className='flex flex-col items-start gap-5'>
                    <h1 className='text-3xl font-bold text-orange-600'>TOMATO.</h1>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                    <div className='flex items-center gap-4 cursor-pointer'>
                        <Facebook className='hover:text-orange-600 transition-all' />
                        <Twitter className='hover:text-orange-600 transition-all' />
                        <Linkedin className='hover:text-orange-600 transition-all' />
                    </div>
                </div>
                <div className='flex flex-col items-start gap-5'>
                    <h2 className='text-white text-2xl font-semibold'>COMPANY</h2>
                    <ul className='list-none space-y-2 cursor-pointer'>
                        <li className='hover:text-orange-600'>Home</li>
                        <li className='hover:text-orange-600'>About us</li>
                        <li className='hover:text-orange-600'>Delivery</li>
                        <li className='hover:text-orange-600'>Privacy policy</li>
                    </ul>
                </div>
                <div className='flex flex-col items-start gap-5'>
                    <h2 className='text-white text-2xl font-semibold'>GET IN TOUCH</h2>
                    <ul className='list-none space-y-2'>
                        <li className='hover:text-orange-600 cursor-pointer'>+1-234-567-890</li>
                        <li className='hover:text-orange-600 cursor-pointer'>contact@tomato.com</li>
                    </ul>
                </div>
            </div>
            <hr className='w-full h-0.5 my-5 bg-gray-500 border-none' />
            <p className='text-center mb-5'>Copyright 2024 © Tomato.com - All Right Reserved.</p>
        </div>
    )
}

export default Footer
