import React, { useState, useMemo } from 'react';
import HospitalCard from '../Components/HospitalCard';
import Navbar from '../Components/Navbar';
import { mockHospitals } from '../data/mockData';

const Home: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState('All');
    const [specialtyFilter, setSpecialtyFilter] = useState('All');

    // Efficiently filter hospitals based on user input
    const filteredHospitals = useMemo(() => {
        return mockHospitals.filter(hospital => {
            const matchesSearch = hospital.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesLocation = locationFilter === 'All' || hospital.location === locationFilter;
            const matchesSpecialty = specialtyFilter === 'All' || hospital.specialty === specialtyFilter;
            return matchesSearch && matchesLocation && matchesSpecialty;
        });
    }, [searchTerm, locationFilter, specialtyFilter]);

    return (
        <>
            <Navbar />
            <main className="bg-white max-w-7xl mx-auto p-6">
            {/* Hero Section */}
            <section className=" pt-20 pb-24 text-center">
                <div className="container mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-600">Find the Best Care</h1>
                    <p className="mt-4 text-lg text-gray-600">Book appointments with top hospitals and doctors near you.</p>
                    <div className="mt-8 max-w-2xl mx-auto">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                {/* Inline search icon to avoid external dependency on lucide-react */}
                                <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search by hospital name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full py-4 pl-12 pr-4 text-lg border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-[#357a38] focus:border-[#357a38] transition"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content: Filters + Results */}
            <div className="container mx-auto px-6 py-16">
                {/* Filter Controls */}
                <div className="flex flex-col md:flex-row gap-4 mb-12">
                    <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} className="w-full md:w-auto flex-1 bg-white px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#357a38] transition">
                        <option value="All">All Locations</option>
                        <option value="Metropolis">Metropolis</option>
                        <option value="Oceanview">Oceanview</option>
                        <option value="Silverstone">Silverstone</option>
                    </select>
                    <select value={specialtyFilter} onChange={(e) => setSpecialtyFilter(e.target.value)} className="w-full md:w-auto flex-1 bg-white px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#357a38] transition">
                        <option value="All">All Specialties</option>
                        <option value="Cardiology">Cardiology</option>
                        <option value="Pediatrics">Pediatrics</option>
                        <option value="Orthopedics">Orthopedics</option>
                    </select>
                </div>

                {/* Results Grid */}
                <div>
                    {filteredHospitals.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                           {filteredHospitals.map(hospital => (
                               <HospitalCard key={hospital.id} hospital={hospital} />
                           ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 py-16">
                           <h2 className="text-2xl font-semibold">No Hospitals Found</h2>
                           <p className="mt-2">Try adjusting your search or filter criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
        </>
    );
};

export default Home;