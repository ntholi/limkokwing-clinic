import { AppShell, Header, Image, Text, Group } from '@mantine/core';
import { useRouter } from 'next/router';
import { FaUserAlt } from 'react-icons/fa';
import { useSession } from '../session/UserSession';
import Footer from './Footer';
import Nav from './Nav';

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  const router = useRouter();
  const { user, loading: loadingAuthUser } = useSession();

  if (!loadingAuthUser && !user) {
    router.push('/login');
  }

  return (
    <AppShell
      fixed
      padding={0}
      header={
        <Header height={70} p='md'>
          <Group position='apart'>
            <Group>
              <Image
                src='/images/logo.png'
                width={120}
                height={50}
                alt='Logo'
              />
              <Text size='xl' weight='bold'>
                Clinic
              </Text>
            </Group>
            <Group>
              <Text size='sm'>{getLastName(user?.displayName)}</Text>
              <FaUserAlt />
            </Group>
          </Group>
        </Header>
      }
      navbar={<Nav />}
      footer={<Footer />}
    >
      {loadingAuthUser ? <Text>Loading...</Text> : children}
    </AppShell>
  );
}

function getLastName(displayName: string | null | undefined) {
  if (!displayName) {
    return '';
  }
  return displayName.split(' ').slice(-1).join(' ');
}
export default Layout;
