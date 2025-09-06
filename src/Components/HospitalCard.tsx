import React from 'react';
import { Link } from 'react-router-dom';
import type { Hospital } from '../types/type';

const HospitalCard: React.FC<{ hospital: Hospital }> = ({ hospital }) => {
  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-2 transition-transform duration-300 ease-in-out">
      {/* Hospital Image */}
      <div className="h-48 w-full overflow-hidden">
        <img className="w-full h-full object-cover" src={hospital.imageUrl} alt={`Image of ${hospital.name}`} />
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Hospital Name and Location */}
        <h3 className="text-xl font-bold text-gray-900">{hospital.name}</h3>
        <p className="text-gray-600 mt-1">{hospital.location}</p>

        {/* Specialty Tag and Rating */}
        <div className="flex justify-between items-center mt-4">
          <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
            {hospital.specialty}
          </span>
          <span className="flex items-center font-bold text-yellow-500">
            <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {hospital.rating}
          </span>
        </div>

        {/* Call to Action Button */}
        <div className="mt-6 flex-grow flex items-end">
          <Link 
            to={`/hospitals/${hospital.id}`} 
            className="w-full text-center rounded-full bg-blue-600 py-3 px-7 font-medium text-white transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
};

export default HospitalCard;

