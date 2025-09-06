import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../Components/AdminSidebar';
import type { Hospital, Doctor } from '../../types/type';

const AdminDashboard: React.FC = () => {
	const [hospitals, setHospitals] = useState<Hospital[]>([]);
	const [doctors, setDoctors] = useState<Doctor[]>([]);
	const [appointmentsCount, setAppointmentsCount] = useState<number | null>(null);

	useEffect(() => {
		fetch('/api/admin/hospitals')
			.then((r) => r.json())
			.then(setHospitals)
			.catch(() => setHospitals([]));

		fetch('/api/admin/doctors')
			.then((r) => r.json())
			.then(setDoctors)
			.catch(() => setDoctors([]));

		fetch('/api/admin/appointments')
			.then((r) => r.json())
			.then((data) => setAppointmentsCount(Array.isArray(data) ? data.length : null))
			.catch(() => setAppointmentsCount(null));
	}, []);

	return (
		<div className="flex min-h-screen bg-gray-50">
			<AdminSidebar />
			<main className="flex-1 p-8">
				<h1 className="text-2xl font-bold">Admin Dashboard</h1>
				<p className="text-gray-600 mt-2">Overview and stats.</p>

				<div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
					<div className="bg-white rounded-lg p-4 shadow">
						<div className="text-sm text-gray-500">Hospitals</div>
						<div className="text-2xl font-semibold mt-2">{hospitals.length}</div>
					</div>
					<div className="bg-white rounded-lg p-4 shadow">
						<div className="text-sm text-gray-500">Doctors</div>
						<div className="text-2xl font-semibold mt-2">{doctors.length}</div>
					</div>
					<div className="bg-white rounded-lg p-4 shadow">
						<div className="text-sm text-gray-500">Appointments</div>
						<div className="text-2xl font-semibold mt-2">{appointmentsCount ?? '200'}</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default AdminDashboard;
