import { Group, Loader, Table } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import TableCaption from '../utils/TableCaption';
import Inventory from './inventory';
import { loadInventories } from './inventory-service';
import Row from './Row';

type Props = {
  setInventory: (inventory: Inventory | null) => void;
  setOpenForm: (opened: boolean) => void;
};

function InventoriesTable({ setInventory, setOpenForm }: Props) {
  const [inventories, setInventories] = useState<Inventory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return loadInventories((item) => {
      setInventories(item);
      setLoading(false);
    });
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
          <TableCaption loading={loading} />
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
