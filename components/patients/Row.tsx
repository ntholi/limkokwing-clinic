import React from 'react';
import Patient from './patient';

type Props = {
  item: Patient;
};
function Row({ item }: Props) {
  return (
    <tr>
      <td>{item.id}</td>
      <td>{item.firstName}</td>
      <td>{item.firstName}</td>
      <td>{item.occupation}</td>
      <td>{calculateAge(item.dateOfBirth)}</td>
    </tr>
  );
}

function calculateAge(dateOfBirth: Date | undefined) {
  if (!dateOfBirth) {
    return 'N/A';
  }
  const now = new Date();
  const age = now.getFullYear() - dateOfBirth.getFullYear();
  const month = now.getMonth() - dateOfBirth.getMonth();
  if (month < 0 || (month === 0 && now.getDate() < dateOfBirth.getDate())) {
    return age - 1;
  }
  return age;
}

export default Row;
