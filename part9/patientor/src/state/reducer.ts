import { State } from "./state";
import { Patient, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "GET_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_ENTRY";
      payload: { id: string; entry: Entry };
    };

export const setPatientList = (patientListFromApi: Patient[]): Action => ({
  type: "SET_PATIENT_LIST",
  payload: patientListFromApi,
});

export const addPatient = (newPatient: Patient): Action => ({
  type: "ADD_PATIENT",
  payload: newPatient,
});

export const getPatient = (patient: Patient): Action => ({
  type: "GET_PATIENT",
  payload: patient,
});

export const addEntry = (id: string, entry: Entry): Action => ({
  type: "ADD_ENTRY",
  payload: { id, entry },
});

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "GET_PATIENT":
      return {
        ...state,
        patient: action.payload,
      };
    case "ADD_ENTRY":
      const { id, entry } = action.payload;
      const patient = state.patients[id];
      const updatedPatient = {
        ...patient,
        entries: [...patient.entries, entry],
      };
      return {
        ...state,
        patient: updatedPatient,
      };

    default:
      return state;
  }
};
