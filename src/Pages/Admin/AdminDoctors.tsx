import React, { useState } from 'react';
import AdminSidebar from '../../Components/AdminSidebar';
import type { Doctor } from '../../types/type';
import { mockDoctors } from '../../data/mockData';

const AdminDoctors: React.FC = () => {
	const [doctors, setDoctors] = useState<Doctor[]>(() => mockDoctors.slice());
	const [editing, setEditing] = useState<Doctor | null>(null);
	const [isAdding, setIsAdding] = useState(false);

	const handleDelete = (id: number) => {
		if (!confirm('Delete doctor?')) return;
		setDoctors((s) => s.filter((d) => d.id !== id));
	};

	const handleSave = (payload: Partial<Doctor>) => {
		if (isAdding) {
			const nextId = Math.max(0, ...doctors.map((d) => d.id)) + 1;
			const newD: Doctor = { id: nextId, name: payload.name || 'New Doctor', specialty: payload.specialty || '', imageUrl: payload.imageUrl || 'https://placehold.co/100x100/ddd/333?text=DR', hospitalId: payload.hospitalId || 1 };
			setDoctors((s) => [newD, ...s]);
			setIsAdding(false);
		} else if (editing) {
			setDoctors((s) => s.map((d) => (d.id === editing.id ? { ...d, ...payload } as Doctor : d)));
			setEditing(null);
		}
	};

	return (
		<div className="flex min-h-screen bg-gray-50">
			<AdminSidebar />
			<main className="flex-1 p-8">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-2xl font-semibold">Doctors</h1>
						<p className="mt-1 text-gray-600">Manage doctor profiles here.</p>
					</div>
					<div>
						<button onClick={() => setIsAdding(true)} className="bg-blue-600 text-white px-4 py-2 rounded-full">Add Doctor</button>
					</div>
				</div>

				<div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{doctors.map((d) => (
						<div key={d.id} className="bg-white rounded-lg shadow p-4">
							<img src={d.imageUrl} alt={d.name} className="w-24 h-24 object-cover rounded-full mx-auto" />
							<h3 className="font-semibold mt-3 text-center">{d.name}</h3>
							<p className="text-sm text-gray-500 text-center">{d.specialty}</p>
							<div className="mt-3 flex justify-center gap-2">
								<button onClick={() => setEditing(d)} className="px-3 py-1 rounded bg-blue-100 text-blue-600">Edit</button>
								<button onClick={() => handleDelete(d.id)} className="px-3 py-1 rounded bg-red-100 text-red-600">Delete</button>
							</div>
						</div>
					))}
				</div>

				{(isAdding || editing) && (
					<div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
						<div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
							<h2 className="text-xl font-semibold mb-4">{isAdding ? 'Add Doctor' : 'Edit Doctor'}</h2>
							<form onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.currentTarget as HTMLFormElement); handleSave({ name: fd.get('name') as string, specialty: fd.get('specialty') as string, imageUrl: fd.get('imageUrl') as string, hospitalId: Number(fd.get('hospitalId')) }); }} className="space-y-3">
								<input name="name" defaultValue={editing?.name} required className="w-full px-3 py-2 border rounded" placeholder="Name" />
								<input name="specialty" defaultValue={editing?.specialty} className="w-full px-3 py-2 border rounded" placeholder="Specialty" />
								<input name="imageUrl" defaultValue={editing?.imageUrl} className="w-full px-3 py-2 border rounded" placeholder="Image URL" />
								<input name="hospitalId" defaultValue={editing?.hospitalId} type="number" className="w-full px-3 py-2 border rounded" placeholder="Hospital ID" />
								<div className="flex justify-end gap-2">
									<button onClick={() => { setIsAdding(false); setEditing(null); }} type="button" className="px-4 py-2 border rounded">Cancel</button>
									<button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
								</div>
							</form>
						</div>
					</div>
				)}
			</main>
		</div>
	);
};

export default AdminDoctors;
