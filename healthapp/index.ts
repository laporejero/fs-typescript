import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';
import { calculateExercises, type Result } from './exerciseCalculator.ts';

const app = express();

app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (
        !req.query.height ||
        !req.query.weight ||
        isNaN(height) ||
        isNaN(weight)
    ) {
        return res.status(400).json({ 
            error: "malformatted parameters"
        });
    }

    const bmi = calculateBmi(height, weight);

    return res.json({
        height: height,
        weight: weight,
        bmi: bmi
    });
});

interface ExerciseRequest {
    daily_exercises: number[], 
    target: number 
}

app.post('/exercises', (req, res) => {
    const { daily_exercises, target } = req.body as ExerciseRequest;

    if (daily_exercises === undefined || target === undefined) {
        return res.status(400).json({
            error: "parameters missing"
        });
    }

    if (
        !Array.isArray(daily_exercises) ||
        daily_exercises.some(value => isNaN(value)) ||
        isNaN(target)
    ) {
        return res.status(400).json({
            error: "malformatted parameters"
        });
    }

    const calcExercise: Result = calculateExercises(daily_exercises, target);

    return res.json(calcExercise);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});