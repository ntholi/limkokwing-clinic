import { ActionIcon, Button, Group, Modal, Text } from '@mantine/core';
import { FormEdit, FormTrash } from 'grommet-icons';
import React, { useState } from 'react';
import Patient from './patient';
import { deletePatient } from './patient-service';

type Props = {
  item: Patient;
  setPatient: (patient: Patient | null) => void;
  setOpenForm: (opened: boolean) => void;
};

function Row({ item, setPatient, setOpenForm }: Props) {
  const [opened, setOpened] = useState(false);
  function handleEdit() {
    setPatient(item);
    setOpenForm(true);
  }

  function handleDelete() {
    deletePatient(item.id);
    setOpened(false);
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title='Confirm Delete'
      >
        <Text>
          Do you want to delete {item.firstName} {item.lastName}?
        </Text>
        <Group position='right' mt={30}>
          <Button color='red' onClick={handleDelete}>
            Delete
          </Button>
          <Button onClick={() => setOpened(false)}>Cancel</Button>
        </Group>
      </Modal>
      <tr>
        <td>{item.id}</td>
        <td>{item.firstName}</td>
        <td>{item.firstName}</td>
        <td>{item.occupation}</td>
        <td>{calculateAge(item.dateOfBirth)}</td>
        <td>
          <Group>
            <ActionIcon onClick={handleEdit}>
              <FormEdit />
            </ActionIcon>
            <ActionIcon onClick={() => setOpened(true)}>
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
