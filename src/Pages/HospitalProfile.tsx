import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import type { Hospital } from '../types/type';
import { mockHospitals } from '../data/mockData';

const HospitalProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const hospital: Hospital | undefined = mockHospitals.find(h => h.id === Number(id));

    // Handle case where hospital is not found
    if (!hospital) {
        return (
            <main className="flex flex-col items-center justify-center min-h-[80vh] max-w-7xl mx-auto">
                <div className="text-center">
                    <h1 className="text-6xl font-extrabold text-[#357a38]">404</h1>
                    <h2 className="mt-4 text-3xl font-bold text-gray-800">Hospital Not Found</h2>
                    <p className="mt-4 text-lg text-gray-600">Sorry, we couldn’t find the hospital you’re looking for.</p>
                    <Link to="/" className="mt-8 inline-block rounded-full bg-[#357a38] py-3 px-7 font-medium text-white transition-colors hover:bg-[#2c6b2f]">
                        Back to Search
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <>
            <Navbar />
            <main className="bg-white max-w-7xl mx-auto p-6">
            {/* Hero Section */}
            <section className="relative h-64 md:h-80 rounded-md overflow-hidden" style={{ backgroundImage: `url(${hospital.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end p-6 md:p-12">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white">{hospital.name}</h1>
                        <div className="flex items-center gap-4 mt-2">
                             <p className="text-lg text-gray-200">{hospital.location}</p>
                             <span className="flex items-center font-bold text-yellow-400">
                                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                {hospital.rating}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Details */}
                    <div className="lg:col-span-2">
                        <div className="bg-white p-8 rounded-xl ">
                            <h2 className="text-2xl font-bold text-gray-800">About {hospital.name}</h2>
                            <p className="mt-4 text-gray-600 leading-relaxed whitespace-pre-line">{hospital.about}</p>
                        </div>
                        <div className="bg-white p-8 rounded-xl  mt-8">
                            <h2 className="text-2xl font-bold text-gray-800">Services Offered</h2>
                            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
                                {hospital.services.map(service => (
                                    <li key={service} className="flex items-center text-gray-700">
                                        <svg className="w-5 h-5 mr-3 text-[#357a38]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        {service}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Column: Doctors */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-xl  sticky top-28">
                            <h2 className="text-2xl font-bold text-gray-800">Our Doctors</h2>
                            <div className="mt-6 space-y-5">
                                {hospital.doctors.map(doctor => (
                                    <div key={doctor.id} className="flex items-center space-x-4">
                                        <img src={doctor.imageUrl} alt={doctor.name} className="w-16 h-16 rounded-full object-cover shadow-sm" />
                                        <div>
                                            <h4 className="font-semibold text-gray-800">{doctor.name}</h4>
                                            <p className="text-sm text-gray-500">{doctor.specialty}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        </>
    );
};

export default HospitalProfile;

