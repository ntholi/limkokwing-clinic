import {
  ActionIcon,
  Button,
  Group,
  Modal,
  Select,
  Stack,
  Textarea,
  TextInput,
} from '@mantine/core';
import { FiSearch } from 'react-icons/fi';
import { useForm } from '@mantine/form';
import { serverTimestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { getPatient } from '../patients/patient-service';
import Appointment from './appointment';
import { saveAppointment, updateAppointment } from './appointment-service';

type Props = {
  appointment?: Appointment | null;
  setOpened: (opened: boolean) => void;
};
function Form({ appointment, setOpened }: Props) {
  const [patientNames, setPatientNames] = useState<string>('');
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

  function lookupUpPatient() {
    getPatient(form.values['patient']).then((patient) => {
      setPatientNames(`${patient.firstName} ${patient.lastName}`);
    });
  }

  async function handleSubmit(value: Appointment) {
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
        <Group>
          <TextInput
            sx={{ width: '46%' }}
            label='Patient'
            placeholder='Student No./Emp No.'
            {...form.getInputProps('patient')}
            rightSection={
              <ActionIcon onClick={lookupUpPatient}>
                <FiSearch />
              </ActionIcon>
            }
          />
          <TextInput
            required
            label=' '
            placeholder='Patient Names'
            value={patientNames}
            disabled
          />
        </Group>
        {/* <DatePicker
          label='Date'
          placeholder='Leave Blank'
          {...form.getInputProps('date')}
        /> */}
        <Group>
          <TextInput label='Diagnosis' {...form.getInputProps('diagnosis')} />
          <TextInput label='Medication' {...form.getInputProps('medication')} />
        </Group>
        <TextInput label='Attended By' {...form.getInputProps('attendedBy')} />
        <Textarea label='Notes' {...form.getInputProps('notes')} />
      </Stack>

      <Group position='right' mt='md'>
        <Button type='submit'>Save</Button>
      </Group>
    </form>
  );
}

export default Form;
