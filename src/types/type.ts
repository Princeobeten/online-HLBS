// Defines the structure for a single hospital
export interface Hospital {
  id: number;
  name: string;
  location: string;
  specialty: string;
  rating: number;
  lat?: number;
  lng?: number;
  imageUrl: string;
  about: string;
  services: string[];
  doctors: Doctor[];
}

// Defines the structure for a single doctor
export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  imageUrl: string;
  hospitalId: number;
}

// Defines the structure for a user's appointment
export interface Appointment {
  id: string;
  hospitalName: string;
  doctorName: string;
  patientName: string;
  date: string;
  time: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
}

