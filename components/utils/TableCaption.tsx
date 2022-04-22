import { Loader } from '@mantine/core';
import React from 'react';

function TableCaption({ loading }: { loading: boolean }) {
  if (!loading) {
    return null;
  }
  return (
    <caption
      style={{
        padding: '1rem 2rem',
        textAlign: 'center',
      }}
    >
      <Loader />
    </caption>
  );
}

export default TableCaption;
