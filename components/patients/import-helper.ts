import Patient from './patient';
import { savePatient } from './patient-service';

export default function readCSV(file: File) {
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = async () => {
    const csv = reader.result;
    const patients = patientsFromCSV(csv as string);
    for (let i = 0; i < patients.length; i++) {
      const patient = patients[i];
      console.log(`${i + 1}/${patients.length}) Saving ${patient.id}...`);
      try {
        await savePatient(patient);
      } catch (e) {
        console.error(`Error saving ${patient.id}`, e);
      }
    }
  };
  return [];
}

function patientsFromCSV(csv: string): Patient[] {
  const patients: Patient[] = [];
  const lines = csv.split('\n');
  lines.shift(); // delete header
  lines.forEach((line) => {
    const data = line.split(',');
    if (data[0]) {
      const firstName = data[1].split(' ').slice(0, -1).join(' ');
      const lastName = data[1].split(' ').slice(-1).join(' ');
      const dateOfBirth = asDate(data[2]);
      let gender: 'Male' | 'Female' | null = null;
      if (data[3]) {
        gender = data[3].toLowerCase() === 'M' ? 'Male' : 'Female';
      }
      patients.push({
        id: data[0],
        firstName,
        lastName,
        dateOfBirth,
        gender,
        phoneNumber: '',
        occupation: 'Student',
      });
    }
  });
  return patients;
}

function asDate(str: string | null) {
  if (!str) return null;
  // let d = str.split('/');
  // let dat = new Date(d[2] + '/' + d[1] + '/' + d[0]);
  return new Date(str);
}
