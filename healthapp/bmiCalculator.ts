function calculateBmi(heightCm: number, weightKg: number) {
    const heightM: number = heightCm / 100;
    const bmi: number = weightKg / Math.pow(heightM, 2);
    let category: string = ""

    if (bmi < 18.5) {
        category = 'Underweight';
    } else if (bmi <= 24.9) {
        category = 'Normal';
    } else if (bmi <= 29.9) {
        category = 'Overweight';
    } else {
        category = 'Obesity';
    }

    return `${category} range`
}

console.log(calculateBmi(180, 74))