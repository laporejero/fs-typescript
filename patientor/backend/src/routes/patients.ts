import express, { type Request, type Response } from 'express';
import { 
    type NonSensitivePatient, 
    NewPatientSchema, 
    type NewPatient, 
    type NewEntry, 
    NewEntrySchema
} from '../types.ts';
import patientService from '../services/patientService.ts';
import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
    res.send(patientService.getNonSensitivePatients());
});

router.get('/:id', (req, res: Response<NonSensitivePatient>) => {
    const patient = patientService.findById(req.params.id);

    if (patient) {
        res.send(patient);
    } else {
        res.sendStatus(404);
    }
});

router.post('/', (req: Request<unknown, unknown, NewPatient>, res) => {
    try {
        const newPatient = NewPatientSchema.parse(req.body);
        const addedPatient = patientService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            res.status(400).send({ error: error.issues });
        } else {
            res.status(400).send({ error: 'unknown error' });
        }
    }
});

router.post('/:id/entries', (req: Request<{id: string}, unknown, NewEntry>, res) => {
    try {
        const newEntry = NewEntrySchema.parse(req.body);
        const addedEntry = patientService.addEntry(req.params.id, newEntry);
        res.status(201).json(addedEntry);
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            res.status(400).send({ error: error.issues });
        } else if (error instanceof Error) {
            res.status(404).send({ error: error.message });
        } else {
            res.status(400).send({ error: 'unknown error' });
        }
    }
})

export default router;