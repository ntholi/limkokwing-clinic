import { Button, Center, Pagination, Table } from '@mantine/core';
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
  const [lastId, setLastId] = useState<string | null>('');

  function populateTable() {
    console.log('sent lastId: ', lastId);
    loadPatients(searchKey, lastId).then((item) => {
      const { items, lastId } = item;
      console.log('received lastId', lastId);
      setLastId(lastId);
      setPatients([...patients, ...items]);
    });
  }

  // const handleScroll = (e: any) => {
  //   const scrollHeight = e.target.documentElement.scrollHeight;
  //   const currentHeight = Math.ceil(
  //     e.target.documentElement.scrollTop + window.innerHeight
  //   );
  //   if (currentHeight + 1 >= scrollHeight) {
  //     populateTable();
  //   }
  // };

  useEffect(() => {
    populateTable();
    // window.addEventListener('scroll', handleScroll);
  }, []);

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
      <Center my='md'>
        <Button onClick={populateTable} disabled={lastId == null}>
          Load More
        </Button>
      </Center>
    </>
  );
}

export default PatientsTable;
