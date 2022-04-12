import { Button, Modal, Paper } from '@mantine/core';
import React, { useState } from 'react';
import Appointment from '../../components/appointment/appointment';
import Form from '../../components/appointment/Form';
import AppointmentsTable from '../../components/appointment/Table';
import Layout from '../../components/layout/Layout';

function AppointmentIndex() {
  const [opened, setOpened] = useState(false);
  const [appointment, setAppointment] = useState<Appointment | null>(null);

  function openForm() {
    setAppointment(null);
    setOpened(true);
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title='Appointment Form'
      >
        <Form setOpened={setOpened} appointment={appointment} />
      </Modal>
      <Layout>
        <Paper shadow='sm' p='md' withBorder>
          <Button variant='default' onClick={openForm}>
            New
          </Button>
        </Paper>
        <AppointmentsTable
          setAppointment={setAppointment}
          setOpenForm={setOpened}
        />
      </Layout>
    </>
  );
}

export default AppointmentIndex;
