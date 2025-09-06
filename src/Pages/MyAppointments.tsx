
import  { useState } from 'react';
import Navbar from '../Components/Navbar';
import { useBooking } from '../context/useBooking';

const MyAppointments = () => {
  const { appointments, cancelAppointment, rescheduleAppointment } = useBooking();
  const [rescheduling, setRescheduling] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState<string | null>(null);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  return (
    <>
      <Navbar />
      <main className="bg-white max-w-7xl mx-auto p-6 min-h-screen">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Appointments</h1>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {appointments.map(a => (
            <div key={a.id} className="bg-white rounded-xl shadow p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{a.doctorName} · <span className="text-sm text-gray-500">{a.patientName}</span></div>
                    <div className="text-sm text-gray-600">{a.hospitalName} • {a.date} @ {a.time}</div>
                  </div>
                  <div>
                    <span className="px-3 py-1 rounded-full bg-gray-100 text-sm">{a.status}</span>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-500">Specialty: {a.doctorName}</p>
              </div>

              <div className="mt-4 flex gap-2">
                <button onClick={() => { setRescheduling(a.id); setNewDate(a.date); setNewTime(a.time); }} className="px-3 py-2 rounded bg-blue-100 text-blue-600">Reschedule</button>
                <button onClick={() => setCancelling(a.id)} className="px-3 py-2 rounded bg-red-100 text-red-600">Cancel</button>
              </div>
            </div>
          ))}
        </div>

        {/* Reschedule Modal */}
        {rescheduling && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-lg font-semibold">Reschedule Appointment</h2>
              <div className="mt-4 space-y-3">
                <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} className="w-full px-3 py-2 border rounded" />
                <input type="time" value={newTime} onChange={(e) => setNewTime(e.target.value)} className="w-full px-3 py-2 border rounded" />
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button onClick={() => setRescheduling(null)} className="px-4 py-2 border rounded">Cancel</button>
                <button onClick={() => { rescheduleAppointment(rescheduling, newDate, newTime); setRescheduling(null); }} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
              </div>
            </div>
          </div>
        )}

        {/* Cancel Confirmation Modal */}
        {cancelling && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg p-6 w-full max-w-sm">
              <h3 className="text-lg font-semibold">Cancel Appointment</h3>
              <p className="mt-2 text-sm text-gray-600">Are you sure you want to cancel this appointment?</p>
              <div className="mt-4 flex justify-end gap-2">
                <button onClick={() => setCancelling(null)} className="px-4 py-2 border rounded">No</button>
                <button onClick={() => { cancelAppointment(cancelling); setCancelling(null); }} className="px-4 py-2 bg-red-600 text-white rounded">Yes, cancel</button>
              </div>
            </div>
          </div>
        )}

      </main>
    </>
  );
}

export default MyAppointments;