import React, { useState, useContext } from 'react'
import { X } from 'lucide-react'
import { StoreContext } from '../../context/StoreContext'

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

        const response = await axios.post(newUrl, data);

        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false)
        } else {
            alert(response.data.message)
        }
    }

    return (
        <div className='fixed z-[100] w-full h-full bg-[#00000090] grid'>
            <form onSubmit={onLogin} className='place-self-center w-[max(23vw,330px)] text-[#808080] bg-white flex flex-col gap-6 py-6 px-[30px] rounded-lg text-sm animate-fadeIn'>
                <div className='flex justify-between items-center text-black'>
                    <h2 className='text-2xl font-bold'>{currState}</h2>
                    <X onClick={() => setShowLogin(false)} className='cursor-pointer' size={24} />
                </div>
                <div className='flex flex-col gap-5'>
                    {currState === "Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} className='border border-gray-300 p-2.5 rounded-md outline-orange-600' type="text" placeholder='Your name' required />}
                    <input name='email' onChange={onChangeHandler} value={data.email} className='border border-gray-300 p-2.5 rounded-md outline-orange-600' type="email" placeholder='Your email' required />
                    <input name='password' onChange={onChangeHandler} value={data.password} className='border border-gray-300 p-2.5 rounded-md outline-orange-600' type="password" placeholder='Password' required />
                </div>
                <button type='submit' className='border-none p-2.5 rounded-md text-white bg-orange-600 text-base cursor-pointer hover:bg-orange-700 transition'>{currState === "Sign Up" ? "Create account" : "Login"}</button>
                <div className='flex items-start gap-2 -mt-4'>
                    <input className='mt-1' type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
                {currState === "Login"
                    ? <p>Create a new account? <span className='text-orange-600 font-semibold cursor-pointer' onClick={() => setCurrState("Sign Up")}>Click here</span></p>
                    : <p>Already have an account? <span className='text-orange-600 font-semibold cursor-pointer' onClick={() => setCurrState("Login")}>Login here</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup
