import patients from '../../data/patients.ts'
import type { Patient, NonSentitivePatient } from '../types.ts'

const getPatients = (): Patient[] => {
    return patients;
};

const getNonSensitivePatients = (): NonSentitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }))
}

export default {
    getPatients,
    getNonSensitivePatients
}