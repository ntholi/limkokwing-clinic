import { Center, Pagination, Table } from '@mantine/core';
import React, { useEffect, useState } from 'react';
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
  const [activePage, setPage] = useState(1);
  const [lastId, setLastId] = useState<string | null>(null);

  useEffect(() => {
    loadPatients(searchKey, lastId).then((item) => {
      const { patients, lastId } = item;
      setPatients(patients);
      setLastId(lastId);
    });
  }, [activePage]);

  return (
    <>
      <Table verticalSpacing='sm' fontSize='md'>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
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
      <Center mt='lg'>
        <Pagination page={activePage} onChange={setPage} total={10} />
      </Center>
    </>
  );
}

export default PatientsTable;
