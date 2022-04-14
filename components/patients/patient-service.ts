import Patient from './patient';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  runTransaction,
  setDoc,
  where,
} from 'firebase/firestore';
import { firestore } from '../firebase/config';

export async function getPatient(id: string): Promise<Patient> {
  return (await getDoc(doc(firestore, 'patients', id))).data() as Patient;
}

export const loadPatients = (
  searchKey: string,
  setPatients: (patients: Patient[]) => void
) => {
  const keyword = searchKey.trim().toUpperCase();
  console.log(`search keyword: '${keyword}'`);
  const q = searchKey
    ? query(collection(firestore, 'patients'), where('id', '==', keyword))
    : collection(firestore, 'patients');
  return onSnapshot(q, (snapshot) => {
    const patients: Patient[] = [];
    snapshot.forEach((document) => {
      const patient = document.data();
      patient.id = document.id;
      if (patient.dateOfBirth && patient.dateOfBirth.toDate) {
        patient.dateOfBirth = patient.dateOfBirth.toDate();
      }
      patients.push(patient as Patient);
    });
    setPatients(patients);
  });
};

export const savePatient = async (patient: Patient) => {
  if (patient.id) {
    await setDoc(doc(firestore, 'patients', patient.id), {
      ...patient,
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
