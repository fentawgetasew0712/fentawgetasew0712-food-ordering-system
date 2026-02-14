import React, { useState, useContext } from 'react'
import { X } from 'lucide-react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const LoginPopup = ({ setShowLogin }) => {
    const { setToken, url } = useContext(StoreContext);
    const [currState, setCurrState] = useState("Sign Up");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const onLogin = async (event) => {
        event.preventDefault();

        let newUrl = url;
        if (currState === "Login") {
            newUrl += "/api/user/login"
        } else {
            newUrl += "/api/user/register"
        }

        try {
            const response = await axios.post(newUrl, data);

            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setShowLogin(false)
            } else {
                alert(response.data.message)
            }
        } catch (error) {
            console.error("Login/Register error:", error);
            alert("An error occurred during authentication.");
        }
    }

    return (
        <div className='fixed z-[100] w-full h-full bg-[#000000ba] grid'>
            <form onSubmit={onLogin} className='place-self-center w-[max(23vw,330px)] text-text-main bg-white flex flex-col gap-6 py-6 px-[30px] rounded-xl text-sm animate-fadeIn shadow-2xl'>
                <div className='flex justify-between items-center text-text-dark'>
                    <h2 className='text-2xl font-bold'>{currState}</h2>
                    <X onClick={() => setShowLogin(false)} className='cursor-pointer hover:text-primary transition-all' size={24} />
                </div>
                <div className='flex flex-col gap-5'>
                    {currState === "Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} className='border border-border-light p-2.5 rounded-md outline-primary' type="text" placeholder='Your name' required />}
                    <input name='email' onChange={onChangeHandler} value={data.email} className='border border-border-light p-2.5 rounded-md outline-primary' type="email" placeholder='Your email' required />
                    <input name='password' onChange={onChangeHandler} value={data.password} className='border border-border-light p-2.5 rounded-md outline-primary' type="password" placeholder='Password' required />
                </div>
                <button type='submit' className='border-none p-2.5 rounded-md text-white bg-primary text-base cursor-pointer hover:bg-[#e54420] transition-all font-medium'>{currState === "Sign Up" ? "Create account" : "Login"}</button>
                <div className='flex items-start gap-2 -mt-4'>
                    <input className='mt-1 accent-primary' type="checkbox" required />
                    <p className='text-[12px]'>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
                {currState === "Login"
                    ? <p>Create a new account? <span className='text-primary font-bold cursor-pointer hover:underline' onClick={() => setCurrState("Sign Up")}>Click here</span></p>
                    : <p>Already have an account? <span className='text-primary font-bold cursor-pointer hover:underline' onClick={() => setCurrState("Login")}>Login here</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup
