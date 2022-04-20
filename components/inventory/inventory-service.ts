import Inventory from './inventory';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  runTransaction,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { firestore } from '../firebase/config';

export const loadInventories = (
  setInventories: (inventories: Inventory[]) => void
) => {
  return onSnapshot(collection(firestore, 'inventory'), (snapshot) => {
    const inventories: Inventory[] = [];
    snapshot.forEach((document) => {
      const inventory = document.data();
      inventory.id = document.id;
      if (inventory.dateOfBirth && inventory.dateOfBirth.toDate) {
        inventory.dateOfBirth = inventory.dateOfBirth.toDate();
      }
      inventories.push(inventory as Inventory);
    });
    setInventories(inventories);
  });
};

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

export const updateInventory = async (
  id: string | undefined,
  inventory: Inventory
) => {
  if (id) {
    await updateDoc(doc(firestore, 'inventory', id), {
      ...inventory,
      id: undefined,
    });
  }
};

export const deleteInventory = async (inventoryId: string | null) => {
  if (inventoryId) {
    await deleteDoc(doc(firestore, 'inventory', inventoryId));
  }
};
