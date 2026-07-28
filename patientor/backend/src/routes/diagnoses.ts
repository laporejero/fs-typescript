import express, { type Response } from 'express';
import type { Diagnosis } from '../types.ts';
import diagnosisService from '../services/diagnosisService.ts';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
    res.send(diagnosisService.getDiagnoses());
});

router.post('/', (_req, res) => {
    res.send('add a new diagnosis');
});

export default router