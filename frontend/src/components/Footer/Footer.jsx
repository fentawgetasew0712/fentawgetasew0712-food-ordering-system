import React from 'react'
import { Facebook, Twitter, Linkedin } from 'lucide-react'

const Footer = () => {
    return (
        <div className='text-[#d9d9d9] bg-bg-dark flex flex-col items-center gap-5 py-5 px-[8vw] pt-20 mt-24' id='footer'>
            <div className='w-full grid grid-cols-[2fr_1fr_1fr] gap-20'>
                <div className='flex flex-col items-start gap-5'>
                    <h1 className='text-3xl font-bold text-primary'>TOMATO.</h1>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                    <div className='flex items-center gap-4 cursor-pointer'>
                        <Facebook className='hover:text-primary transition-all duration-300' />
                        <Twitter className='hover:text-primary transition-all duration-300' />
                        <Linkedin className='hover:text-primary transition-all duration-300' />
                    </div>
                </div>
                <div className='flex flex-col items-start gap-5'>
                    <h2 className='text-white text-2xl font-semibold'>COMPANY</h2>
                    <ul className='list-none space-y-2 cursor-pointer'>
                        <li className='hover:text-primary transition-all'>Home</li>
                        <li className='hover:text-primary transition-all'>About us</li>
                        <li className='hover:text-primary transition-all'>Delivery</li>
                        <li className='hover:text-primary transition-all'>Privacy policy</li>
                    </ul>
                </div>
                <div className='flex flex-col items-start gap-5'>
                    <h2 className='text-white text-2xl font-semibold'>GET IN TOUCH</h2>
                    <ul className='list-none space-y-2'>
                        <li className='hover:text-primary cursor-pointer transition-all'>+1-234-567-890</li>
                        <li className='hover:text-primary cursor-pointer transition-all'>contact@tomato.com</li>
                    </ul>
                </div>
            </div>
            <hr className='w-full h-0.5 my-5 bg-gray-600 border-none' />
            <p className='text-center mb-5'>Copyright 2024 © Tomato.com - All Right Reserved.</p>
        </div>
    );
};

export default Footer
