export default interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth?: Date | null;
  gender?: 'Male' | 'Female' | null;
  occupation: 'Student' | 'Staff Member' | 'Other';
}
