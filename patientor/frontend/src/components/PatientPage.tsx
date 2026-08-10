import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient, Diagnosis } from "../types";
import patientService from '../services/patients';
import diagnosesService from "../services/diagnoses";
import EntryDetails from "./EntryDetails";

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
                <EntryDetails 
                    key={entry.id} 
                    entry={entry} 
                    diagnoses={diagnoses}
                />
            ))}
        </div>
    )
}

export default PatientPage