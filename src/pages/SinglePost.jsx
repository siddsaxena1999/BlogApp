import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TimeAgo from 'react-time-ago';
import { Link } from 'react-router-dom';
import userContext from '../../store/user.context';
import { toast } from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
// import dotenv from 'dotenv';
// dotenv.config();

function SinglePost() {
    const { id } = useParams();
    const [postInfo, setPostInfo] = useState(null);
    const { userInfo } = useContext(userContext);
    const [redirect, setRedirect] = useState(false);
    useEffect(() => {
        try {
            const url = `${import.meta.env.VITE_API_URL}/post/${id}`;
            axios.get(url)
                .then(res => res.data)
                .then(data => setPostInfo(data));
        } catch (error) {
            console.log(error.message);
        }
    }, []);

    const deletePost = async () => {
        try {
            const url = `${import.meta.env.VITE_API_URL}/post/${id}`;
            const res = await axios.delete(url, { withCredentials: true });
            console.log(res.data.message);
            toast.success(res.data.message);
            setTimeout(() => {
                setRedirect(true);
            }, 1000)
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    if (postInfo === null) return '';

    if (redirect) {
        return <Navigate to='/' />
    }

    return (
        <div className='max-w-[800px] flex flex-col mx-auto md:p-0 px-8'>
            <div className='mt-8 mb-4'>
                <h1 className='text-5xl font-bold text-center'>{postInfo.title}</h1>
            </div>
            <div className='flex gap-5 items-center justify-center mb-5'>
                <h2 className='font-semibold'>{postInfo.author.userName}</h2>
                <span className='text-xs font-semibold text-slate-600'><TimeAgo date={new Date(postInfo.createdAt)} /></span>
            </div>
            {userInfo.id === postInfo.author._id && (
                <div className='flex justify-center mb-8 gap-5'>
                    <Link to={`/edit-post/${id}`} className='bg-slate-500 text-white flex gap-3 py-3 px-4 rounded-md'>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                        </span>
                    </Link>
                    <button onClick={deletePost} className='bg-red-500 text-white flex gap-3 py-3 px-4 rounded-md'>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>

                        </span>
                    </button>
                </div>
            )}
            <div className='mb-10'>
                <img src={`http://localhost:3000/${postInfo.cover}`} alt="blog cover" />
            </div>
            <div dangerouslySetInnerHTML={{ __html: postInfo.content }} className='text-lg' />
        </div>
    )
}

export default SinglePost
