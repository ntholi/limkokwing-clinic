import { AppShell, Header, Footer, Text, Anchor } from '@mantine/core';
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
          <div
            style={{ display: 'flex', alignItems: 'center', height: '100%' }}
          >
            <h3>Hello Logo</h3>
          </div>
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
            size='xs'
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
