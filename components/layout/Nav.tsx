import { Navbar, Text, Group, UnstyledButton } from '@mantine/core';
import { AiFillShop, AiOutlineMedicineBox } from 'react-icons/ai';
import { ImExit } from 'react-icons/im';
import { FaStethoscope } from 'react-icons/fa';
import { BsPeople } from 'react-icons/bs';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { logout } from '../login/login-service';

const paths = ['appointments', 'inventory', 'drugs', 'patients'];

function Nav() {
  const router = useRouter();
  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };
  const [index, setIndex] = React.useState(0);
  const [active, inactive] = ['#FAFAFA', '#757575'];

  function handleClick(index: number) {
    router.push(`/${paths[index]}`);
  }

  useEffect(() => {
    const path = router.pathname.split('/')[1];
    const index = paths.indexOf(path);
    setIndex(index);
  }, [router.pathname]);

  return (
    <Navbar p='md' width={{ sm: 200, lg: 300 }}>
      <Navbar.Section>
        <UnstyledButton onClick={() => handleClick(0)}>
          <Group>
            <FaStethoscope size={24} color={index == 0 ? active : inactive} />
            <Text size='sm' color={index == 0 ? active : inactive}>
              Appointments
            </Text>
          </Group>
        </UnstyledButton>
      </Navbar.Section>
      <Navbar.Section mt={10}>
        <UnstyledButton onClick={() => handleClick(1)}>
          <Group>
            <AiFillShop size={24} color={index == 1 ? active : inactive} />
            <Text size='sm' color={index == 1 ? active : inactive}>
              Inventory
            </Text>
          </Group>
        </UnstyledButton>
      </Navbar.Section>
      <Navbar.Section mt={10}>
        <UnstyledButton onClick={() => handleClick(2)}>
          <Group>
            <AiOutlineMedicineBox
              size={24}
              color={index == 2 ? active : inactive}
            />
            <Text size='sm' color={index == 2 ? active : inactive}>
              Drugs
            </Text>
          </Group>
        </UnstyledButton>
      </Navbar.Section>
      <Navbar.Section mt={10} grow>
        <UnstyledButton onClick={() => handleClick(3)}>
          <Group>
            <BsPeople size={24} color={index == 3 ? active : inactive} />
            <Text size='sm' color={index == 3 ? active : inactive}>
              Patients
            </Text>
          </Group>
        </UnstyledButton>
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
