import React, { createContext, useContext, useState } from 'react';
import type { Appointment } from '../types/type';
import { mockAppointments } from '../data/mockData';

type BookingContextType = {
  appointments: Appointment[];
  book: (payload: Partial<Appointment>) => Appointment;
  cancelAppointment: (id: string) => void;
  rescheduleAppointment: (id: string, date: string, time: string) => void;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>(() => mockAppointments.slice());

  const book = (payload: Partial<Appointment>) => {
    const newA: Appointment = {
      id: `M${Date.now()}`,
      hospitalName: String(payload.hospitalName || 'Unknown'),
      doctorName: String(payload.doctorName || 'Unknown'),
      patientName: String(payload.patientName || 'You'),
      date: String(payload.date || new Date().toISOString().slice(0, 10)),
      time: String(payload.time || '09:00 AM'),
      status: (payload.status as any) || 'Upcoming',
    };
    setAppointments((s) => [newA, ...s]);
    return newA;
  };

  const cancelAppointment = (id: string) => {
    setAppointments((s) => s.map((a) => (a.id === id ? { ...a, status: 'Cancelled' } : a)));
  };

  const rescheduleAppointment = (id: string, date: string, time: string) => {
    setAppointments((s) => s.map((a) => (a.id === id ? { ...a, date, time, status: 'Upcoming' } : a)));
  };

  return (
    <BookingContext.Provider value={{ appointments, book, cancelAppointment, rescheduleAppointment }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
};

export default useBooking;
