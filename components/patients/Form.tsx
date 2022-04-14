import {
  Button,
  Group,
  Select,
  Stack,
  TextInput,
  Chips,
  Chip,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import React, { useEffect } from 'react';
import Patient from './patient';
import { savePatient, updatePatient } from './patient-service';

type Props = {
  patient?: Patient | null;
  setOpened: (opened: boolean) => void;
};
function Form({ patient, setOpened }: Props) {
  const form = useForm<Patient>({
    initialValues: {
      id: '',
      firstName: '',
      lastName: '',
      occupation: 'Student',
    },
  });

  useEffect(() => {
    if (patient) {
      form.setValues(patient);
    }
  }, [patient]);

  async function handleSubmit(value: Patient) {
    try {
      if (patient) {
        await updatePatient(patient.id, value);
      } else {
        await savePatient(value);
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
        <TextInput
          required
          label='ID'
          placeholder='Emp/Std Number'
          {...form.getInputProps('id')}
        />
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
        <DatePicker
          label='Date of Birth'
          placeholder='Pick a date'
          {...form.getInputProps('dateOfBirth')}
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
