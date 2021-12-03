import patientsData from "../../data/patients";
import {
  newPatientEntry,
  PatientEntry,
  PublicPatientEntry,
  Entry,
  EntryWithoutId,
} from "../types";
import { v1 as uuid } from "uuid";

const patients: PatientEntry[] = patientsData;

const getPublicPatients = (): PublicPatientEntry[] => {
  return patients.map(({ ssn: _ssn, ...props }) => props);
};

const getPublicPatientsById = (id: string): PatientEntry | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};

const addPatient = (patient: newPatientEntry): PatientEntry => {
  const newPatient = {
    ...patient,
    id: uuid(),
  };
  patientsData.push(newPatient);
  return newPatient;
};

const addEntry = (id: string, entry: EntryWithoutId): Entry => {
  const patient = patients.find((p) => p.id === id);
  if (!patient) {
    throw new Error("Patient not found");
  }
  const newEntry = {
    ...entry,
    id: uuid(),
  };
  patient.entries.push(newEntry);
  return newEntry;
};

const patientService = {
  getPublicPatients,
  addPatient,
  getPublicPatientsById,
  addEntry,
};
export default patientService;
