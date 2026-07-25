export function calculateBmi(heightCm: number, weightKg: number) {
    const heightM: number = heightCm / 100;
    const bmi: number = weightKg / Math.pow(heightM, 2);
    let category: string;

    if (bmi < 18.5) {
        category = 'Underweight';
    } else if (bmi <= 24.9) {
        category = 'Normal';
    } else if (bmi <= 29.9) {
        category = 'Overweight';
    } else {
        category = 'Obesity';
    }

    return `${category} range`;
}

if (process.argv[1] === import.meta.filename) {
    const bmiArgs: string[] = process.argv.slice(2);

    if (bmiArgs.length < 2) {
    console.log('Error: Please provide a target value followed by daily exercise hours.');
    console.log('Example: npm run calculateBMI 180 74');
    process.exit(1);
    }

    const heightCm = Number(bmiArgs[0]);

    const weightKg = Number(bmiArgs[1]);

    console.log(calculateBmi(heightCm, weightKg));
}