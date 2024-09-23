import React from 'react'
import { Routes, Route } from 'react-router-dom';
import './index.css';
import Layout from './Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import SinglePost from './pages/SinglePost';
import EditPost from './pages/EditPost';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/create' element={<CreatePost />} />
        <Route path='/post/:id' element={<SinglePost />} />
        <Route path='/edit-post/:id' element={<EditPost />} />
      </Route>
    </Routes>
  )
}

export default App
