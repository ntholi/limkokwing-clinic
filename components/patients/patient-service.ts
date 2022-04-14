import Patient from './patient';
import {
  collection,
  deleteDoc,
  doc,
  endAt,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  setDoc,
  startAfter,
  startAt,
  where,
} from 'firebase/firestore';
import { firestore } from '../firebase/config';

export async function getPatient(id: string): Promise<Patient> {
  return (await getDoc(doc(firestore, 'patients', id))).data() as Patient;
}

export const loadPatients = async (
  searchKey: string,
  lastId: string | null
) => {
  const keyword = searchKey.trim().toUpperCase();

  console.log('previousDoc', lastId);

  const q = searchKey
    ? query(collection(firestore, 'patients'), where('id', '==', keyword))
    : query(
        collection(firestore, 'patients'),
        orderBy('id'),
        startAfter(lastId),
        limit(5)
      );

  const patients: Patient[] = [];
  const snapshot = await getDocs(q);
  snapshot.forEach((doc) => {
    const item = doc.data();
    item.id = doc.id;
    if (item.dateOfBirth && item.dateOfBirth.toDate) {
      item.dateOfBirth = item.dateOfBirth.toDate();
    }
    patients.push(item as Patient);
  });

  return {
    patients,
    lastId: patients.length > 0 ? patients[patients.length - 1].id : null,
  };
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
