import React, { useContext, useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const ProfilePopup = ({ setShowProfile }) => {

    const { url, token } = useContext(StoreContext);
    const [currState, setCurrState] = useState("Edit Profile");
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        oldPassword: "",
        newPassword: ""
    })

    const fetchProfile = async () => {
        const response = await axios.get(url + "/api/user/profile", { headers: { token } });
        if (response.data.success) {
            const user = response.data.data;
            setData({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                phone: user.phone || "",
                address: user.address || "",
                oldPassword: "",
                newPassword: ""
            })
        }
    }

    useEffect(() => {
        fetchProfile();
    }, [])

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const onUpdateProfile = async (event) => {
        event.preventDefault();
        const response = await axios.post(url + "/api/user/update", {
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            address: data.address
        }, { headers: { token } });

        if (response.data.success) {
            alert("Profile updated successfully");
            setShowProfile(false);
        } else {
            alert(response.data.message);
        }
    }

    const onChangePassword = async (event) => {
        event.preventDefault();
        const response = await axios.post(url + "/api/user/change-password", {
            oldPassword: data.oldPassword,
            newPassword: data.newPassword
        }, { headers: { token } });

        if (response.data.success) {
            alert("Password changed successfully");
            setShowProfile(false);
        } else {
            alert(response.data.message);
        }
    }

    return (
        <div className='fixed z-20 w-full h-full bg-[#00000090] grid'>
            <form onSubmit={currState === "Edit Profile" ? onUpdateProfile : onChangePassword} className='place-self-center w-[max(23vw,330px)] text-text-main bg-white flex flex-col gap-6 py-6 px-7 rounded-lg text-sm animate-fadeIn'>
                <div className='flex justify-between items-center text-text-dark'>
                    <h2 className='text-2xl font-bold'>{currState}</h2>
                    <X onClick={() => setShowProfile(false)} className='w-4 cursor-pointer hover:text-primary transition-all' />
                </div>
                <div className='flex flex-col gap-5'>
                    {currState === "Edit Profile" ? (
                        <>
                            <div className='flex gap-2'>
                                <input name='firstName' onChange={onChangeHandler} value={data.firstName} className='outline-none border border-border-light p-2.5 rounded w-1/2' type="text" placeholder='First Name' required />
                                <input name='lastName' onChange={onChangeHandler} value={data.lastName} className='outline-none border border-border-light p-2.5 rounded w-1/2' type="text" placeholder='Last Name' required />
                            </div>
                            <input name='phone' onChange={onChangeHandler} value={data.phone} className='outline-none border border-border-light p-2.5 rounded' type="text" placeholder='Phone' required />
                            <textarea name='address' onChange={onChangeHandler} value={data.address} className='outline-none border border-border-light p-2.5 rounded resize-none' rows="3" placeholder='Delivery Address' required></textarea>
                        </>
                    ) : (
                        <>
                            <input name='oldPassword' onChange={onChangeHandler} value={data.oldPassword} className='outline-none border border-border-light p-2.5 rounded' type="password" placeholder='Old Password' required />
                            <input name='newPassword' onChange={onChangeHandler} value={data.newPassword} className='outline-none border border-border-light p-2.5 rounded' type="password" placeholder='New Password (min 8 characters)' required />
                        </>
                    )}
                </div>
                <button type='submit' className='border-none p-2.5 rounded text-white bg-primary text-[15px] cursor-pointer hover:bg-[#e54420] transition-all uppercase font-medium'>
                    {currState === "Edit Profile" ? "Save Changes" : "Update Password"}
                </button>
                <div className='flex gap-2 text-xs'>
                    {currState === "Edit Profile" ? (
                        <p>Need to change password? <span onClick={() => setCurrState("Change Password")} className='text-primary font-medium cursor-pointer hover:underline'>Click here</span></p>
                    ) : (
                        <p>Want to edit profile? <span onClick={() => setCurrState("Edit Profile")} className='text-primary font-medium cursor-pointer hover:underline'>Click here</span></p>
                    )}
                </div>
            </form>
        </div>
    )
}

export default ProfilePopup
