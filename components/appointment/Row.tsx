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
import Appointment from './appointment';
import { deleteAppointment } from './appointment-service';

type Props = {
  item: Appointment;
  setAppointment?: (appointment: Appointment | null) => void;
  setOpenForm?: (opened: boolean) => void;
};

function Row({ item, setAppointment, setOpenForm }: Props) {
  const modals = useModals();
  const router = useRouter();

  function handleEdit() {
    if (setAppointment && setOpenForm) {
      setAppointment(item);
      setOpenForm(true);
    }
  }

  function handleDelete() {
    deleteAppointment(item.id);
  }

  function gotoProfile() {
    router.push(`/patients/${item.patient}`);
  }

  return (
    <>
      <tr>
        <td>
          <UnstyledButton onClick={gotoProfile}>
            <Text variant='link'>{item.patient}</Text>
          </UnstyledButton>
        </td>
        <td>{asString(item.date)}</td>
        <td>{item.diagnosis}</td>
        <td>{item.attendedBy}</td>
        <td>{formatDrug(item.medication)}</td>
        <td>{item.notes}</td>
        <td>
          <Group>
            <ActionIcon onClick={handleEdit}>
              <MdEdit color='#90A4AE' />
            </ActionIcon>
            <ActionIcon
              onClick={() =>
                modals.openConfirmModal(
                  getConfirmDeleteProps(item.patient, handleDelete)
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

//Converts firebase's serverTimestamp to a string
export function asString(date: any) {
  if (!date) {
    return '';
  }
  return date.toDate().toLocaleDateString();
}

export function formatDrug(drugs: string[]) {
  if (!drugs) {
    return '';
  }
  return drugs.map((drug) => drug.split('(')[0].trim()).join(', ');
}

export default Row;
