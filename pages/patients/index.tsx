import { Button, Modal, Paper } from '@mantine/core';
import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import Form from '../../components/patients/Form';
import Patient from '../../components/patients/patient';
import PatientsTable from '../../components/patients/Table';

function Index() {
  const [opened, setOpened] = useState(false);
  const [patient, setPatient] = useState<Patient | null>(null);

  function openForm() {
    setPatient(null);
    setOpened(true);
  }
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title='Patient Form'
      >
        <Form setOpened={setOpened} patient={patient} />
      </Modal>
      <Layout>
        <Paper shadow='sm' p='md' withBorder>
          <Button variant='default' onClick={openForm}>
            New
          </Button>
        </Paper>
        <PatientsTable setPatient={setPatient} setOpenForm={setOpened} />
      </Layout>
    </>
  );
}

export default Index;
