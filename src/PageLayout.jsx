import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from './NavBar/NavBar';
import { Footer } from './Footer/Footer';

export function PageLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-zinc-900 text-white">
            <NavBar />
            <div className="flex-grow pt-20 px-4 paddingTop:'70px">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}
