import React, { useState, useContext } from 'react'
import { X } from 'lucide-react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const LoginPopup = ({ setShowLogin }) => {
    const { setToken, url } = useContext(StoreContext);
    const [currState, setCurrState] = useState("Sign Up");
    const [data, setData] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        address: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const onLogin = async (event) => {
        event.preventDefault();

        if (currState === "Sign Up" && data.password !== data.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        let newUrl = url;
        let payload = {};

        if (currState === "Login") {
            newUrl += "/api/user/login";
            payload = {
                identifier: data.email, // Using email field as identifier for login
                password: data.password
            };
        } else {
            newUrl += "/api/user/register";
            payload = { ...data };
            delete payload.confirmPassword;
        }

        try {
            const response = await axios.post(newUrl, payload);

            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setShowLogin(false)
            } else {
                alert(response.data.message)
            }
        } catch (error) {
            console.error("Auth error:", error);
            const msg = error.response?.data?.message || "An error occurred during authentication. Check if the backend is running.";
            alert(msg);
        }
    }

    return (
        <div className='fixed z-[100] w-full h-full bg-[#000000ba] grid p-4'>
            <form onSubmit={onLogin} className={`place-self-center ${currState === "Sign Up" ? 'w-[max(45vw,330px)]' : 'w-[max(23vw,330px)]'} text-text-main bg-white flex flex-col gap-6 py-6 px-[30px] rounded-xl text-sm animate-fadeIn shadow-2xl overflow-y-auto max-h-[90vh]`}>
                <div className='flex justify-between items-center text-text-dark'>
                    <h2 className='text-2xl font-bold'>{currState === "Sign Up" ? "Create an account" : "Login to your account"}</h2>
                    <X onClick={() => setShowLogin(false)} className='cursor-pointer hover:text-primary transition-all' size={24} />
                </div>
                <div className='flex flex-col gap-5'>
                    {currState === "Sign Up" ? (
                        <>
                            <div className='flex flex-col gap-1'>
                                <label className='text-xs font-semibold text-text-dark'>User-Name</label>
                                <input name='username' onChange={onChangeHandler} value={data.username} className='border border-border-light p-2.5 rounded-md outline-primary' type="text" placeholder='Username' required />
                            </div>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                <div className='flex flex-col gap-1'>
                                    <label className='text-xs font-semibold text-text-dark'>First Name</label>
                                    <input name='firstName' onChange={onChangeHandler} value={data.firstName} className='border border-border-light p-2.5 rounded-md outline-primary' type="text" placeholder='First name' required />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='text-xs font-semibold text-text-dark'>Last Name</label>
                                    <input name='lastName' onChange={onChangeHandler} value={data.lastName} className='border border-border-light p-2.5 rounded-md outline-primary' type="text" placeholder='Last name' required />
                                </div>
                            </div>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                <div className='flex flex-col gap-1'>
                                    <label className='text-xs font-semibold text-text-dark'>Email Address</label>
                                    <input name='email' onChange={onChangeHandler} value={data.email} className='border border-border-light p-2.5 rounded-md outline-primary' type="email" placeholder='Email address' required />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='text-xs font-semibold text-text-dark'>Phone number</label>
                                    <input name='phone' onChange={onChangeHandler} value={data.phone} className='border border-border-light p-2.5 rounded-md outline-primary' type="text" placeholder='Phone number' required />
                                </div>
                            </div>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                <div className='flex flex-col gap-1'>
                                    <label className='text-xs font-semibold text-text-dark'>Password</label>
                                    <input name='password' onChange={onChangeHandler} value={data.password} className='border border-border-light p-2.5 rounded-md outline-primary' type="password" placeholder='Password' required />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='text-xs font-semibold text-text-dark'>Confirm password</label>
                                    <input name='confirmPassword' onChange={onChangeHandler} value={data.confirmPassword} className='border border-border-light p-2.5 rounded-md outline-primary' type="password" placeholder='Confirm password' required />
                                </div>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label className='text-xs font-semibold text-text-dark'>Delivery Address</label>
                                <textarea name='address' onChange={onChangeHandler} value={data.address} className='border border-border-light p-2.5 rounded-md outline-primary resize-none' rows="2" placeholder='Delivery address' required />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='flex flex-col gap-1'>
                                <input name='email' onChange={onChangeHandler} value={data.email} className='border border-border-light p-3 rounded-md outline-primary text-base' type="text" placeholder='Username or Email' required />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <input name='password' onChange={onChangeHandler} value={data.password} className='border border-border-light p-3 rounded-md outline-primary text-base' type="password" placeholder='Password' required />
                            </div>
                        </>
                    )}
                </div>
                <button type='submit' className='border-none p-3 rounded-md text-white bg-primary text-lg cursor-pointer hover:bg-[#e54420] transition-all hover:scale-[1.02] active:scale-[0.98] font-bold mt-2 shadow-md'>
                    {currState === "Sign Up" ? "Register" : "Login"}
                </button>
                <div className='flex items-center justify-center gap-2 mt-2 py-3 bg-gray-50 rounded-b-xl -mx-[30px] -mb-6 border-t border-gray-100'>
                    {currState === "Login"
                        ? <p className='text-xs'>Not registered? <span className='text-primary font-bold cursor-pointer hover:underline' onClick={() => setCurrState("Sign Up")}>Create an account</span></p>
                        : <p className='text-xs'>Already have an account? <span className='text-primary font-bold cursor-pointer hover:underline' onClick={() => setCurrState("Login")}>Login here</span></p>
                    }
                </div>
            </form>
        </div>
    )
}

export default LoginPopup
