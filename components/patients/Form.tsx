import { Button, Group, Modal, Select, Stack, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import React from 'react';
import Patient from './patient';
import { savePatient } from './patient-service';

type Props = {
  patient?: Patient;
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

  function handleSubmit(value: Patient) {
    try {
      savePatient(value);
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
      </Stack>

      <Group position='right' mt='md'>
        <Button type='submit'>Submit</Button>
      </Group>
    </form>
  );
}

export default Form;
