import { Button, Center, Table } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import TableCaption from '../utils/TableCaption';
import Patient from './patient';
import { loadPatients } from './patient-service';
import Row from './Row';

type Props = {
  setPatient: (patient: Patient | null) => void;
  setOpenForm: (opened: boolean) => void;
  searchKey: string;
};

function PatientsTable({ setPatient, setOpenForm, searchKey }: Props) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [lastId, setLastId] = useState<string | null>('');
  const [loading, setLoading] = useState(true);

  function populateTable() {
    loadPatients(searchKey, lastId).then((item) => {
      const { items, lastId } = item;
      setLastId(lastId);
      if (searchKey) {
        setPatients(items);
      } else {
        setPatients([...patients, ...items]);
      }
      setLoading(false);
    });
  }

  useEffect(() => {
    populateTable();
  }, [searchKey]);

  return (
    <>
      <Table verticalSpacing='sm' fontSize='md'>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Phone Number</th>
            <th>Occupation</th>
            <th>Age</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <TableCaption loading={loading} />
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
      <Center my='md'>
        <Button onClick={populateTable} disabled={lastId == null}>
          Load More
        </Button>
      </Center>
    </>
  );
}

export default PatientsTable;
