import { Center } from '@mantine/core';
import type { NextPage } from 'next';
import Layout from '../components/layout/Layout';

const Home: NextPage = () => {
  return (
    <Layout>
      <Center>
        <h4>Hello World</h4>
      </Center>
    </Layout>
  );
};

export default Home;
