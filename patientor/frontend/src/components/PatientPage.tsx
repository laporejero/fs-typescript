import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Diagnosis, Patient } from "../types";
import patientService from '../services/patients';
import diagnosesService from "../services/diagnoses";

const PatientPage = () => {
    const { id } = useParams<{ id: string }>();
    const [patient, setPatient] = useState<Patient>();
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

    useEffect(() => {
        if (!id) return;
        
        const fetchPatient = async () => {
            const patient = await patientService.getPatient(id);
            setPatient(patient);
        };

        fetchPatient();
    }, [id]);

    useEffect(() => {
        const fetchDiagnoses = async () => {
            const diagnoses = await diagnosesService.getAll();
            setDiagnoses(diagnoses);
        }

        fetchDiagnoses();
    }, [])

    if (!patient) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h2>{patient.name}</h2>
            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            <p>date of birth: {patient.dateOfBirth}</p>

            <h3>entries</h3>
            {patient.entries.map((entry) => (
                <div key={entry.id}>
                    <p>{entry.date} {entry.description}</p>
                    <ul>
                        {entry.diagnosisCodes?.map(code => {
                            const diagnosis = diagnoses.find(
                                diagnosis => diagnosis.code === code
                            );

                            return (
                                <li key={code}>
                                    {code} {diagnosis ? `${diagnosis.name}` : ''}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}
        </div>
    )
}

export default PatientPage