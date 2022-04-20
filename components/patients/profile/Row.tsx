import React from 'react';
import Appointment from '../../appointment/appointment';
import { formatDrug } from '../../appointment/Row';
import { toDate, toDateTime } from '../../utils/date-format';

type Props = {
  item: Appointment;
  setAppointment?: (appointment: Appointment | null) => void;
  setOpenForm?: (opened: boolean) => void;
};

function Row({ item }: Props) {
  return (
    <>
      <tr>
        <td>{toDate(item.date)}</td>
        <td>{item.diagnosis}</td>
        <td>{formatDrug(item.medication)}</td>
        <td>{toDateTime(item.nextAppointment)}</td>
        <td>{item.attendedBy}</td>
        <td>{item.notes}</td>
      </tr>
    </>
  );
}

export default Row;
