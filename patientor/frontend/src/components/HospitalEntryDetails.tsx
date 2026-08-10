import { HospitalEntry, Diagnosis } from "../types";

interface HospitalEntryDetailsProps {
    entry: HospitalEntry;
    diagnoses: Diagnosis[];
}

const HospitalEntryDetails = ({ entry, diagnoses }: HospitalEntryDetailsProps) => {
    return (
        <div>
            <p>{entry.date}</p>
            <p>Hospital</p>
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
            <h4>Discharge:</h4>
            <p>Date: {entry.discharge.date}</p>
            <p>Criteria: {entry.discharge.criteria}</p>
            <p>Specialist: {entry.specialist}</p>
        </div>
    );
}

export default HospitalEntryDetails;