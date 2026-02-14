import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { Search, ShoppingBasket, User, Package, LogOut } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home");
    const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    }

    return (
        <nav className='flex justify-between items-center py-5 px-0'>
            <Link to='/'><h1 className='text-3xl font-bold text-primary cursor-pointer'>TOMATO.</h1></Link>
            <ul className='hidden md:flex gap-5 text-text-main text-[18px] cursor-pointer'>
                <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "pb-0.5 border-b-2 border-text-main" : "hover:text-primary transition-all duration-300"}>home</Link>
                <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "pb-0.5 border-b-2 border-text-main" : "hover:text-primary transition-all duration-300"}>menu</a>
                <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "pb-0.5 border-b-2 border-text-main" : "hover:text-primary transition-all duration-300"}>mobile-app</a>
                <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "pb-0.5 border-b-2 border-text-main" : "hover:text-primary transition-all duration-300"}>contact us</a>
            </ul>
            <div className='flex items-center gap-10'>
                <Search className='cursor-pointer text-text-main hover:text-primary transition-all' size={24} />
                <div className='relative cursor-pointer'>
                    <Link to='/cart'><ShoppingBasket className='text-text-main hover:text-primary transition-all' size={24} /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : 'absolute -top-2 -right-2 min-w-2.5 min-h-2.5 bg-primary rounded-full border-2 border-white'}></div>
                </div>
                {!token ? (
                    <button onClick={() => setShowLogin(true)} className='bg-transparent text-text-main border border-primary py-2.5 px-8 rounded-full cursor-pointer hover:bg-[#fff4f2] transition-all duration-300'>
                        sign in
                    </button>
                ) : (
                    <div className='relative group'>
                        <User className='cursor-pointer text-primary border border-primary rounded-full p-1' size={32} />
                        <ul className='absolute right-0 hidden group-hover:flex flex-col gap-2.5 bg-white py-3 px-6 rounded border border-primary outline-2 outline-white list-none z-10'>
                            <li onClick={() => navigate('/myorders')} className='flex items-center gap-2.5 cursor-pointer hover:text-primary'><Package size={20} /><p>Orders</p></li>
                            <hr className='border-gray-200' />
                            <li onClick={logout} className='flex items-center gap-2.5 cursor-pointer hover:text-primary'><LogOut size={20} /><p>Logout</p></li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar
