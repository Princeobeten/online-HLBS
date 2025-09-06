import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const AdminSidebar: React.FC = () => {
    const linkStyle = "flex items-center px-4 py-3 text-gray-700 transition-colors duration-200 transform rounded-lg hover:bg-gray-200";
    const activeLinkStyle = "bg-blue-600 text-white font-bold";
    const { logout } = useAuth();
    const nav = useNavigate();

    return (
        <aside className="w-64 bg-white shadow-md h-screen p-4">
            <nav>
                <NavLink to="/admin" end className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}>
                    Dashboard
                </NavLink>
                <NavLink to="/admin/hospitals" className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}>
                    Hospitals
                </NavLink>
                <NavLink to="/admin/doctors" className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}>
                    Doctors
                </NavLink>
                <NavLink to="/admin/appointments" className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}>
                    Appointments
                </NavLink>
                <div className="mt-6">
                    <button onClick={() => { logout(); nav('/'); }} className="w-full text-left px-4 py-2 rounded bg-red-100 text-red-600">Logout</button>
                </div>
            </nav>
        </aside>
    );
};

export default AdminSidebar;
