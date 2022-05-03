import React from 'react';
import { ActionIcon } from '@mantine/core';
import { InventoryRecord } from '../../inventory/inventory';
import { toDateTime } from '../../utils/date-format';
import { useModals } from '@mantine/modals';
import { getConfirmDeleteProps } from '../../utils/modal-helper';
import { MdDelete } from 'react-icons/md';
import { deleteInventoryRecord } from '../inventory-service';
import { useRouter } from 'next/router';

type Props = {
  item: InventoryRecord;
};

function Row({ item }: Props) {
  const modals = useModals();
  const router = useRouter();

  const handleDelete = async () => {
    const parts = router.asPath.split('/');
    const drugId = parts[parts.length - 1];
    await deleteInventoryRecord(drugId, item.id);
  };

  return (
    <>
      <tr>
        <td>{toDateTime(item.date)}</td>
        <td>{item.quantity}</td>
        <td>
          <ActionIcon
            onClick={() =>
              modals.openConfirmModal(
                getConfirmDeleteProps('entry', handleDelete)
              )
            }
          >
            <MdDelete color='#E57373' />
          </ActionIcon>
        </td>
      </tr>
    </>
  );
}

export default Row;
