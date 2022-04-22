import Inventory, { InventoryRecord } from './inventory';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  runTransaction,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { firestore } from '../firebase/config';
import { getDrugs } from '../drugs/drug-service';
import { drugFromString } from '../drugs/drug';

export async function getInventory(id: string) {
  return (await getDoc(doc(firestore, 'inventory', id))).data() as Inventory;
}

export const loadInventories = (
  setInventories: (inventories: Inventory[]) => void
) => {
  return onSnapshot(collection(firestore, 'inventory'), (snapshot) => {
    const inventories: Inventory[] = [];
    snapshot.forEach((document) => {
      const inventory = document.data();
      inventory.drugId = document.id;
      if (inventory.dateOfBirth && inventory.dateOfBirth.toDate) {
        inventory.dateOfBirth = inventory.dateOfBirth.toDate();
      }
      inventories.push(inventory as Inventory);
    });
    setInventories(inventories);
  });
};

export async function getRecords(drugId: string) {
  const querySnapshot = await getDocs(
    query(collection(firestore, 'inventory', drugId, 'records'))
  );
  const records: InventoryRecord[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    data.id = doc.id;
    records.push(data as InventoryRecord);
  });
  return records;
}

export const saveInventory = async (
  drugId: string | undefined,
  inventory: Inventory
) => {
  if (!drugId) {
    return;
  }
  await runTransaction(firestore, async (transaction) => {
    let quantity = inventory.quantity;
    const drug = await transaction.get(doc(firestore, 'inventory', drugId));
    if (drug.exists()) {
      quantity = drug.data().quantity + inventory.quantity;
    }
    await transaction.set(doc(firestore, 'inventory', drugId), {
      drugName: inventory.drugName,
      quantity,
    });
  });
  addDoc(collection(firestore, 'inventory', drugId, 'records'), {
    quantity: inventory.quantity,
    date: serverTimestamp(),
  });
};

export const deductDrugs = async (drugs: string[]) => {
  const all = await getDrugs();
  const selectedDrugs = drugs.map((drug) => drugFromString(drug));
  const drugIds = all
    .filter((drug) => selectedDrugs.some((d) => d.name === drug.name))
    .map((drug) => drug.id);

  for (const drug of drugIds) {
    if (!drug) continue;
    await runTransaction(firestore, async (transaction) => {
      const drugDoc = await transaction.get(doc(firestore, 'inventory', drug));
      if (drugDoc.exists()) {
        const quantity = drugDoc.data().quantity - 1;
        await transaction.update(doc(firestore, 'inventory', drug), {
          quantity,
        });
      }
    });
  }
};

export const updateInventory = async (
  id: string | undefined,
  inventory: Inventory
) => {
  console.log('Updating, ', id, inventory);
  if (id) {
    await updateDoc(doc(firestore, 'inventory', id), {
      ...inventory,
    });
  }
};

export const deleteInventory = async (inventoryId: string | null) => {
  if (inventoryId) {
    await deleteDoc(doc(firestore, 'inventory', inventoryId));
  }
};
