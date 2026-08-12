import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient, Diagnosis, HealthCheckEntryFormValues } from "../types";
import patientService from '../services/patients';
import diagnosesService from "../services/diagnoses";
import EntryDetails from "./EntryDetails";
import AddEntryForm from "./AddEntryForm";
import { Button } from "@mui/material";
import axios from "axios";

const PatientPage = () => {
    const { id } = useParams<{ id: string }>();
    const [patient, setPatient] = useState<Patient>();
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
    const [entryFormOpen, setEntryFormOpen] = useState<boolean>(false);
    const [entryError, setEntryError] = useState<string>()


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

    const submitNewEntry = async (values: HealthCheckEntryFormValues) => {
        setEntryError(undefined);

        if (!id || !patient) return;

        try {
            const newEntry = await patientService.createEntry(id, values);

            setPatient({
                ...patient,
                entries: patient.entries.concat(newEntry),
            });

            setEntryFormOpen(false);
        } catch (error) {
            let message = "Something went wrong.";

            if (axios.isAxiosError(error)) {
                message = error.response?.data?.error?.[0]?.message || "Invalid input.";
            }

            setEntryError(message);

            setTimeout(() => {
                setEntryError(undefined);
            }, 5000);
        }
    };

    return (
        <div>
            <h2>{patient.name}</h2>
            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            <p>date of birth: {patient.dateOfBirth}</p>

            <Button variant="contained" onClick={() => setEntryFormOpen(true)}>
                Add Entry
            </Button>

            {entryFormOpen && (
                <AddEntryForm
                    onSubmit={submitNewEntry}
                    onCancel={() => setEntryFormOpen(false)}
                    error={entryError}
                />
            )}

            <h3>entries</h3>
            {patient.entries.map((entry) => (
                <EntryDetails 
                    key={entry.id} 
                    entry={entry} 
                    diagnoses={diagnoses}
                />
            ))}
        </div>
    );
};

export default PatientPage