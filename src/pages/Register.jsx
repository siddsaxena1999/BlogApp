import React, { useRef } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';
// import dotenv from 'dotenv';
// dotenv.config();

function Register() {

    const userNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const registerUser = async (ev) => {
        ev.preventDefault();

        const userName = userNameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        try {
            const url = `${import.meta.env.VITE_API_URL}/register`;
            const res = await axios.post(url, { userName, email, password })
            const data = res.data;
            console.log(data);
            toast.success("Registration successful");
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            }
        }
    }

    return (
        <form className='md:max-w-[400px] w-full mx-auto md:px-0 px-8 flex flex-col gap-5' onSubmit={registerUser}>
            <h1 className='text-center text-4xl font-bold'>Register</h1>
            <div><input autoFocus className=' w-full py-2 px-2 bg-slate-100 border outline-none rounded-sm' type="text" ref={userNameRef} placeholder='Enter your username' /></div>
            <div><input className=' w-full py-2 px-2 bg-slate-100 border outline-none rounded-sm' type="email" ref={emailRef} placeholder='Enter your email' /></div>
            <div><input className=' w-full py-2 px-2 bg-slate-100 border outline-none rounded-sm' type="password" ref={passwordRef} placeholder='Enter your password' /></div>
            <div><input className='w-full py-1 px-3 bg-slate-700 text-white cursor-pointer rounded-sm' type="submit" value="Login" /></div>
        </form>
    )
}

export default Register
