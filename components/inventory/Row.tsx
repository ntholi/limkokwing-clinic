import {
  ActionIcon,
  Button,
  Group,
  Modal,
  Paper,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { useModals } from '@mantine/modals';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { getConfirmDeleteProps } from '../utils/modal-helper';
import Inventory from './inventory';
import { deleteInventory } from './inventory-service';

type Props = {
  item: Inventory;
  setInventory?: (inventory: Inventory | null) => void;
  setOpenForm?: (opened: boolean) => void;
};

function Row({ item, setInventory, setOpenForm }: Props) {
  const modals = useModals();
  const router = useRouter();

  function handleEdit() {
    if (setInventory && setOpenForm) {
      setInventory(item);
      setOpenForm(true);
    }
  }

  function gotoRecords() {
    router.push(`/inventory/records/${item.drugId}`);
  }

  return (
    <>
      <tr>
        <td>
          <UnstyledButton onClick={gotoRecords}>
            <Text variant='link'>{item.drugName}</Text>
          </UnstyledButton>
        </td>
        <td>{item.quantity}</td>
        <td>
          <Group>
            <ActionIcon onClick={handleEdit}>
              <MdEdit color='#90A4AE' />
            </ActionIcon>
          </Group>
        </td>
      </tr>
    </>
  );
}

export default Row;
