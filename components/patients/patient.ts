export default interface Patient {
  id?: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: Date;
  occupation: 'Student' | 'Staff Member' | 'Other';
}
