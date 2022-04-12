import { FieldValue } from 'firebase/firestore';

export default interface Appointment {
  id: string;
  date: FieldValue;
  patient: string;
  diagnosis: string;
  medication: string;
  notes: string;
  attendedBy: string;
}
