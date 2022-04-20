import { Button, Modal, Paper } from '@mantine/core';
import React, { useState } from 'react';
import Inventory from '../../components/inventory/inventory';
import Form from '../../components/inventory/Form';
import InventoriesTable from '../../components/inventory/Table';
import Layout from '../../components/layout/Layout';

function InventoryIndex() {
  const [opened, setOpened] = useState(false);
  const [inventory, setInventory] = useState<Inventory | null>(null);

  function openForm() {
    setInventory(null);
    setOpened(true);
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title='Inventory Form'
      >
        <Form setOpened={setOpened} inventory={inventory} />
      </Modal>
      <Layout>
        <Paper shadow='sm' p='md' withBorder>
          <Button variant='default' onClick={openForm}>
            New
          </Button>
        </Paper>
        <InventoriesTable setInventory={setInventory} setOpenForm={setOpened} />
      </Layout>
    </>
  );
}

export default InventoryIndex;
