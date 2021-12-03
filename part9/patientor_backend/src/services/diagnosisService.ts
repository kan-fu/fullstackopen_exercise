import diagnosesData from "../../data/diagnoses.json";
import { DiagnosisEntry } from "../types";

const diagnoses: DiagnosisEntry[] = diagnosesData as DiagnosisEntry[];

const getDiagnoses = (): DiagnosisEntry[] => {
  return diagnoses;
};

const diagnosisService = { getDiagnoses };
export default diagnosisService;
