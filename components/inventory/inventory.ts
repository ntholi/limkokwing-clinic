export default interface Inventory {
  drugId?: string;
  drugName: string;
  quantity: number;
}

export interface InventoryRecord {
  id: string;
  quantity: number;
  date: any;
}
