import React, { useRef, useState } from 'react'
import ReactQuill from 'react-quill';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
// import dotenv from 'dotenv';
// dotenv.config();

import 'react-quill/dist/quill.snow.css';

const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
    ]
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
];

function CreatePost() {
    const [redirect, setRedirect] = useState(false);

    const titleRef = useRef();
    const summaryRef = useRef();
    const [files, setFiles] = useState('');
    const contentRef = useRef();

    const createPost = async (ev) => {
        ev.preventDefault();

        const data = new FormData();
        data.set('title', titleRef.current.value)
        data.set('summary', summaryRef.current.value)
        data.set('file', files)
        data.set('content', contentRef.current.value)

        try {
            const url = `${import.meta.env.VITE_API_URL}/post`;
            const res = await axios.post(url, data, { withCredentials: true });
            toast.success(res.data.message);
            if (res.status === 201) {
                setTimeout(() => {
                    setRedirect(true);
                }, 1000);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    if (redirect) {
        return <Navigate to='/' />
    }

    return (
        <>
            <h1 className='text-xl text-center w-full font-bold'>Write a new Post</h1>
            <form className='flex flex-col gap-5 max-w-[1024px] md:mx-auto w-full px-8 md:p-0 mt-3' onSubmit={createPost}>
                <input className='border py-1 px-3 rounded-sm w-full border-slate-400 ' ref={titleRef} type="text" placeholder='Title' />
                <input className='border py-1 px-3 rounded-sm w-full border-slate-400 ' ref={summaryRef} type="text" placeholder='Summary' />
                <input type="file" name='file' onChange={(ev) => setFiles(ev.target.files[0])} />
                <ReactQuill className='border rounded-sm' ref={contentRef} placeholder="Write here..." modules={modules} formats={formats} />
                <input type="submit" value="Create Post" className='w-full py-1 px-3 bg-slate-700 text-white cursor-pointer rounded-sm' />
            </form>
        </>
    )
}

export default CreatePost
