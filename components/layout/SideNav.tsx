import { Navbar, Text, Group, UnstyledButton } from '@mantine/core';
import { Home } from 'grommet-icons';
import { useRouter } from 'next/router';
import React from 'react';

function SideNav() {
  const router = useRouter();
  return (
    <Navbar p='md' width={{ sm: 200, lg: 300 }}>
      <Navbar.Section grow>
        <UnstyledButton onClick={() => router.push('/admin/houses')}>
          <Group>
            <Home color='#fff' />
            <Text size='sm'>Houses</Text>
          </Group>
        </UnstyledButton>
      </Navbar.Section>
      <Navbar.Section>
        <Text size='sm'>Logout</Text>
      </Navbar.Section>
    </Navbar>
  );
}

export default SideNav;
