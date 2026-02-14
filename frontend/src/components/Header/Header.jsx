import React from 'react'

const Header = () => {
    return (
        <div className='h-[34vw] my-8 mx-auto bg-[url("/header_img.png")] bg-no-repeat bg-contain relative bg-orange-50 rounded-3xl overflow-hidden'>
            <div className='absolute flex flex-col items-start gap-[1.5vw] max-w-[50%] bottom-[10%] left-[6vw] animate-fadeIn'>
                <h2 className='font-semibold text-white text-[min(8.5vw,4.5rem)] leading-[1.1]'>Order your favourite food here</h2>
                <p className='text-white text-[1vw] hidden sm:block'>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
                <button className='border-none text-[#747474] font-medium py-[1vw] px-[2.3vw] bg-white text-[max(1vw,13px)] rounded-full hover:bg-orange-50 transition-all hover:scale-105 active:scale-95'>View Menu</button>
            </div>
        </div>
    )
}

export default Header
