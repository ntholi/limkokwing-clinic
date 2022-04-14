import { Footer as MantineFooter, Anchor } from '@mantine/core';
import { FaGithub } from 'react-icons/fa';

function Footer() {
  return (
    <MantineFooter
      height={60}
      style={{ display: 'flex', alignItems: 'center' }}
      p='md'
    >
      <FaGithub />
      <Anchor
        ml={5}
        size='sm'
        href='https://github.com/ntholi/limkokwing-clinic'
        target='_blank'
      >
        @ntholi/limkokwing-clinic
      </Anchor>
    </MantineFooter>
  );
}

export default Footer;
