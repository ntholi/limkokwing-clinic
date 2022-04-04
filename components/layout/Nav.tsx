import { Navbar, Text, Group, UnstyledButton } from '@mantine/core';
import { Home, Icon } from 'grommet-icons';
import { useRouter } from 'next/router';
import React from 'react';

type NavProps = {
  label: string;
  icon: any;
  path: string;
};

function NavItem({ label, icon, path }: NavProps) {
  const router = useRouter();
  return (
    <UnstyledButton onClick={() => router.push(path)}>
      <Group>
        {icon}
        <Text size='sm'>{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

function Nav() {
  return (
    <Navbar p='md' width={{ sm: 200, lg: 300 }}>
      <Navbar.Section grow>
        <NavItem label='Patients' icon={<Home />} path={'/patients'} />
      </Navbar.Section>
      <Navbar.Section>
        <Text size='sm'>Logout</Text>
      </Navbar.Section>
    </Navbar>
  );
}

export default Nav;
