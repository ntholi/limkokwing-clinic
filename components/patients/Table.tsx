import { Table } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import Patient from './patient';
import { loadPatients } from './patient-service';
import Row from './Row';

function PatientsTable() {
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
            <Row key={item.id} item={item} />
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default PatientsTable;
