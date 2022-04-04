import Patient from './patient';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  runTransaction,
  setDoc,
} from 'firebase/firestore';
import { firestore } from '../firebase/config';

export const loadPatients = (setPatients: (patients: Patient[]) => void) => {
  return onSnapshot(collection(firestore, 'patients'), (snapshot) => {
    const patients: Patient[] = [];
    snapshot.forEach((document) => {
      patients.push(document.data() as Patient);
    });
    setPatients(patients);
  });
};

export const savePatient = async (patient: Patient) => {
  if (patient.id) {
    await setDoc(doc(firestore, 'patients', patient.id), {
      firstName: patient.firstName,
      lastName: patient.lastName,
      dateOfBirth: patient.dateOfBirth,
      occupation: patient.occupation,
    });
  }
};

export const updatePatient = async (id: string, patient: Patient) => {
  await runTransaction(firestore, async (transaction) => {
    transaction.delete(doc(firestore, `patients/${id}`));
    transaction.set(doc(firestore, `patients/${patient.id}`), patient);
  });
};

export const deletePatient = async (patientId: string | null) => {
  if (patientId) {
    await deleteDoc(doc(firestore, 'patients', patientId));
  }
};
