import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import HospitalProfile from "./Pages/HospitalProfile";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Appointments from "./Pages/Appointments";
import { RequireAuth, RequireAdmin } from './context/ProtectedRoutes';
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminHospitals from "./Pages/Admin/AdminHospitals";
import  AdminDoctors  from "./Pages/Admin/AdminDoctors";
import AdminAppointments from "./Pages/Admin/AdminAppointments";
import AdminLogin from "./Pages/AdminLogin";
import AppointmentBookingPage from "./Pages/AppointmentBookingPage";
import Map from "./Pages/Map"


const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/hospitals/:id" element={<HospitalProfile />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/appointments" element={<RequireAuth children={<Appointments />} />} />
				<Route path="/book" element={<RequireAuth children={<AppointmentBookingPage />} />} />
				<Route path="/map" element={<Map />} />
				{/* Admin routes */}
				<Route path="/admin/login" element={<AdminLogin />} />
				<Route path="/admin" element={<RequireAdmin children={<AdminDashboard />} />} />
				<Route path="/admin/hospitals" element={<RequireAdmin children={<AdminHospitals />} />} />
				<Route path="/admin/doctors" element={<RequireAdmin children={<AdminDoctors />} />} />
				<Route path="/admin/appointments" element={<RequireAdmin children={<AdminAppointments />} />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;