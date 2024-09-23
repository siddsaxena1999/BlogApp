import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Navigate, useParams } from 'react-router-dom';
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

function EditPost() {
    const { id } = useParams();
    const [postData, setPostData] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const titleRef = useRef();
    const summaryRef = useRef();
    const [files, setFiles] = useState('');
    const contentRef = useRef();

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3000/post/${id}`)
                .then(res => res.data)
                .then(data => {
                    setPostData(data);
                })
                .catch(error => {
                    console.log(error.message);
                });
        }
    }, [id]);

    useEffect(() => {
        if (postData) {
            titleRef.current.value = postData.title;
            summaryRef.current.value = postData.summary;
            contentRef.current.getEditor().clipboard.dangerouslyPasteHTML(postData.content);
        }
    }, [postData]);

    const updatePost = async (ev) => {
        ev.preventDefault();
        let data = {
            title: titleRef.current.value,
            summary: summaryRef.current.value,
            content: contentRef.current.value
        }
        if (files?.[0]) {
            data = data.files = files?.[0];
        }

        try {
            const res = await axios.put(`http://localhost:3000/post/${id}`, data, { withCredentials: true });
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
        return <Navigate to={'/post/' + id} />
    }

    if (!postData) return <div>Loading...</div>; // Show a loader until the data is available

    return (
        <>
            <h1 className='text-xl text-center w-full font-bold'>Edit the Post</h1>
            <form className='flex flex-col gap-5 max-w-[1024px] md:mx-auto w-full px-8 md:p-0 mt-3' onSubmit={updatePost}>
                <input className='border py-1 px-3 rounded-sm w-full border-slate-400' ref={titleRef} type="text" placeholder='Title' />
                <input className='border py-1 px-3 rounded-sm w-full border-slate-400' ref={summaryRef} type="text" placeholder='Summary' />
                <input type="file" name='file' onChange={(ev) => setFiles(ev.target.files)} />
                <ReactQuill className='border rounded-sm' ref={contentRef} placeholder="Write here..." modules={modules} formats={formats} />
                <input type="submit" value="Update Post" className='w-full py-1 px-3 bg-slate-700 text-white cursor-pointer rounded-sm' />
            </form>
        </>
    );
}

export default EditPost;
