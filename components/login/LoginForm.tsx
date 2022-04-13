import { useForm } from '@mantine/form';
import {
  PasswordInput,
  Group,
  Button,
  Box,
  Input,
  TextInput,
  Title,
} from '@mantine/core';

function LoginForm() {
  const form = useForm({
    initialValues: {
      email: '',
      password: 'secret',
    },
  });

  return (
    <Box sx={{ width: 350 }} mx='auto' mt={100}>
      <Title mb='xl'>Login</Title>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          label='Email'
          placeholder='Email'
          {...form.getInputProps('email')}
        />
        <PasswordInput
          label='Password'
          placeholder='Password'
          {...form.getInputProps('password')}
          mt='lg'
        />

        <Group position='right' mt='md'>
          <Button type='submit'>Login</Button>
        </Group>
      </form>
    </Box>
  );
}

export default LoginForm;
