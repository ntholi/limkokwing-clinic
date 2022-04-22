import { Group, Loader, Table } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import TableCaption from '../utils/TableCaption';
import Appointment from './appointment';
import { loadAppointments } from './appointment-service';
import Row from './Row';

type Props = {
  setAppointment: (appointment: Appointment | null) => void;
  setOpenForm: (opened: boolean) => void;
};

function AppointmentsTable({ setAppointment, setOpenForm }: Props) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return loadAppointments((items) => {
      setAppointments(items);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Table verticalSpacing='sm' fontSize='md'>
        <thead>
          <tr>
            <th>Patient</th>
            <th>Date</th>
            <th>Diagnosis</th>
            <th>Attended By</th>
            <th>Medication</th>
            <th>Notes</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <TableCaption loading={loading} />
          {appointments.map((item) => (
            <Row
              key={item.id}
              item={item}
              setAppointment={setAppointment}
              setOpenForm={setOpenForm}
            />
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default AppointmentsTable;
