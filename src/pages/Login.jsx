import React, { useContext, useRef, useState } from 'react'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import userContext from '../../store/user.context';
// import dotenv from 'dotenv';
// dotenv.config();

function Login() {
    const userNameRef = useRef();
    const passwordRef = useRef();
    const [navigate, setNavigate] = useState(false);
    const { setUserInfo } = useContext(userContext);

    const loginUser = async (ev) => {
        ev.preventDefault();

        const userInfo = {
            userName: userNameRef.current.value,
            password: passwordRef.current.value
        }

        try {
            const url = `${import.meta.env.VITE_API_URL}/login`;
            const res = await axios.post(url, userInfo, { withCredentials: true });
            const data = res.data;
            console.log(data);
            toast.success("Login successful");
            setTimeout(() => {
                setUserInfo(data);
                setNavigate(true);
            }, 1200)
        } catch (error) {
            console.log(error.message);
            if (error.response) {
                toast.error(error.response.data.message);
            }
        }
    }

    if (navigate) {
        return <Navigate to={'/'} />
    }

    return (
        <form className='md:max-w-[400px] w-full md:p-0 px-8 mx-auto flex flex-col gap-5' onSubmit={loginUser}>
            <h1 className='text-center text-4xl font-bold'>Login</h1>
            <div><input autoFocus className=' w-full py-2 px-2 bg-slate-100 border outline-none rounded-sm' ref={userNameRef} type="text" placeholder='Enter your username' /></div>
            <div><input className=' w-full py-2 px-2 bg-slate-100 border outline-none rounded-sm' ref={passwordRef} type="password" placeholder='Enter your password' /></div>
            <div><input className='w-full py-1 px-3 bg-slate-700 text-white cursor-pointer rounded-sm' type="submit" value="Login" /></div>
        </form>
    )
}

export default Login
