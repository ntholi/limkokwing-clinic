import { ActionIcon, Button, Group, Modal, Paper, Text } from '@mantine/core';
import { useModals } from '@mantine/modals';
import React, { useState } from 'react';
import Appointment from '../../appointment/appointment';

type Props = {
  item: Appointment;
  setAppointment?: (appointment: Appointment | null) => void;
  setOpenForm?: (opened: boolean) => void;
};

function Row({ item }: Props) {
  return (
    <>
      <tr>
        <td>{asString(item.date)}</td>
        <td>{item.diagnosis}</td>
        <td>{item.attendedBy}</td>
        <td>{item.medication}</td>
        <td>{item.notes}</td>
      </tr>
    </>
  );
}

//Converts firebase's serverTimestamp to a string
function asString(date: any) {
  return date.toDate().toLocaleDateString();
}

export default Row;
