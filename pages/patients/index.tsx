import { ActionIcon, Button, Group, Input, Modal, Paper } from '@mantine/core';
import React, { useRef, useState } from 'react';
import { FaFileImport } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { MdClear } from 'react-icons/md';
import Layout from '../../components/layout/Layout';
import Form from '../../components/patients/Form';
import Patient from '../../components/patients/patient';
import PatientsTable from '../../components/patients/Table';
import readCSV from './import-helper';

function Index() {
  const [opened, setOpened] = useState(false);
  const [patient, setPatient] = useState<Patient | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [searchKey, setSearchKey] = useState('');

  function openForm() {
    setPatient(null);
    setOpened(true);
  }

  function handleSearch() {}

  function clearSearch() {
    setSearchKey('');
  }

  function handleImport() {
    const file = fileRef.current?.files?.item(0);
    if (file) {
      readCSV(file);
    }
  }

  return (
    <>
      <input
        type='file'
        accept='.csv'
        ref={fileRef}
        onChange={handleImport}
        style={{ display: 'none' }}
      />
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title='Patient Form'
      >
        <Form setOpened={setOpened} patient={patient} />
      </Modal>
      <Layout>
        <Paper shadow='sm' p='md' withBorder>
          <Group spacing='xs'>
            <ActionIcon
              variant='default'
              onClick={() => {
                fileRef.current?.click();
              }}
            >
              <FaFileImport />
            </ActionIcon>
            <Button variant='default' onClick={openForm}>
              New
            </Button>
            <Input
              placeholder='Search by ID'
              value={searchKey}
              onChange={(e: any) => setSearchKey(e.target.value)}
              rightSection={
                searchKey ? (
                  <ActionIcon onClick={clearSearch}>
                    <MdClear />
                  </ActionIcon>
                ) : (
                  <ActionIcon onClick={handleSearch}>
                    <FiSearch />
                  </ActionIcon>
                )
              }
            />
          </Group>
        </Paper>
        <PatientsTable
          setPatient={setPatient}
          setOpenForm={setOpened}
          searchKey={searchKey}
        />
      </Layout>
    </>
  );
}

export default Index;
