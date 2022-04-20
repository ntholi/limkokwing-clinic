import React from 'react';
import Inventory, { InventoryRecord } from '../../inventory/inventory';
import { toDate, toDateTime } from '../../utils/date-format';

type Props = {
  item: InventoryRecord;
};

function Row({ item }: Props) {
  return (
    <>
      <tr>
        <td>{toDateTime(item.date)}</td>
        <td>{item.quantity}</td>
      </tr>
    </>
  );
}

export default Row;
