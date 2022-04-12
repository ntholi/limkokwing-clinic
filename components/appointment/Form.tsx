import { Button, Group, Modal, Select, Stack, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { serverTimestamp } from 'firebase/firestore';
import React, { useEffect } from 'react';
import Appointment from './appointment';
import { saveAppointment, updateAppointment } from './appointment-service';

type Props = {
  appointment?: Appointment | null;
  setOpened: (opened: boolean) => void;
};
function Form({ appointment, setOpened }: Props) {
  const form = useForm<Appointment>({
    initialValues: {
      id: '',
      date: serverTimestamp(),
      patient: '',
      diagnosis: '',
      medication: '',
      notes: '',
      attendedBy: '',
    },
  });

  useEffect(() => {
    if (appointment) {
      form.setValues(appointment);
    }
  }, [appointment]);

  async function handleSubmit(value: Appointment) {
    console.log('Handle submit -> ', appointment);
    try {
      if (appointment) {
        await updateAppointment(appointment.id, value);
      } else {
        await saveAppointment(value);
      }
      form.reset();
      setOpened(false);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <DatePicker
          label='Date'
          placeholder='Leave Blank'
          {...form.getInputProps('date')}
        />
        <TextInput
          required
          label='Patient'
          placeholder='Student No./Emp No.'
          {...form.getInputProps('patient')}
        />
        <TextInput
          required
          label='Diagnosis'
          {...form.getInputProps('diagnosis')}
        />
        <TextInput
          required
          label='Attended By'
          {...form.getInputProps('attendedBy')}
        />
        <TextInput
          required
          label='Medication'
          {...form.getInputProps('medication')}
        />
        <TextInput required label='Notes' {...form.getInputProps('notes')} />
      </Stack>

      <Group position='right' mt='md'>
        <Button type='submit'>Submit</Button>
      </Group>
    </form>
  );
}

export default Form;
