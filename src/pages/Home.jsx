import React, { useEffect, useState } from 'react'
import BlogPost from '../components/BlogPost';
import axios from 'axios';
// import dotenv from 'dotenv';
// dotenv.config();

function Home() {

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        try {
            const url = `${import.meta.env.VITE_API_URL}/posts`;
            axios.get(url)
                .then(res => res.data)
                .then(data => setPosts(data))
        } catch (error) {
            console.log(error.message);
        }
    }, []);
    return (
        <>
            {posts.map(blog => <BlogPost key={blog._id} {...blog} />)}
        </>
    )
}

export default Home
