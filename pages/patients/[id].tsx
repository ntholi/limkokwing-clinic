import { Box, Button, Paper, SimpleGrid, Text, Title } from '@mantine/core';
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
          <SimpleGrid sx={{ width: '40%' }} cols={2}>
            <Text>ID</Text> <Text>{patient?.id}</Text>
            <Text>First Name</Text> <Text>{patient?.firstName}</Text>
            <Text>Last Name</Text> <Text>{patient?.lastName}</Text>
            <Text>Occupation</Text> <Text>{patient?.occupation}</Text>
          </SimpleGrid>
        </Paper>
        <Title order={3} mt={50} mb='md' ml='sm' sx={{ fontWeight: 'normal' }}>
          Patient Records
        </Title>
        <PatientRecordsTable patientId={id as string} />
      </Box>
    </Layout>
  );
}

export default PatientProfile;
