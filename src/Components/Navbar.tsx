import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const Navbar: React.FC = () => {
    const { isAuthenticated, logout, userRole } = useAuth();
    // State to manage the open/closed status of the mobile menu
    const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

    // Function to toggle the mobile menu state
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            {/* Main header and navigation bar */}
            <header className=" py-5 px-6 sm:px-10">
                <div className="mx-auto flex max-w-7xl items-center">
                    {/* Left: Logo */}
                    <div className="flex-1">
                        <a href="/" className="text-2xl font-bold text-blue-600">
                            onlinehospital
                        </a>
                    </div>

                    {/* Center: Desktop Navigation Links - hidden on screens smaller than lg */}
                    <nav className="hidden lg:flex flex-1 justify-center items-center gap-10">
                        <Link to="/" className="font-medium text-blue-600 transition-colors hover:text-blue-600">Home</Link>
                        <Link to="/map" className="font-medium text-gray-600 transition-colors hover:text-blue-600">Map</Link>
                        {isAuthenticated && <Link to="/book" className="font-medium text-gray-600 transition-colors hover:text-blue-600">Book</Link>}
                        {isAuthenticated && <Link to="/appointments" className="font-medium text-gray-600 transition-colors hover:text-blue-600">My Appointments</Link>}
                    </nav>

                    {/* Right: Auth buttons + hamburger for mobile */}
                    <div className="flex-1 flex items-center justify-end">
                        <div className="hidden lg:flex items-center gap-6">
                            {!isAuthenticated ? (
                                <>
                                    <Link to="/login" className="font-medium text-gray-600 transition-colors hover:text-blue-600">Login</Link>
                                    <Link to="/register" className="rounded-full bg-blue-600 py-3 px-7 font-medium text-white transition-colors">Sign Up</Link>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => logout()} className="font-medium text-gray-600 hover:text-blue-600">Logout</button>
                                    {userRole === 'admin' && <Link to="/admin" className="text-sm text-blue-600">Admin</Link>}
                                </>
                            )}
                        </div>

                        {/* Hamburger Menu Button - only visible on screens smaller than lg */}
                        <button
                            className="lg:hidden flex flex-col justify-around w-8 h-6 bg-transparent border-none cursor-pointer p-0 z-50 ml-4"
                            onClick={toggleMobileMenu}
                            aria-label="Toggle navigation"
                        >
                            <div className={`w-full h-0.5 bg-gray-800 rounded-full transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45 translate-y-[10px]' : ''}`} />
                            <div className={`w-full h-0.5 bg-gray-800 rounded-full transition-opacity duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                            <div className={`w-full h-0.5 bg-gray-800 rounded-full transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? '-rotate-45 -translate-y-[10px]' : ''}`} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Navigation Menu - slides in from the left */}
            <div
                className={`lg:hidden fixed top-0 left-0 w-full h-screen bg-[#f5f3ef] flex flex-col items-center justify-center gap-8 transition-transform duration-500 ease-in-out z-40 ${
                    isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <Link to="/" className="text-2xl font-medium text-blue-600">Home</Link>
                <Link to="/map" className="text-2xl font-medium text-gray-600">Map</Link>
                {isAuthenticated && <Link to="/book" className="text-2xl font-medium text-gray-600">Book</Link>}
                {isAuthenticated && <Link to="/appointments" className="text-2xl font-medium text-gray-600">My Appointments</Link>}
                <hr className="w-4/5 my-4 border-gray-300" />
                {!isAuthenticated ? (
                    <>
                        <Link to="/login" className="text-2xl font-medium text-gray-600">Login</Link>
                        <Link to="/register" className="rounded-full bg-blue-600 py-3 px-10 text-xl font-medium text-white">Sign Up</Link>
                    </>
                ) : (
                    <button onClick={() => logout()} className="text-2xl font-medium text-gray-600">Logout</button>
                )}
            </div>
        </>
    );
};

export default Navbar;