import { ActionIcon, Group } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { MdDelete, MdEdit } from 'react-icons/md';
import React from 'react';
import { getConfirmDeleteProps } from '../utils/modal-helper';
import Drug from './drug';
import { deleteDrug } from './drug-service';

type Props = {
  item: Drug;
  setDrug?: (drug: Drug | null) => void;
  setOpenForm?: (opened: boolean) => void;
};

function Row({ item, setDrug, setOpenForm }: Props) {
  const modals = useModals();

  function handleEdit() {
    if (setDrug && setOpenForm) {
      setDrug(item);
      setOpenForm(true);
    }
  }

  function handleDelete() {
    if (item.id) {
      deleteDrug(item.id);
    }
  }

  return (
    <>
      <tr>
        <td>{item.name}</td>
        <td>{item.size}</td>
        <td>{item.description}</td>
        <td>
          <Group>
            <ActionIcon onClick={handleEdit}>
              <MdEdit color='#90A4AE' />
            </ActionIcon>
            <ActionIcon
              onClick={() =>
                modals.openConfirmModal(
                  getConfirmDeleteProps(item.name, handleDelete)
                )
              }
            >
              <MdDelete color='#E57373' />
            </ActionIcon>
          </Group>
        </td>
      </tr>
    </>
  );
}

export default Row;
