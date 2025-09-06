import React, { useState } from 'react';
import AdminSidebar from '../../Components/AdminSidebar';
import type { Hospital } from '../../types/type';
import { mockHospitals } from '../../data/mockData';

const AdminHospitals: React.FC = () => {
		const [hospitals, setHospitals] = useState<Hospital[]>(() => mockHospitals.slice());
		const [editing, setEditing] = useState<Hospital | null>(null);
		const [isAdding, setIsAdding] = useState(false);

		const handleDelete = (id: number) => {
			if (!confirm('Delete hospital?')) return;
			setHospitals((s) => s.filter((h) => h.id !== id));
		};

		const handleSave = (h: Partial<Hospital>) => {
			if (isAdding) {
				// create local id
				const nextId = Math.max(0, ...hospitals.map((x) => x.id)) + 1;
				const newHospital: Hospital = {
					id: nextId,
					name: h.name || 'New Hospital',
					location: h.location || '',
					specialty: h.specialty || '',
					rating: h.rating || 0,
					lat: h.lat,
					lng: h.lng,
					imageUrl: h.imageUrl || 'https://placehold.co/600x400/5a9bd5/FFFFFF?text=New+Hospital',
					about: h.about || '',
					services: h.services || [],
					doctors: h.doctors || [],
				};
				setHospitals((s) => [newHospital, ...s]);
				setIsAdding(false);
			} else if (editing) {
				setHospitals((s) => s.map((existing) => (existing.id === editing.id ? { ...existing, ...h } as Hospital : existing)));
				setEditing(null);
			}
		};

	return (
		<div className="flex min-h-screen bg-gray-50">
			<AdminSidebar />
			<main className="flex-1 p-8">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-2xl font-semibold">Hospitals</h1>
						<p className="mt-1 text-gray-600">Manage hospital records here.</p>
					</div>
					<div>
						<button onClick={() => setIsAdding(true)} className="bg-blue-600 text-white px-4 py-2 rounded-full">Add Hospital</button>
					</div>
				</div>

				<div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{hospitals.map((h) => (
						<div key={h.id} className="bg-white rounded-lg shadow p-4">
							<img src={h.imageUrl} alt={h.name} className="w-full h-36 object-cover rounded" />
							<h3 className="font-semibold mt-3">{h.name}</h3>
							<p className="text-sm text-gray-500">{h.location} • {h.specialty}</p>
							<div className="mt-3 flex gap-2">
								<button onClick={() => setEditing(h)} className="px-3 py-1 rounded bg-blue-100 text-blue-600">Edit</button>
								<button onClick={() => handleDelete(h.id)} className="px-3 py-1 rounded bg-red-100 text-red-600">Delete</button>
							</div>
						</div>
					))}
				</div>

				{(isAdding || editing) && (
					<div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
						<div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
							<h2 className="text-xl font-semibold mb-4">{isAdding ? 'Add Hospital' : 'Edit Hospital'}</h2>
							<form
								onSubmit={(e) => {
									e.preventDefault();
									const fd = new FormData(e.currentTarget as HTMLFormElement);
														const payload: Partial<Hospital> = {
															name: String(fd.get('name') || ''),
															location: String(fd.get('location') || ''),
															specialty: String(fd.get('specialty') || ''),
															rating: Number(fd.get('rating') || 0),
															imageUrl: String(fd.get('imageUrl') || ''),
															about: String(fd.get('about') || ''),
															services: (String(fd.get('services') || '')).split(',').map(s => s.trim()).filter(Boolean),
														};
									handleSave(payload);
								}}
								className="space-y-3"
							>
								<input name="name" defaultValue={editing?.name} required className="w-full px-3 py-2 border rounded" placeholder="Name" />
								<input name="location" defaultValue={editing?.location} required className="w-full px-3 py-2 border rounded" placeholder="Location" />
								<input name="specialty" defaultValue={editing?.specialty} className="w-full px-3 py-2 border rounded" placeholder="Specialty" />
								<input name="rating" defaultValue={editing?.rating} type="number" className="w-full px-3 py-2 border rounded" placeholder="Rating" />
								<input name="imageUrl" defaultValue={editing?.imageUrl} className="w-full px-3 py-2 border rounded" placeholder="Image URL" />
								<textarea name="about" defaultValue={editing?.about} className="w-full px-3 py-2 border rounded" placeholder="About" />
								<input name="services" defaultValue={editing?.services?.join(', ')} className="w-full px-3 py-2 border rounded" placeholder="Services (comma separated)" />

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

export default AdminHospitals;
