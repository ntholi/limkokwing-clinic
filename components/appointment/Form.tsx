import {
  ActionIcon,
  Button,
  Group,
  MultiSelect,
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
import { getDrugs } from '../drugs/drug-service';
import { useSession } from '../session/UserSession';
import { DatePicker, TimeInput } from '@mantine/dates';

type Props = {
  appointment?: Appointment | null;
  setOpened: (opened: boolean) => void;
};
function Form({ appointment, setOpened }: Props) {
  const { user } = useSession();
  const [patientNames, setPatientNames] = useState<string>('');
  const [medications, setMedications] = useState<string[]>([]);
  const [appointmentTime, setAppointmentTime] = useState<Date | undefined>();
  const form = useForm<Appointment>({
    initialValues: {
      id: '',
      date: serverTimestamp(),
      patient: '',
      diagnosis: '',
      medication: [],
      notes: '',
      attendedBy: user?.displayName,
      createdBy: user?.uid,
    },
  });

  useEffect(() => {
    getDrugs().then((drugs) => {
      const data: string[] = [];
      drugs.forEach((drug) => data.push(`${drug.name} (${drug.size})`));
      setMedications(data);
    });
  }, []);

  useEffect(() => {
    if (appointment) {
      form.setValues(appointment);
    }
  }, [appointment]);

  function lookupUpPatient() {
    getPatient(form.values['patient']).then((patient) => {
      if (patient) {
        setPatientNames(`${patient.firstName} ${patient.lastName}`);
      }
    });
  }

  async function handleSubmit(value: Appointment) {
    try {
      if (appointment) {
        await updateAppointment(appointment.id, value, appointmentTime);
      } else {
        await saveAppointment(value, appointmentTime);
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
        <TextInput label='Diagnosis' {...form.getInputProps('diagnosis')} />
        <MultiSelect
          data={medications}
          searchable
          label='Medication'
          disabled={medications.length === 0}
          {...form.getInputProps('medication')}
        />
        <Group position="apart" grow>
          <DatePicker
            label='Next Appointment'
            {...form.getInputProps('nextAppointment')}
          />
          <TimeInput
            label='What time?'
            value={appointmentTime}
            onChange={(date) => setAppointmentTime(date)}
          />
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
