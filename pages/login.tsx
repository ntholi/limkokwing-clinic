import {
  AppShell,
  Header,
  Footer,
  Image,
  Anchor,
  Text,
  Group,
  Center,
} from '@mantine/core';
import { Github } from 'grommet-icons';
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
      footer={
        <Footer
          height={60}
          style={{ display: 'flex', alignItems: 'center' }}
          p='md'
        >
          <Github />
          <Anchor
            ml={5}
            size='sm'
            href='https://github.com/ntholi/clinic'
            target='_blank'
          >
            @ntholi/clinic
          </Anchor>
        </Footer>
      }
    >
      <Center>
        <LoginForm />
      </Center>
    </AppShell>
  );
}

export default LoginPage;
