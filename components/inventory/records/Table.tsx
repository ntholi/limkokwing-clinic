import React, { useEffect, useState } from 'react';
import { InventoryRecord } from '../../inventory/inventory';
import { getRecords } from '../../inventory/inventory-service';
import Row from './Row';
import { Table } from '@mantine/core';

type Props = {
  drugId: string;
};

function InventoryRecordsTable({ drugId }: Props) {
  const [records, setRecords] = useState<InventoryRecord[]>([]);
  useEffect(() => {
    getRecords(drugId).then(setRecords);
  }, [drugId]);

  return (
    <>
      <Table verticalSpacing='sm' fontSize='md'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Quantity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {records.map((item) => (
            <Row key={item.id} item={item} />
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default InventoryRecordsTable;
