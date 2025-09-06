import React, { useState } from 'react';
import AdminSidebar from '../../Components/AdminSidebar';
import type { Appointment } from '../../types/type';
import { mockAppointments } from '../../data/mockData';

const AdminAppointments: React.FC = () => {
	const [appointments, setAppointments] = useState<Appointment[]>(() => mockAppointments.slice());

	const updateStatus = (id: string, status: Appointment['status']) => {
		setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
	};

	return (
		<div className="flex min-h-screen">
			<AdminSidebar />
			<main className="flex-1 p-8">
				<h1 className="text-2xl font-bold">Appointments</h1>
				<p className="text-gray-600 mt-2">Manage appointments here (using local mock data).</p>

				<div className="mt-6 space-y-4">
					{appointments.map((a) => (
						<div key={a.id} className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
							<div>
								<div className="font-semibold">{a.patientName} — {a.doctorName}</div>
								<div className="text-sm text-gray-500">{a.hospitalName} • {a.date} @ {a.time}</div>
							</div>
							<div className="flex items-center gap-2">
								<span className="text-sm px-3 py-1 rounded-full bg-gray-100">{a.status}</span>
								<select value={a.status} onChange={(e) => updateStatus(a.id, e.target.value as Appointment['status'])} className="border px-2 py-1 rounded">
									<option>Upcoming</option>
									<option>Completed</option>
									<option>Cancelled</option>
								</select>
							</div>
						</div>
					))}
				</div>
			</main>
		</div>
	);
};

export default AdminAppointments;
