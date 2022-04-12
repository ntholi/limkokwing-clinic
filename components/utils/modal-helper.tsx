import { Text } from '@mantine/core';
import { OpenConfirmModal } from '@mantine/modals/lib/context';

export const getConfirmDeleteProps = (
  itemName: string,
  onConfirm: () => void
): OpenConfirmModal => {
  return {
    title: 'Confirm Delete',
    children: (
      <Text size='sm'>
        Are you sure you want to delete <strong>{itemName}</strong>?
      </Text>
    ),
    confirmProps: { color: 'red' },
    labels: { confirm: 'Confirm', cancel: 'Cancel' },
    onConfirm: onConfirm,
  };
};
