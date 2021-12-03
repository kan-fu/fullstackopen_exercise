import express from "express";
import patientService from "../services/patientService";
import { toNewPatient, toNewEntry } from "../utils";
const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getPublicPatients());
});

router.post("/", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(req.params.id, newEntry);
    res.json(addedEntry);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
});

router.get("/:id", (req, res) => {
  const patient = patientService.getPublicPatientsById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

export default router;
