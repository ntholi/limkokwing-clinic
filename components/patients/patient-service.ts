import Patient from './patient';

export function savePatient(patient: Patient): Promise<Patient> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(patient);
    }, 1000);
  });
}
