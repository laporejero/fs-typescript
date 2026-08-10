import { Diagnosis, HealthCheckEntry } from "../types";

interface HealthCheckEntryDetailsDetailsProps {
    entry: HealthCheckEntry;
    diagnoses: Diagnosis[];
}

const HealthCheckEntryDetails = ({ entry, diagnoses }: HealthCheckEntryDetailsDetailsProps) => {
    return (
        <div>
            <p>{entry.date}</p>
            <p>Health Check</p>
            <p>{entry.description}</p>
            <h4>Diagnoses:</h4>
            <ul>
                {entry.diagnosisCodes?.map(code => {
                    const diagnosis = diagnoses.find(
                        diagnosis => diagnosis.code === code
                    );

                    return (
                        <li key={code}>
                            {code} {diagnosis ? `(${diagnosis?.name})` : ''}
                        </li>
                    );
                })}
            </ul>
            <p>Health Rating: {entry.healthCheckRating}</p>
            <p>Specialist: {entry.specialist}</p>
        </div>
    );
}

export default HealthCheckEntryDetails;