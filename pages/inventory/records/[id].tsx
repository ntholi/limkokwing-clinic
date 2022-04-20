import {
  Box,
  Button,
  Paper,
  SimpleGrid,
  Text,
  Title,
  Group,
  Divider,
} from '@mantine/core';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { FaStepBackward } from 'react-icons/fa';
import Inventory from '../../../components/inventory/inventory';
import { getInventory } from '../../../components/inventory/inventory-service';
import InventoryRecordsTable from '../../../components/inventory/records/Table';
import Layout from '../../../components/layout/Layout';

function PatientProfile() {
  const router = useRouter();
  const { id } = router.query;
  const [inventory, setInventory] = React.useState<Inventory | undefined>();

  useEffect(() => {
    getInventory(id as string).then(setInventory);
  }, [id]);

  return (
    <Layout>
      <Box p='sm'>
        <Button
          size='sm'
          variant='default'
          onClick={() => router.back()}
          leftIcon={<FaStepBackward size={14} />}
        >
          Back
        </Button>
        <Title order={1} mt='xl' sx={{ fontWeight: 'normal' }}>
          {inventory?.drugName}
        </Title>
        <Paper shadow='xl' radius='xs' p='xl' mt='xl' withBorder>
          <Group position='apart'>
            <SimpleGrid sx={{ width: '40%' }} cols={2}>
              <Text weight='bold'>Drug</Text> <Text>{inventory?.drugName}</Text>
              <Text weight='bold'>Total Quantity</Text>
              <Text>{inventory?.quantity}</Text>
            </SimpleGrid>
          </Group>
        </Paper>
        <InventoryRecordsTable drugId={id as string} />
      </Box>
    </Layout>
  );
}

function asString(timestamp: any) {
  if (!timestamp) {
    return '';
  }
  const date = timestamp.toDate();
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

export default PatientProfile;
