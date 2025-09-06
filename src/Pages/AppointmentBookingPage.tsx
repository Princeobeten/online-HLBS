import { useState, useMemo } from "react";
import { mockDoctors } from "../data/mockData";
import DoctorCard from "../Components/DoctorCard";
import BookingModal from "../Components/BookingModal";
import type { Doctor } from "../types/type";
import Navbar from '../Components/Navbar';

const AppointmentBookingPage: React.FC = () => {
    // now showing all doctors across the platform

    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [query, setQuery] = useState('');

    const handleOpenModal = (doctor: Doctor) => {
        setSelectedDoctor(doctor);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedDoctor(null);
    };

    

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-white max-w-7xl mx-auto p-6">
                <div className="px-6 py-12">
                    <div className="text-center mb-8">
                         <h1 className="text-4xl font-bold text-gray-800">Choose a Doctor</h1>
                         <p className="mt-2 text-lg text-gray-600">Browse all doctors available on the platform and book anyone that fits your needs.</p>
                        {/* Search */}
                        <div className="mt-6 max-w-md mx-auto">
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search doctors by name or specialty..."
                                className="w-full py-3 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                    </div>

                    {/* Grid layout for doctor cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {useMemo(() => mockDoctors.filter(d => {
                            const q = query.trim().toLowerCase();
                            if (!q) return true;
                            return d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q);
                        }).map(doctor => (
                            <DoctorCard key={doctor.id} doctor={doctor} onBook={() => handleOpenModal(doctor)} />
                        )), [query])}
                    </div>
                </div>
            </main>

            {isModalOpen && selectedDoctor && (
                <BookingModal doctor={selectedDoctor} onClose={handleCloseModal} onSubmit={handleCloseModal} />
            )}
        </>
    );
};

export default AppointmentBookingPage;