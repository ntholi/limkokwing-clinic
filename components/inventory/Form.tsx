import {
  Button,
  Group,
  NumberInput,
  Select,
  Stack,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useEffect, useState } from 'react';
import Drug, { drugAsString, drugFromString } from '../drugs/drug';
import { getDrugs } from '../drugs/drug-service';
import Inventory from './inventory';
import { saveInventory, updateInventory } from './inventory-service';

type Props = {
  inventory?: Inventory | null;
  setOpened: (opened: boolean) => void;
};
function Form({ inventory, setOpened }: Props) {
  const [drugs, setDrugs] = useState<Drug[]>([]);

  function getDrug(name: string) {
    const drug = drugFromString(name);
    return drugs.find((d) => d.name === drug.name && d.size === drug.size);
  }

  const form = useForm<Inventory>({
    initialValues: {
      drugName: '',
      quantity: 0,
    },
  });

  useEffect(() => {
    getDrugs().then(setDrugs);
  }, []);

  useEffect(() => {
    if (inventory) {
      form.setValues(inventory);
    }
  }, [inventory]);

  async function handleSubmit(value: Inventory) {
    try {
      if (inventory) {
        await updateInventory(inventory.drugId, value);
      } else {
        await saveInventory(getDrug(value.drugName)?.id, value);
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
        <Select
          label='Drug'
          searchable
          {...form.getInputProps('drugName')}
          required
          data={drugs.map(drugAsString)}
        />
        <NumberInput label='Quantity' {...form.getInputProps('quantity')} />
      </Stack>

      <Group position='right' mt='md'>
        <Button type='submit'>Save</Button>
      </Group>
    </form>
  );
}

export default Form;
