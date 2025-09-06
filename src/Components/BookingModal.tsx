import React from 'react';
import type { Doctor } from '../types/type';


const BookingModal: React.FC<{ doctor: Doctor; onClose: () => void; onSubmit: () => void; }> = ({ doctor, onClose, onSubmit }) => {
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Booking confirmed for", doctor.name);
        onSubmit();
    };

    return (
        <div className="fixed inset-0 bg-black/70 bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 transform transition-all">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Book Appointment</h2>
                        <p className="mt-1 text-gray-600">with <span className="font-semibold">{doctor.name}</span></p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
                            <input type="date" name="date" id="date" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </div>
                        <div>
                            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Select Time</label>
                            <select id="time" name="time" className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>09:00 AM</option><option>10:00 AM</option><option>11:00 AM</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 mb-1">Your Full Name</label>
                        <input type="text" placeholder="e.g., John Doe" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div>
                        <label htmlFor="patientIssue" className="block text-sm font-medium text-gray-700 mb-1">Describe your symptoms</label>
                        <textarea type="text" placeholder="How are you feeling...." required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className="pt-4 flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="rounded-full bg-gray-200 py-3 px-8 font-medium text-gray-800 hover:bg-gray-300">Cancel</button>
                        <button type="submit" className="rounded-full bg-blue-600 py-3 px-8 font-medium text-white hover:bg-blue-700">Confirm Booking</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingModal;