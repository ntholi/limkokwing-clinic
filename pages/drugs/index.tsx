import { Button, Modal, Paper } from '@mantine/core';
import React, { useState } from 'react';
import Drug from '../../components/drugs/drug';
import Form from '../../components/drugs/Form';
import DrugsTable from '../../components/drugs/Table';
import Layout from '../../components/layout/Layout';

function DrugIndex() {
  const [opened, setOpened] = useState(false);
  const [drug, setDrug] = useState<Drug | null>(null);

  function openForm() {
    setDrug(null);
    setOpened(true);
  }

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} title='Drug Form'>
        <Form setOpened={setOpened} drug={drug} />
      </Modal>
      <Layout>
        <Paper shadow='sm' p='md' withBorder>
          <Button variant='default' onClick={openForm}>
            New
          </Button>
        </Paper>
        <DrugsTable setDrug={setDrug} setOpenForm={setOpened} />
      </Layout>
    </>
  );
}

export default DrugIndex;
