import React from 'react'
import TimeAgo from 'react-time-ago';
import { Link } from 'react-router-dom';
// import dotenv from 'dotenv';
// dotenv.config();

function BlogPost({ _id, cover, title, summary, createdAt, author }) {
    const url = `${import.meta.env.VITE_API_URL}/`;

    return (
        <div className="blogPost w-full flex md:flex-row flex-col gap-5 md:p-0 px-8">
            <div className='md:w-1/2 w-full'>
                <Link to={`/post/${_id}`}>
                    <img className='w-full' src={`${url}${cover}`} alt="blogImage" />
                </Link>
            </div>
            <div className='md:w-1/2 px-8 flex flex-col md:items-start items-center gap-5'>
                <div>
                    <Link to={`/post/${_id}`}>
                        <h3 className='text-4xl font-semibold'>{title}</h3>
                    </Link>
                </div>
                <div className='flex gap-3 items-center'><h4 className='font-bold text-sm'>{author.userName}</h4><span className='text-xs font-semibold text-slate-600'><TimeAgo date={new Date(createdAt)} /></span></div>
                <div><p className='text-md font-medium'>{summary}</p></div>
            </div>
        </div>
    )
}

export default BlogPost
