import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import UserContextProvider from '../components/session/UserSession';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Limkokwing Clinic</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'dark',
        }}
      >
        <ModalsProvider>
          <UserContextProvider>
            <Component {...pageProps} />
          </UserContextProvider>
        </ModalsProvider>
      </MantineProvider>
    </>
  );
}
