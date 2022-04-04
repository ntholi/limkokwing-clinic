import { Button, Modal, Paper } from '@mantine/core';
import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import Form from '../../components/patients/Form';
import PatientsTable from '../../components/patients/Table';

function Index() {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title='Patient Form'
      >
        <Form setOpened={setOpened} />
      </Modal>
      <Layout>
        <Paper shadow='sm' p='md' withBorder>
          <Button variant='default' onClick={() => setOpened(true)}>
            New
          </Button>
        </Paper>
        <PatientsTable />
      </Layout>
    </>
  );
}

export default Index;
