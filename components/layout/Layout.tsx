import {
  AppShell,
  Header,
  Footer,
  Image,
  Anchor,
  Text,
  Group,
} from '@mantine/core';
import { Github } from 'grommet-icons';
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
      {children}
    </AppShell>
  );
}

export default Layout;
