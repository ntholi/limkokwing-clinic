import {
  ActionIcon,
  Button,
  Group,
  LoadingOverlay,
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
import Drug from './drug';
import { saveDrug, updateDrug } from './drug-service';
import { showNotification } from '@mantine/notifications';

type Props = {
  drug?: Drug | null;
  setOpened: (opened: boolean) => void;
};
function Form({ drug, setOpened }: Props) {
  const [loading, setLoading] = useState(false);
  const form = useForm<Drug>({
    initialValues: {
      name: '',
      size: '',
      description: '',
    },
  });

  useEffect(() => {
    if (drug) {
      form.setValues(drug);
    }
  }, [drug]);

  async function handleSubmit(value: Drug) {
    setLoading(true);
    try {
      if (drug) {
        await updateDrug(drug.id, value);
      } else {
        await saveDrug(value);
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
        <TextInput label='Name' {...form.getInputProps('name')} required />
        <TextInput label='Size' {...form.getInputProps('size')} />
        <Textarea label='Description' {...form.getInputProps('description')} />
      </Stack>

      <Group position='right' mt='md'>
        <Button type='submit'>Save</Button>
      </Group>
    </form>
  );
}

export default Form;
