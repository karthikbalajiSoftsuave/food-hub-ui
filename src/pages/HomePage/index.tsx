import React from 'react'
import { Outlet } from "react-router-dom";

const HomePage: React.FC = () => {
    return (
        <div className="lg:flex min-h-screen">
            <div className="w-full">
                <Outlet />
            </div>
        </div>
    );
};

export default HomePage;
