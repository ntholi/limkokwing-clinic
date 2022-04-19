import React from 'react';
import Appointment from '../../appointment/appointment';
import {
  asString as formatFirebaseDate,
  formatDrug,
} from '../../appointment/Row';

type Props = {
  item: Appointment;
  setAppointment?: (appointment: Appointment | null) => void;
  setOpenForm?: (opened: boolean) => void;
};

function Row({ item }: Props) {
  return (
    <>
      <tr>
        <td>{formatFirebaseDate(item.date)}</td>
        <td>{item.diagnosis}</td>
        <td>{item.attendedBy}</td>
        <td>{formatDrug(item.medication)}</td>
        <td>{dateAsString(item.nextAppointment)}</td>
        <td>{item.notes}</td>
      </tr>
    </>
  );
}

// Displays JavaScript Date object as string with time
function dateAsString(date: Date | undefined) {
  if (!date) {
    return '';
  }
  // return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  return date.toLocaleString();
}
export default Row;
