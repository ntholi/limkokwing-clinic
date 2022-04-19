import { Navbar, Text, Group, UnstyledButton } from '@mantine/core';
import { AiFillShop, AiOutlineMedicineBox } from 'react-icons/ai';
import { ImExit } from 'react-icons/im';
import { FaStethoscope } from 'react-icons/fa';
import { BsPeople } from 'react-icons/bs';
import { useRouter } from 'next/router';
import React from 'react';
import { logout } from '../login/login-service';

type NavProps = {
  label: string;
  icon: any;
  path: string;
};

function Nav() {
  const router = useRouter();
  function NavItem({ label, icon, path }: NavProps) {
    return (
      <UnstyledButton onClick={() => router.push(path)}>
        <Group>
          {icon}
          <Text size='sm'>{label}</Text>
        </Group>
      </UnstyledButton>
    );
  }

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };
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
          label='Inventory'
          icon={<AiFillShop size={24} />}
          path={'/drugs'}
        />
      </Navbar.Section>
      <Navbar.Section mt={10}>
        <NavItem
          label='Drugs'
          icon={<AiOutlineMedicineBox size={24} />}
          path={'/drugs'}
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
        <UnstyledButton onClick={handleLogout}>
          <Group>
            <ImExit />
            <Text>Logout</Text>
          </Group>
        </UnstyledButton>
      </Navbar.Section>
    </Navbar>
  );
}

export default Nav;
