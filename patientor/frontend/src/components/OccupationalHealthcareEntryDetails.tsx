import { Diagnosis, OccupationalHealthcareEntry } from "../types";

interface OccupationalHealthcareEntryDetailsProps {
    entry: OccupationalHealthcareEntry;
    diagnoses: Diagnosis[];
}

const OccupationalHealthcareEntryDetails = ({ entry, diagnoses }: OccupationalHealthcareEntryDetailsProps) => {
    return (
        <div>
            <p>{entry.date}</p>
            <p>Occupational Healthcare</p>
            <p>{entry.description}</p>
            <p>Employer: {entry.employerName}</p>
            {entry.sickLeave && (
                <>
                    <h4>Sick leave:</h4>
                    <p>Start: {entry.sickLeave.startDate}</p>
                    <p>End: {entry.sickLeave.endDate}</p>
                </>
            )}
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
            <p>Specialist: {entry.specialist}</p>
        </div>
    );
}

export default OccupationalHealthcareEntryDetails;