import React from "react";
import { Icon, Card, List } from "semantic-ui-react";
import {
  Entry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
  Diagnosis,
} from "../types";

const Hospital = ({
  entry,
  diagnoses,
}: {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date}
          <Icon name='hospital' size='big' />
        </Card.Header>
        <Card.Meta>{entry.description}</Card.Meta>
        <Card.Description>
          Discharge from {entry.discharge.date} with {entry.discharge.criteria}
        </Card.Description>
        <List bulleted>
          {entry.diagnosisCodes?.map((code) => (
            <List.Item key={code}>
              {code} {diagnoses.find((d) => d.code === code)?.name}
            </List.Item>
          ))}
        </List>
      </Card.Content>
    </Card>
  );
};

const HealthCheck = ({
  entry,
  diagnoses,
}: {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}) => {
  const healthRatingColor: Map<number, "green" | "yellow" | "orange" | "red"> =
    new Map([
      [0, "green"],
      [1, "yellow"],
      [2, "orange"],
      [3, "red"],
    ]);
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date}
          <Icon name='doctor' size='big' />
        </Card.Header>
        <Card.Meta>{entry.description}</Card.Meta>
        <Icon
          name='heart'
          color={healthRatingColor.get(entry.healthCheckRating)}
        />
        <List bulleted>
          {entry.diagnosisCodes?.map((code) => (
            <List.Item key={code}>
              {code} {diagnoses.find((d) => d.code === code)?.name}
            </List.Item>
          ))}
        </List>
      </Card.Content>
    </Card>
  );
};

const OccupationalHealthcare = ({
  entry,
  diagnoses,
}: {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date}
          <Icon name='stethoscope' size='big' />
        </Card.Header>
        <Card.Meta>{entry.description}</Card.Meta>
        {entry.sickLeave && (
          <Card.Description>
            Sick leave from {entry.sickLeave.startDate} to{" "}
            {entry.sickLeave.endDate}
          </Card.Description>
        )}
        <List bulleted>
          {entry.diagnosisCodes?.map((code) => (
            <List.Item key={code}>
              {code} {diagnoses.find((d) => d.code === code)?.name}
            </List.Item>
          ))}
        </List>
      </Card.Content>
    </Card>
  );
};

const EntryDetails = ({
  entry,
  diagnoses,
}: {
  entry: Entry;
  diagnoses: Diagnosis[];
}) => {
  switch (entry.type) {
    case "Hospital":
      return <Hospital entry={entry} diagnoses={diagnoses} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} diagnoses={diagnoses} />;
    case "HealthCheck":
      return <HealthCheck entry={entry} diagnoses={diagnoses} />;
    default:
      const _exhaustiveCheck: never = entry;
      return _exhaustiveCheck;
  }
};

export default EntryDetails;
