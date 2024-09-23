import React, { useEffect, useState } from 'react'
import BlogPost from '../components/BlogPost';
import axios from 'axios';

function Home() {

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        try {
            axios.get('http://localhost:3000/posts')
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
