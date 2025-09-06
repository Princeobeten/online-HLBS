import React from 'react';
import { mockAppointments } from '../data/mockData';
import Navbar from '../Components/Navbar';

const Appointments: React.FC = () => (
    <>
        <Navbar />
        <main className="min-h-screen bg-white max-w-7xl mx-auto p-6">
            <div className="px-6 py-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">My Appointments</h1>
            <div className="space-y-6">
                {mockAppointments.map(appt => (
                    <div key={appt.id} className="bg-white p-6 rounded-xl shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">{appt.hospitalName}</h3>
                            <p className="text-gray-600">With {appt.doctorName}</p>
                            <p className="text-sm text-gray-500 mt-2">{new Date(appt.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} at {appt.time}</p>
                        </div>
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                                appt.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' :
                                    appt.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                                'bg-red-100 text-red-800'
                            }`}>
                                {appt.status}
                            </span>
                            {appt.status === 'Upcoming' && (
                                <button className="rounded-full bg-gray-200 py-2 px-6 font-medium text-gray-800 transition-colors hover:bg-gray-300">
                                    Cancel
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </main>
    </>
);

export default Appointments;
