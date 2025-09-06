import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const Register: React.FC = () => (
    <>
        <Navbar />
        <main className="flex items-center justify-center min-h-screen bg-white">
            <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-xl shadow-lg">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
                <p className="mt-2 text-sm text-gray-600">Join us to manage your health appointments</p>
            </div>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="Full Name" required className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#155dfc]"/>
                <input type="email" placeholder="Email address" required className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#155dfc]"/>
                <input type="password" placeholder="Password" required className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#155dfc]"/>
                <button type="submit" className="w-full py-3 font-semibold text-white bg-[#155dfc] rounded-full transition-colors">
                    Create Account
                </button>
            </form>
            <p className="text-sm text-center text-gray-600">
                Already have an account? <Link to="/login" className="font-medium text-[#155dfc]">Sign in</Link>
            </p>
        </div>
        </main>
    </>
);

export default Register;
