import React, { useState } from 'react';
import Navbar from '../Components/Navbar';

type Note = { id: string; type: 'info' | 'success' | 'reminder'; title: string; body: string; read?: boolean };

const initial: Note[] = [
  { id: 'n1', type: 'success', title: 'Appointment Confirmed', body: 'Your appointment with Dr. Emily Carter has been confirmed.', read: false },
  { id: 'n2', type: 'reminder', title: 'Appointment Reminder', body: 'Reminder: You have an appointment tomorrow at 10:00 AM.', read: false },
  { id: 'n3', type: 'info', title: 'Email Sent', body: 'A confirmation email has been sent to you.', read: true },
];

const Notifications: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>(initial);

  const markAll = () => setNotes((s) => s.map(n => ({ ...n, read: true })));
  const clearAll = () => setNotes([]);

  return (
    <>
      <Navbar />
      <main className="bg-white max-w-7xl mx-auto p-6 min-h-screen">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Notifications</h1>
          <div className="flex gap-2">
            <button onClick={markAll} className="px-3 py-2 rounded bg-blue-100 text-blue-600">Mark all as read</button>
            <button onClick={clearAll} className="px-3 py-2 rounded bg-red-100 text-red-600">Clear</button>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {notes.length === 0 && <div className="text-gray-500">No notifications</div>}
          {notes.map(n => (
            <div key={n.id} className={`p-4 rounded-lg border ${n.read ? 'bg-gray-50' : 'bg-white shadow'}`}>
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {n.type === 'success' && <span className="text-green-500">✔️</span>}
                  {n.type === 'reminder' && <span className="text-yellow-500">⏰</span>}
                  {n.type === 'info' && <span className="text-blue-500">ℹ️</span>}
                </div>
                <div>
                  <div className="font-semibold">{n.title}</div>
                  <div className="text-sm text-gray-600">{n.body}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Notifications;
