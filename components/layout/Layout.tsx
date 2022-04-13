import { AppShell, Header, Image, Text, Group } from '@mantine/core';
import Footer from './Footer';
import Nav from './Nav';

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
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
      navbar={<Nav />}
      footer={<Footer />}
    >
      {children}
    </AppShell>
  );
}

export default Layout;
