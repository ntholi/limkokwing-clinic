import {
  ActionIcon,
  Anchor,
  Button,
  Group,
  Modal,
  Paper,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { useModals } from '@mantine/modals';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { getConfirmDeleteProps } from '../utils/modal-helper';
import Patient from './patient';
import { deletePatient } from './patient-service';

type Props = {
  item: Patient;
  setPatient: (patient: Patient | null) => void;
  setOpenForm: (opened: boolean) => void;
};

function Row({ item, setPatient, setOpenForm }: Props) {
  const modals = useModals();
  const router = useRouter();

  function handleEdit() {
    setPatient(item);
    setOpenForm(true);
  }

  function handleDelete() {
    deletePatient(item.id);
  }

  function gotoProfile() {
    router.push(`/patients/${item.id}`);
  }

  return (
    <>
      <tr>
        <td>
          <UnstyledButton onClick={gotoProfile}>
            <Text variant='link'>{item.id}</Text>
          </UnstyledButton>
        </td>
        <td>{item.firstName}</td>
        <td>{item.lastName}</td>
        <td>{item.gender}</td>
        <td>{item.occupation}</td>
        <td>{calculateAge(item.dateOfBirth)}</td>
        <td>
          <Group>
            <ActionIcon onClick={handleEdit}>
              <MdEdit color='#90A4AE' />
            </ActionIcon>
            <ActionIcon
              onClick={() =>
                modals.openConfirmModal(
                  getConfirmDeleteProps(item.firstName, handleDelete)
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

function calculateAge(dateOfBirth: Date | undefined | null) {
  if (!dateOfBirth) {
    return 'N/A';
  }
  const now = new Date();
  const age = now.getFullYear() - dateOfBirth.getFullYear();
  const month = now.getMonth() - dateOfBirth.getMonth();
  if (month < 0 || (month === 0 && now.getDate() < dateOfBirth.getDate())) {
    return age - 1;
  }
  return age;
}

export default Row;
