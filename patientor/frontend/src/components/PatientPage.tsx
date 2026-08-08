import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../types";
import patientService from '../services/patients'

const PatientPage = () => {
    const { id } = useParams<{ id: string }>();
    const [patient, setPatient] = useState<Patient>();

    useEffect(() => {
        if (!id) return;
        
        const fetchPatient = async () => {
            const patient = await patientService.getPatient(id);
            setPatient(patient);
        };

        fetchPatient();
    }, [id]);

    if (!patient) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h2>{patient.name}</h2>
            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            <p>date of birth: {patient.dateOfBirth}</p>
        </div>
    )
}

export default PatientPage