import Drug from './drug';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { firestore } from '../firebase/config';

export const loadDrugs = (setDrugs: (drugs: Drug[]) => void) => {
  return onSnapshot(collection(firestore, 'drugs'), (snapshot) => {
    const drugs: Drug[] = [];
    snapshot.forEach((document) => {
      const drug = document.data();
      drug.id = document.id;
      if (drug.dateOfBirth && drug.dateOfBirth.toDate) {
        drug.dateOfBirth = drug.dateOfBirth.toDate();
      }
      drugs.push(drug as Drug);
    });
    setDrugs(drugs);
  });
};

export async function getDrugs() {
  const querySnapshot = await getDocs(query(collection(firestore, 'drugs')));
  const drugs: Drug[] = [];
  querySnapshot.forEach((doc) => {
    const drug = doc.data();
    drug.id = doc.id;
    drugs.push(drug as Drug);
  });
  return drugs;
}

export const saveDrug = async (drug: Drug) => {
  await addDoc(collection(firestore, 'drugs'), {
    ...format(drug),
    date: serverTimestamp(),
  });
};

export const updateDrug = async (id: string | undefined, drug: Drug) => {
  if (id) {
    await updateDoc(doc(firestore, 'drugs', id), {
      ...format(drug),
      id: undefined,
    });
  }
};

export const deleteDrug = async (drugId: string | null) => {
  if (drugId) {
    await deleteDoc(doc(firestore, 'drugs', drugId));
  }
};

/**
 * Removes all blank spaces in drug size field, and remove additional spaces in drug name
 * @param drug
 * @returns format drug
 */
function format(drug: Drug) {
  const { size, name } = drug;
  const formattedName = name.replace(/\s{2,}/g, ' ').trim();
  const formattedSize = size.replace(/\s/g, '').toLowerCase();
  return {
    ...drug,
    name: formattedName,
    size: formattedSize,
  };
}
