import { AppShell, Header, Image, Text, Group, Center } from '@mantine/core';
import Footer from '../components/layout/Footer';
import LoginForm from '../components/login/LoginForm';

function LoginPage() {
  return (
    <AppShell
      fixed
      padding={0}
      header={
        <Header height={70} p='md'>
          <Group>
            <Image src='/images/logo.png' width={120} height={50} alt='Logo' />
            <Text size='xl' weight='bold'>
              Clinic
            </Text>
          </Group>
        </Header>
      }
      footer={<Footer />}
    >
      <Center>
        <LoginForm />
      </Center>
    </AppShell>
  );
}

export default LoginPage;
