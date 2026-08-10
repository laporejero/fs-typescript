import { Diagnosis, Entry } from "../types";
import HealthCheckEntryDetails from "./HealthCheckEntryDetails";
import HospitalEntryDetails from "./HospitalEntryDetails";
import OccupationalHealthcareEntryDetails from "./OccupationalHealthcareEntryDetails";

interface EntryDetailsProps {
    entry: Entry;
    diagnoses: Diagnosis[];
}

const EntryDetails = ({ entry, diagnoses }: EntryDetailsProps) => {
    switch(entry.type) {
        case "Hospital":
            return <HospitalEntryDetails entry={entry} diagnoses={diagnoses} />

        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntryDetails entry={entry} diagnoses={diagnoses} />
        
        case "HealthCheck":
            return <HealthCheckEntryDetails entry={entry} diagnoses={diagnoses} />

        default:
            return assertNever(entry);
    }
}

export default EntryDetails

const assertNever = (value: never): never => {
  throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
};