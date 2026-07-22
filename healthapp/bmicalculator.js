"use strict";
function calculateBmi(heightCm, weightKg) {
    const heightM = heightCm / 100;
    const bmi = weightKg / Math.pow(heightM, 2);
    let category = "";
    if (bmi < 18.5) {
        category = 'Underweight';
    }
    else if (bmi >= 18.5 || bmi <= 24.9) {
        category = 'Normal';
    }
    else if (bmi >= 25.0 || bmi <= 29.9) {
        category = 'Overweight';
    }
    else if (bmi >= 30) {
        category = 'Obesity';
    }
    return `${category} range`;
}
console.log(calculateBmi(180, 74));
