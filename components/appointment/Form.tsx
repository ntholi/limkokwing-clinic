import {
  ActionIcon,
  Button,
  Group,
  LoadingOverlay,
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
import { showNotification } from '@mantine/notifications';

type Props = {
  appointment?: Appointment | null;
  setOpened: (opened: boolean) => void;
};

function Form({ appointment, setOpened }: Props) {
  const { user } = useSession();
  const [medications, setMedications] = useState<string[]>([]);
  const [nextAppointment, setAppointmentTime] = useState<Date | undefined>();
  const [loading, setLoading] = useState(false);
  const form = useForm<Appointment>({
    initialValues: {
      id: '',
      date: serverTimestamp(),
      patient: '',
      diagnosis: '',
      medication: [],
      notes: '',
      patientName: '',
      attendedBy: user?.displayName,
      createdBy: user?.uid,
    },

    validate: {
      patientName: (value) =>
        value.length < 1 ? 'Please lookup patient by id first' : null,
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
      const date = appointment.nextAppointment?.toDate();
      setAppointmentTime(date);
    }
  }, [appointment]);

  function lookupUpPatient() {
    getPatient(form.values['patient']).then((patient) => {
      if (patient) {
        form.setFieldValue(
          'patientName',
          `${patient.firstName} ${patient.lastName}`
        );
      }
    });
  }

  async function handleSubmit(value: Appointment) {
    setLoading(true);
    try {
      if (appointment) {
        await updateAppointment(appointment.id, value, nextAppointment);
      } else {
        await saveAppointment(value, nextAppointment);
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
            label=' '
            required
            disabled
            placeholder='Patient Names'
            {...form.getInputProps('patientName')}
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
        <Group position='apart' grow>
          <DatePicker
            label='Next Appointment'
            {...form.getInputProps('nextAppointment')}
            value={nextAppointment}
          />
          <TimeInput
            label='What time?'
            value={nextAppointment}
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
