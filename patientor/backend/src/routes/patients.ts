import express, { type Response } from 'express';
import type { NonSentitivePatient } from '../types.ts';
import patientService from '../services/patientService.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSentitivePatient[]>) => {
    res.send(patientService.getNonSensitivePatients())
});

router.post('/', (_req, res) => {
    res.send('add a new diagnosis');
});

export default router