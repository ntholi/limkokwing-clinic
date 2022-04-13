import React, { useEffect, useState } from 'react';
import Appointment from '../../appointment/appointment';
import { getAppointments } from '../../appointment/appointment-service';
import Row from './Row';
import { Table } from '@mantine/core';

type Props = {
  patientId: string;
};

function PatientRecordsTable({ patientId }: Props) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  useEffect(() => {
    getAppointments(patientId).then(setAppointments);
  }, [patientId]);

  return (
    <>
      <Table verticalSpacing='sm' fontSize='md'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Diagnosis</th>
            <th>Attended By</th>
            <th>Medication</th>
            <th>Notes</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((item) => (
            <Row key={item.id} item={item} />
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default PatientRecordsTable;
