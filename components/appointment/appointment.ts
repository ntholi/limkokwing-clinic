import { FieldValue } from 'firebase/firestore';

export default interface Appointment {
  id: string;
  date: FieldValue;
  patient: string;
  patientName: string;
  diagnosis: string;
  medication: string[];
  nextAppointment?: any;
  notes: string;
  attendedBy?: string | null;
  createdBy?: string;
}
