import patients from '../../data/patients';
import {
  Entry,
  EntryWithoutId,
  NewPatientEntry,
  NonSensitivePatient,
  Patient,
} from '../types';
import { v1 as uuid } from 'uuid';

const getNonsensitiveEntry = (): NonSensitivePatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, ssn, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation,
      entries,
    })
  );
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const id = uuid();
  const newPatientEntry = {
    id: id,
    ...entry,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const findById = (id: string): Patient | undefined => {
  const entry = patients.find((d) => d.id === id);
  return entry;
};

const addNewEntry = (patient: Patient, entry: EntryWithoutId): Entry => {
  const id = uuid();
  const newEntry = {
    id: id,
    ...entry,
  };
  patient.entries.push(newEntry);
  return newEntry;
};

export default { getNonsensitiveEntry, addPatient, findById, addNewEntry };
