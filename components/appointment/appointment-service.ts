import Appointment from './appointment';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { firestore } from '../firebase/config';

export const loadAppointments = (
  setAppointments: (appointments: Appointment[]) => void
) => {
  return onSnapshot(collection(firestore, 'appointments'), (snapshot) => {
    const appointments: Appointment[] = [];
    snapshot.forEach((document) => {
      const appointment = document.data();
      appointment.id = document.id;
      if (appointment.dateOfBirth && appointment.dateOfBirth.toDate) {
        appointment.dateOfBirth = appointment.dateOfBirth.toDate();
      }
      appointments.push(appointment as Appointment);
    });
    setAppointments(appointments);
  });
};

export const saveAppointment = async (appointment: Appointment) => {
  if (appointment.id) {
    await addDoc(collection(firestore, 'appointments', appointment.id), {
      date: serverTimestamp(),
      patient: appointment.patient,
      diagnosis: appointment.diagnosis,
      medication: appointment.medication,
      notes: appointment.notes,
      attendedBy: appointment.attendedBy,
    });
  }
};

export const updateAppointment = async (
  id: string,
  appointment: Appointment
) => {
  updateDoc(doc(firestore, 'appointments', id), {
    date: appointment.date,
    patient: appointment.patient,
    diagnosis: appointment.diagnosis,
    medication: appointment.medication,
    notes: appointment.notes,
    attendedBy: appointment.attendedBy,
  });
};

export const deleteAppointment = async (appointmentId: string | null) => {
  if (appointmentId) {
    await deleteDoc(doc(firestore, 'appointments', appointmentId));
  }
};
