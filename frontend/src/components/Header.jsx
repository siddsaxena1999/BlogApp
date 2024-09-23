import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import userContext from '../../store/user.context';
import { toast } from 'react-hot-toast';

function Header() {
    const { userInfo, setUserInfo } = useContext(userContext);

    useEffect(() => {
        const getCookies = async () => {
            try {
                const res = await axios.get('http://localhost:3000/profile', { withCredentials: true });
                setUserInfo(res.data);
            } catch (error) {
                console.log(error.message);
            }
        }
        getCookies();
    }, []);

    const logoutUser = async () => {
        try {
            const res = await axios.get('http://localhost:3000/logout', { withCredentials: true });
            console.log(res.data);
            setTimeout(() => {
                toast.success("Logged out!");
                setUserInfo(null);
            }, 1200);
        } catch (error) {
            console.log(error.message);
        }
    }

    const username = userInfo?.userName;

    return (
        <header className='md:p-3 px-8 md:py-0 py-5 max-w-[1024px] mt-3 mx-auto flex justify-between mb-5'>
            <div><Link to='/'>
                <img className='md:h-[100px] md:scale-110 h-[50px] scale-110' src="brandLogo2.png" alt="logo" />
            </Link></div>
            <nav className="flex gap-3">
                {username ? <>
                    <div className='flex items-center gap-1'><Link to='/create' className='md:text-lg text-sm font-semibold'>Write </Link><span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                    </span></div>
                    <div className='flex gap-1 items-center'><a className='cursor-pointer md:text-lg text-sm font-semibold' onClick={logoutUser}>Logout</a> <h3 className='md:text-lg text-sm'>({username})</h3> </div>
                </> :
                    <>
                        <div><Link to='/login' className='md:text-lg text-sm font-semibold'>Login</Link></div>
                        <div><Link to='/register' className='md:text-lg text-sm font-semibold'>Register</Link></div>
                    </>}

            </nav>
        </header >
    )
}

export default Header
