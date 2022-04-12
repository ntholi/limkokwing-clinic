import { Table } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import Patient from './patient';
import { loadPatients } from './patient-service';
import Row from './Row';

type Props = {
  setPatient: (patient: Patient | null) => void;
  setOpenForm: (opened: boolean) => void;
};

function PatientsTable({ setPatient, setOpenForm }: Props) {
  const [patients, setPatients] = useState<Patient[]>([]);
  useEffect(() => {
    console.log('Loading patients...');
    return loadPatients(setPatients);
  }, []);

  return (
    <>
      <Table verticalSpacing='sm' fontSize='md'>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Occupation</th>
            <th>Age</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {patients.map((item) => (
            <Row
              key={item.id}
              item={item}
              setPatient={setPatient}
              setOpenForm={setOpenForm}
            />
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default PatientsTable;
