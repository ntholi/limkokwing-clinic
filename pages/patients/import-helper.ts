import Patient from '../../components/patients/patient';

export default function readCSV(file: File) {
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = () => {
    const csv = reader.result;
    console.log('Inside');
    const patients = patientsFromCSV(csv as string);
    patients.forEach((patient) => {
      console.log(patient);
    });
  };
  return [];
}

function patientsFromCSV(csv: string): Patient[] {
  const patients: Patient[] = [];
  const lines = csv.split('\n');
  lines.shift(); // delete header
  lines.forEach((line) => {
    const patient = line.split(',');
    if (patient[0]) {
      const firstName = patient[1].split(' ').slice(0, -1).join(' ');
      const lastName = patient[1].split(' ').slice(-1).join(' ');
      const dateOfBirth = patient[2] ? new Date(patient[0]) : null;
      let gender: 'Male' | 'Female' | null = null;
      if (patient[3]) {
        gender = patient[3].toLowerCase() === 'M' ? 'Male' : 'Female';
      }
      patients.push({
        id: patient[0],
        firstName,
        lastName,
        dateOfBirth,
        gender,
        occupation: 'Student',
      });
    }
  });
  return patients;
}
