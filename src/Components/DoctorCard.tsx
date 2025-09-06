import React from 'react';
import { Link } from 'react-router-dom';
import { mockHospitals } from '../data/mockData';
import type { Doctor, Hospital } from '../types/type';

const DoctorCard: React.FC<{ doctor: Doctor; onBook: () => void }> = ({ doctor, onBook }) => {
    const hospital: Hospital | undefined = mockHospitals.find(h => h.id === doctor.hospitalId);

    // short about snippet
    const aboutSnippet = hospital?.about ? (hospital.about.length > 90 ? hospital.about.slice(0, 90) + '...' : hospital.about) : '';

    return (
        <div className="w-64 bg-white rounded-xl shadow-md overflow-hidden flex flex-col max-w-7xl">
            {/* Image area (square) with location pin */}
            <div className="relative w-full h-48 overflow-hidden">
                <img src={doctor.imageUrl} alt={doctor.name} className="w-full h-full object-cover" />
                {/* location pin at top-left */}
                <div className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm rounded-full p-1">
                    <svg className="w-4 h-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
                    </svg>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-gray-900">{doctor.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{doctor.specialty}</p>

                {hospital && (
                    <div className="mt-3">
                        <Link to={`/hospitals/${hospital.id}`} className="text-sm font-semibold text-blue-600 hover:underline">
                            {hospital.name}
                        </Link>
                        <p className="text-xs text-gray-500 mt-1">{aboutSnippet}</p>
                    </div>
                )}

                <div className="mt-4">
                    <button onClick={onBook} className="w-full rounded-full bg-blue-600 py-2 px-4 font-medium text-white transition-colors hover:bg-blue-700">
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DoctorCard;