import React from 'react'
import { Link } from 'react-router-dom';

const AdminLogin: React.FC = () => {

	return (
		<main className="flex items-center justify-center min-h-screen bg-gray-50">
			<div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg text-center">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">Admin Login</h1>
					<p className="mt-2 text-sm text-gray-600">Sign in with your administrator account.</p>
				</div>

				<form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
					<input
						type="email"
						placeholder="Admin email"
						required
						className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>

					<input
						type="password"
						placeholder="Password"
						required
						className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>

					<button type="submit" className="w-full py-3 font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
						Sign in
					</button>
				</form>

				<div className="flex flex-col gap-2">
					<Link to="/login" className="block w-full py-3 font-semibold text-blue-600 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors">
						User Login
					</Link>
					
				</div>
			</div>
		</main>
	);
};

export default AdminLogin;
