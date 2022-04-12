import { ActionIcon, Button, Group, Modal, Paper, Text } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { FormEdit, FormTrash } from 'grommet-icons';
import React, { useState } from 'react';
import { getConfirmDeleteProps } from '../utils/modal-helper';
import Appointment from './appointment';
import { deleteAppointment } from './appointment-service';

type Props = {
  item: Appointment;
  setAppointment: (appointment: Appointment | null) => void;
  setOpenForm: (opened: boolean) => void;
};

function Row({ item, setAppointment, setOpenForm }: Props) {
  const modals = useModals();

  function handleEdit() {
    setAppointment(item);
    setOpenForm(true);
  }

  function handleDelete() {
    deleteAppointment(item.id);
  }
  return (
    <>
      <tr>
        <td>{item.patient}</td>
        <td>{item.date}</td>
        <td>{item.diagnosis}</td>
        <td>{item.attendedBy}</td>
        <td>{item.medication}</td>
        <td>{item.notes}</td>
        <td>
          <Group>
            <ActionIcon onClick={handleEdit}>
              <FormEdit />
            </ActionIcon>
            <ActionIcon
              onClick={() =>
                modals.openConfirmModal(
                  getConfirmDeleteProps(item.patient, handleDelete)
                )
              }
            >
              <FormTrash color='red' />
            </ActionIcon>
          </Group>
        </td>
      </tr>
    </>
  );
}

function calculateAge(dateOfBirth: Date | undefined) {
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
