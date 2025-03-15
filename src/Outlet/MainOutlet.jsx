import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer/Footer';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const MainOutlet = () => {
    const location = useLocation();
    const noHeaderFooter = location.pathname.includes('/login') || location.pathname.includes('/signup')
    const isHomePage = location.pathname.includes('/')


    return (
        <div className='min-h-screen flex flex-col'>
            { noHeaderFooter || <Navbar></Navbar> }
            <main className={`${isHomePage?"":'w-11/12 mx-auto'} flex-1`}>
            <Outlet ></Outlet>
            </main>
            { noHeaderFooter || <Footer></Footer>}
            
        </div>
    );
};

export default MainOutlet;