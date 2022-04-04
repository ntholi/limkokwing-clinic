import { AppShell, Header, Footer, Text } from '@mantine/core';
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
        <Footer height={60} p='md'>
          <Text size='xs'>@TheLeast 2022</Text>
        </Footer>
      }
    >
      {children}
    </AppShell>
  );
}

export default Layout;
