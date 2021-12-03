import React, { useState, useEffect } from "react";
import axios from "axios";
import { Icon, Header, Card, Button } from "semantic-ui-react";
import { getPatient, addEntry } from "../state/reducer";
import { useStateValue } from "../state";
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router-dom";
import { Patient, Diagnosis, EntryWithoutId, Entry } from "../types";
import EntryDetails from "../components/EntryDetails";
import AddEntryModal from "../AddEntryModal";

const PatientPage = () => {
  const [{ patient }, dispatch] = useStateValue();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryWithoutId) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(id, newEntry));
      closeModal();
    } catch (e) {
      // console.error(e.response?.data || "Unknown Error");
      // setError(e.response?.data?.error || "Unknown error");
      console.log("Error");
      setError("Error");
    }
  };

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const { data: diagnosesFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        setDiagnoses(diagnosesFromApi);
      } catch (error) {
        console.log(error);
      }
    };
    void fetchDiagnoses();
  }, []);

  useEffect(() => {
    if (!patient || patient.id !== id) {
      // void axios.get<void>(`${apiBaseUrl}/patients/${id}`);

      const fetchPatient = async () => {
        try {
          const { data: patientFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );

          dispatch(getPatient(patientFromApi));
        } catch (e) {
          console.error(e);
        }
      };
      void fetchPatient();
    }
  }, [dispatch]);

  if (!patient || patient.id !== id) {
    return null;
  }
  return (
    <div>
      <Header as='h2'>
        {patient.name}
        <Icon name={patient.gender === "female" ? "venus" : "mars"} />
      </Header>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <Header as='h3'>entries</Header>
      <Card.Group>
        {patient.entries.map((entry) => (
          <EntryDetails entry={entry} diagnoses={diagnoses} key={entry.id} />
        ))}
      </Card.Group>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        diagnoses={diagnoses}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
};

export default PatientPage;
