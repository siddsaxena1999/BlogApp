import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';

function Layout() {
    return (
        <>
            <Header />
            <main className='max-w-[1024px] my-0 mx-auto flex flex-col gap-5'>
                {<Outlet />}
            </main>
            <Footer />
            <Toaster />
        </>
    )
}

export default Layout
