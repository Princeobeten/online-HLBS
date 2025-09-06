import type { Hospital, Appointment,  Doctor } from '../types/type';

export const mockAppointments: Appointment[] = [
    { id: 'A123', hospitalName: 'City General Hospital', doctorName: 'Dr. Emily Carter', patientName: 'John Doe', date: '2025-09-15', time: '10:00 AM', status: 'Upcoming' },
    { id: 'B456', hospitalName: 'Sunrise Health Clinic', doctorName: 'Dr. Ben Adams', patientName: 'Jane Smith', date: '2025-09-18', time: '02:30 PM', status: 'Upcoming' },
    { id: 'C789', hospitalName: 'City General Hospital', doctorName: 'Dr. Emily Carter', patientName: 'Peter Jones', date: '2025-08-22', time: '11:00 AM', status: 'Completed' },
    { id: 'D101', hospitalName: 'Mountain Peak Medical', doctorName: 'Dr. Chloe Davis', patientName: 'Mary Williams', date: '2025-07-10', time: '09:00 AM', status: 'Cancelled' },
];

export const mockDoctors: Doctor[] = [
    { id: 101, name: 'Dr. Emily Carter', specialty: 'Cardiology', imageUrl: 'https://placehold.co/100x100/cde2d0/333333?text=EC', hospitalId: 1 },
    { id: 102, name: 'Dr. John Matthews', specialty: 'General Surgery', imageUrl: 'https://placehold.co/100x100/cde2d0/333333?text=JM', hospitalId: 1 },
    { id: 201, name: 'Dr. Ben Adams', specialty: 'Pediatrics', imageUrl: 'https://placehold.co/100x100/d1e3f3/333333?text=BA', hospitalId: 2 },
    { id: 202, name: 'Dr. Sarah Chen', specialty: 'Family Medicine', imageUrl: 'https://placehold.co/100x100/d1e3f3/333333?text=SC', hospitalId: 2 },
    { id: 301, name: 'Dr. Chloe Davis', specialty: 'Orthopedics', imageUrl: 'https://placehold.co/100x100/e2f0d9/333333?text=CD', hospitalId: 3 },
    { id: 302, name: 'Dr. Chloe Davis', specialty: 'Orthopedics', imageUrl: 'https://placehold.co/100x100/e2f0d9/333333?text=CD', hospitalId: 3 },
];

export const mockHospitals: Hospital[] = [
  {
    id: 1,
    name: 'City General Hospital',
    location: 'Metropolis',
    specialty: 'Cardiology',
    rating: 4.8,
    lat: 6.5244,
    lng: 3.3792,
    imageUrl: 'https://placehold.co/600x400/5a9bd5/FFFFFF?text=City+General',
    about:
      'City General Hospital has been a pillar of the Metropolis community for over 50 years. We are dedicated to providing state-of-the-art medical care with a compassionate touch.',
    services: ['Cardiac Surgery', 'Emergency Care', 'MRI Scans', 'Pediatrics', 'X-Ray', 'Pharmacy'],
    doctors: mockDoctors.filter((d) => d.hospitalId === 1),
  },
  {
    id: 2,
    name: 'Sunrise Health Clinic',
    location: 'Oceanview',
    specialty: 'Pediatrics',
    rating: 4.9,
    lat: 6.6000,
    lng: 3.3500,
    imageUrl: 'https://placehold.co/600x400/5a9bd5/FFFFFF?text=Sunrise+Health',
    about:
      'Sunrise Health Clinic offers comprehensive pediatric and family care in a warm, welcoming environment. We focus on preventative care and wellness.',
    services: ['Vaccinations', 'Annual Check-ups', 'Urgent Care', 'Allergy Testing', 'Nutrition Counseling'],
    doctors: mockDoctors.filter((d) => d.hospitalId === 2),
  },
  {
    id: 3,
    name: 'Mountain Peak Medical',
    location: 'Silverstone',
    specialty: 'Orthopedics',
    rating: 4.7,
    lat: 6.4500,
    lng: 3.4200,
    imageUrl: 'https://placehold.co/600x400/70ad47/FFFFFF?text=Mountain+Peak',
    about:
      'Specializing in sports medicine and orthopedic surgery, Mountain Peak Medical helps athletes and individuals of all ages recover from injuries and improve their physical performance.',
    services: ['Knee Replacement', 'ACL Surgery', 'Physical Therapy', 'Sports Medicine', 'Spinal Surgery'],
    doctors: mockDoctors.filter((d) => d.hospitalId === 3),
  },
];
