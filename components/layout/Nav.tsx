import { Navbar, Text, Group, UnstyledButton } from '@mantine/core';
import { Home, Icon, Logout } from 'grommet-icons';
import { AiFillMedicineBox, AiOutlineMedicineBox } from 'react-icons/ai';
import { FaStethoscope } from 'react-icons/fa';
import { BsPeople } from 'react-icons/bs';
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
      <Navbar.Section>
        <NavItem
          label='Appointments'
          icon={<FaStethoscope size={24} />}
          path={'/appointments'}
        />
      </Navbar.Section>
      <Navbar.Section mt={10}>
        <NavItem
          label='Medication'
          icon={<AiOutlineMedicineBox size={24} />}
          path={'/medication'}
        />
      </Navbar.Section>
      <Navbar.Section mt={10} grow>
        <NavItem
          label='Patients'
          icon={<BsPeople size={24} />}
          path={'/patients'}
        />
      </Navbar.Section>
      <Navbar.Section>
        <Group>
          <Logout />
          <Text>Logout</Text>
        </Group>
      </Navbar.Section>
    </Navbar>
  );
}

export default Nav;
