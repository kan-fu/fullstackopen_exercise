import {
  Entry,
  Gender,
  newPatientEntry,
  HealthCheckRating,
  EntryWithoutId,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseName = (name: unknown): string => {
  if (name && isString(name)) {
    return name;
  }
  throw new Error(`Incorrect or missing name: ${name}`);
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (dateOfBirth && isString(dateOfBirth) && isDate(dateOfBirth)) {
    return dateOfBirth;
  }
  throw new Error(`Incorrect or missing data of birth: ${dateOfBirth}`);
};

const parseSsn = (ssn: unknown): string => {
  if (ssn && isString(ssn)) {
    return ssn;
  }
  throw new Error(`Incorrect or missing ssn: ${ssn}`);
};

const parseGender = (gender: unknown): Gender => {
  if (gender && isGender(gender)) {
    return gender;
  }
  throw new Error(`Incorrect or missing gender: ${gender}`);
};

const parseOccupation = (occupation: unknown): string => {
  if (occupation && isString(occupation)) {
    return occupation;
  }
  throw new Error(`Incorrect or missing occupation: ${occupation}`);
};

type Fileds = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
  entries: unknown;
};

export const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
  entries,
}: Fileds): newPatientEntry => {
  const newEntry: newPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: entries as Entry[],
  };

  return newEntry;
};

type EntryField = {
  id: unknown;
  description: unknown;
  date: unknown;
  specialist: unknown;
  type: unknown;
  healthCheckRating: unknown;
  employerName: unknown;
};

const parseString = (param: unknown): string => {
  if (param && isString(param)) {
    return param;
  }
  throw new Error(`Incorrect or missing param: ${param}`);
};

const parseDate = (date: unknown): string => {
  if (date && isString(date) && isDate(date)) {
    return date;
  }
  throw new Error(`Incorrect or missing data of birth: ${date}`);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (
    typeof healthCheckRating === "number" &&
    isHealthCheckRating(healthCheckRating)
  ) {
    return healthCheckRating;
  }
  throw new Error(
    `Incorrect or missing healthCheckRating: ${healthCheckRating}`
  );
};

export const toNewEntry = ({
  description,
  date,
  specialist,
  type,
  healthCheckRating,
  employerName,
  ...props
}: EntryField): EntryWithoutId => {
  const requiredFields = {
    description: parseString(description),
    date: parseDate(date),
    specialist: parseString(specialist),
  };
  switch (type) {
    case "Hospital":
      return {
        ...requiredFields,
        ...props,
        type,
      };
    case "OccupationalHealthcare":
      return {
        ...requiredFields,
        ...props,
        type,
        employerName: parseString(employerName),
      };
    case "HealthCheck":
      return {
        ...requiredFields,
        ...props,
        type,
        healthCheckRating: parseHealCheckRating(healthCheckRating),
      };
    default:
      throw new Error(`Incorrect or missing type: ${type}`);
  }
};
