import { Center } from '@mantine/core';
import type { NextPage } from 'next';
import Layout from '../components/layout/Layout';
import { useSession } from '../components/session/UserSession';

const Home: NextPage = () => {
  const { user } = useSession();
  return (
    <Layout>
      <Center>
        <h4>Welcome, {user?.displayName}</h4>
      </Center>
    </Layout>
  );
};

export default Home;
