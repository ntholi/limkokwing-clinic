import Appointment from './appointment';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
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

export async function getAppointments(patientId: string) {
  const q = query(
    collection(firestore, 'appointments'),
    where('patient', '==', patientId)
  );

  const querySnapshot = await getDocs(q);
  const appointments: Appointment[] = [];
  querySnapshot.forEach((doc) => {
    const appointment = doc.data();
    appointment.id = doc.id;
    if (appointment.dateOfBirth && appointment.dateOfBirth.toDate) {
      appointment.dateOfBirth = appointment.dateOfBirth.toDate();
    }
    appointments.push(appointment as Appointment);
  });
  return appointments;
}

export const saveAppointment = async (appointment: Appointment) => {
  await addDoc(collection(firestore, 'appointments'), {
    ...appointment,
    date: serverTimestamp(),
  });
};

export const updateAppointment = async (
  id: string,
  appointment: Appointment
) => {
  await updateDoc(doc(firestore, 'appointments', id), { ...appointment });
};

export const deleteAppointment = async (appointmentId: string | null) => {
  if (appointmentId) {
    await deleteDoc(doc(firestore, 'appointments', appointmentId));
  }
};
