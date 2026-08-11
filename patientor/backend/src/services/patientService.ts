import patients from '../../data/patients.ts';
import type { Patient, NonSensitivePatient, NewPatient, Entry, NewEntry } from '../types.ts';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
    return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient,
        entries: []
    };

    patients.push(newPatient);
    return newPatient;
};

const findById = (id: string): Patient | undefined => {
    const patient = patients.find(p => p.id === id);
    return patient;
};

const addEntry = (patientId: string, entry: NewEntry): Entry => {
    const patient = patients.find(p => p.id === patientId);

    if (!patient) {
        throw new Error('Patient not found');
    }

    const newEntry: Entry = {
        id: uuid(),
        ...entry
    };

    patient.entries.push(newEntry);
    return newEntry;
};

export default {
    getPatients,
    getNonSensitivePatients,
    addPatient,
    findById,
    addEntry
};