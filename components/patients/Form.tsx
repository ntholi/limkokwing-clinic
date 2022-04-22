import {
  Button,
  Group,
  Select,
  Stack,
  TextInput,
  Chips,
  Chip,
  LoadingOverlay,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import React, { useEffect, useState } from 'react';
import Patient from './patient';
import { savePatient, updatePatient } from './patient-service';

type Props = {
  patient?: Patient | null;
  setOpened: (opened: boolean) => void;
};
function Form({ patient, setOpened }: Props) {
  const [loading, setLoading] = useState(false);
  const form = useForm<Patient>({
    initialValues: {
      id: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      occupation: 'Student',
    },
  });

  useEffect(() => {
    if (patient) {
      form.setValues(patient);
    }
  }, [patient]);

  async function handleSubmit(value: Patient) {
    setLoading(true);
    try {
      if (patient) {
        await updatePatient(patient.id, value);
      } else {
        await savePatient(value);
      }
      form.reset();
      setOpened(false);
    } catch (e: any) {
      console.error(e);
      showNotification({
        title: 'Error',
        message: e.message,
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <LoadingOverlay visible={loading} />
      <Stack>
        <TextInput
          required
          label='ID'
          placeholder='Emp/Std Number'
          {...form.getInputProps('id')}
        />
        <Group>
          <TextInput
            required
            label='First Name'
            placeholder='Names'
            {...form.getInputProps('firstName')}
          />
          <TextInput
            required
            label='Last Name'
            placeholder='Surname'
            {...form.getInputProps('lastName')}
          />
        </Group>
        <DatePicker
          label='Date of Birth'
          placeholder='Pick a date'
          {...form.getInputProps('dateOfBirth')}
        />
        <TextInput
          required
          label='Phone Number'
          {...form.getInputProps('phoneNumber')}
        />
        <Select
          required
          label='Occupation'
          data={['Student', 'Staff Member', 'Other']}
          {...form.getInputProps('occupation')}
        />

        <Chips {...form.getInputProps('gender')}>
          <Chip value='Male'>Male</Chip>
          <Chip value='Female'>Female</Chip>
        </Chips>
      </Stack>

      <Group position='right' mt='md'>
        <Button type='submit'>Save</Button>
      </Group>
    </form>
  );
}

export default Form;
