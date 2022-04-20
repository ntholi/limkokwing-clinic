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
import Layout from '../../components/layout/Layout';
import Patient from '../../components/patients/patient';
import { getPatient } from '../../components/patients/patient-service';
import PatientRecordsTable from '../../components/patients/profile/Table';

function PatientProfile() {
  const router = useRouter();
  const { id } = router.query;
  const [patient, setPatient] = React.useState<Patient>();

  useEffect(() => {
    getPatient(id as string).then(setPatient);
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
          {patient?.firstName} {patient?.lastName}
        </Title>
        <Paper shadow='xl' radius='xs' p='xl' mt='xl' withBorder>
          <Group position='apart'>
            <SimpleGrid sx={{ width: '40%' }} cols={2}>
              <Text weight='bold'>ID</Text> <Text>{patient?.id}</Text>
              <Text weight='bold'>First Name</Text>{' '}
              <Text>{patient?.firstName}</Text>
              <Text weight='bold'>Last Name</Text>{' '}
              <Text>{patient?.lastName}</Text>
            </SimpleGrid>

            <SimpleGrid sx={{ width: '40%' }} cols={2}>
              <Text weight='bold'>Gender</Text> <Text>{patient?.gender}</Text>
              <Text weight='bold'>Date of Birth</Text>
              <Text>{asString(patient?.dateOfBirth)}</Text>
              <Text weight='bold'>Occupation</Text>{' '}
              <Text>{patient?.occupation}</Text>
            </SimpleGrid>
          </Group>
        </Paper>
        <Title order={3} mt='xl' mb='md' ml='sm' sx={{ fontWeight: 'normal' }}>
          Patient Records
        </Title>
        <PatientRecordsTable patientId={id as string} />
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
