import { Table } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import Inventory from './inventory';
import { loadInventories } from './inventory-service';
import Row from './Row';

type Props = {
  setInventory: (inventory: Inventory | null) => void;
  setOpenForm: (opened: boolean) => void;
};

function InventoriesTable({ setInventory, setOpenForm }: Props) {
  const [inventories, setInventories] = useState<Inventory[]>([]);
  useEffect(() => {
    return loadInventories(setInventories);
  }, []);

  return (
    <>
      <Table verticalSpacing='sm' fontSize='md'>
        <thead>
          <tr>
            <th>Drug</th>
            <th>Quantity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {inventories.map((item) => (
            <Row
              key={item.drugId}
              item={item}
              setInventory={setInventory}
              setOpenForm={setOpenForm}
            />
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default InventoriesTable;
