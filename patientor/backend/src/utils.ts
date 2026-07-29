import { type NewPatient, Gender } from "./types.ts";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
    if (!isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
}

const parseSSN = (ssn: unknown): string => {
    if (!isString(ssn)) {
        throw new Error ('Incorrect or missing ssn ' + ssn);
    }
    return ssn;
}

const isGender = (param: string): param is Gender => {
    return (Object.values(Gender) as string[]).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
}

const parseOccupation = (occupation: unknown): string => {
    if (!isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }
    return occupation;
}

const parseNewPatient = (patient: unknown): NewPatient => {
    if (!patient || typeof patient !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if (
        'name' in patient && 
        'dateOfBirth' in patient && 
        'ssn' in patient &&
        'gender' in patient &&
        'occupation' in patient
    ) {
        const newPatient: NewPatient = {
            name: parseName(patient.name),
            dateOfBirth: parseDate(patient.dateOfBirth),
            ssn: parseSSN(patient.ssn),
            gender: parseGender(patient.gender),
            occupation: parseOccupation(patient.occupation)
        };

        return newPatient;
    }

    throw new Error('Incorrect data: some fields are missing');
};

export default parseNewPatient;