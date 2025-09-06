import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const Login: React.FC = () => {
    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <main className="flex items-center justify-center min-h-screen bg-white">
                <div className="w-full max-w-sm p-8 space-y-4 bg-white rounded-xl shadow-lg text-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Login</h1>
                    <p className="mt-2 text-sm text-gray-600">Welcome back! Please enter your details.</p>
                </div>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <input 
                        type="email" 
                        placeholder="Email address" 
                        required 
                        className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        required 
                        className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                    <button 
                        type="submit" 
                        className="w-full py-3 font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
                        Login
                    </button>
                </form>
                <Link 
                    to="/register" 
                    className="block w-full py-3 font-semibold text-blue-600 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors">
                    Register
                </Link>
                <button 
                    onClick={() => navigate('/admin/login')} 
                    className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors mt-2">
                    Admin Login
                </button>
            </div>
            </main>
        </>
    );
};

export default Login;
