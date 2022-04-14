import { useForm } from '@mantine/form';
import {
  PasswordInput,
  Group,
  Button,
  Box,
  TextInput,
  Title,
} from '@mantine/core';
import { MdAlternateEmail } from 'react-icons/md';
import { useState } from 'react';
import { signIn, updateDisplayName } from './login-service';
import { useRouter } from 'next/router';

function LoginForm() {
  const [displayName, setDisplayName] = useState('');
  const [hasName, setHasName] = useState(true);
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
  });

  async function login() {
    const user = await signIn(form.values.email, form.values.password);
    if (user && user.displayName) {
      setHasName(true);
      router.push('/');
    } else {
      setHasName(false);
    }
  }

  async function updateName() {
    await updateDisplayName(displayName);
    router.push('/');
  }

  console.log('Has name', hasName);

  return (
    <Box sx={{ width: 350 }} mx='auto' mt={100}>
      <Title mb='xl'>Login</Title>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          label='Email'
          placeholder='Email'
          type='email'
          disabled={!hasName}
          icon={<MdAlternateEmail />}
          {...form.getInputProps('email')}
        />
        <PasswordInput
          label='Password'
          placeholder='Password'
          disabled={!hasName}
          {...form.getInputProps('password')}
          mt='md'
        />
        {!hasName && (
          <TextInput
            label='Names'
            placeholder='Full Names'
            description='Please provide your full names'
            mt='md'
            onChange={(e) => setDisplayName(e.target.value)}
          />
        )}

        <Group position='right' mt='md'>
          {!!hasName ? (
            <Button type='submit' onClick={login}>
              Login
            </Button>
          ) : (
            <Button type='submit' onClick={updateName}>
              Save
            </Button>
          )}
        </Group>
      </form>
    </Box>
  );
}

export default LoginForm;
