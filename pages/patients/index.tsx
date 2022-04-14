import { ActionIcon, Button, Group, Modal, Paper } from '@mantine/core';
import React, { useRef, useState } from 'react';
import { FaFileImport } from 'react-icons/fa';
import Layout from '../../components/layout/Layout';
import Form from '../../components/patients/Form';
import Patient from '../../components/patients/patient';
import PatientsTable from '../../components/patients/Table';
import readCSV from './import-helper';

function Index() {
  const [opened, setOpened] = useState(false);
  const [patient, setPatient] = useState<Patient | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function openForm() {
    setPatient(null);
    setOpened(true);
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
          </Group>
        </Paper>
        <PatientsTable setPatient={setPatient} setOpenForm={setOpened} />
      </Layout>
    </>
  );
}

export default Index;
