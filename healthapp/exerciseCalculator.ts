interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}
 
function calculateExercises(dailyExercises: number[], target: number): Result {
    const periodLength = dailyExercises.length;

    const trainingDays = dailyExercises.filter(hours => hours > 0).length;

    const totalHours = dailyExercises.reduce((sum, hours) => sum + hours, 0);

    const average = totalHours / periodLength;

    const success = average >= target;

    let rating: number;
    let ratingDescription: string;

    if (average >= target) {
        rating = 3;
        ratingDescription = 'great job, target reached!';
    } else if (average >= target * 0.75) {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    } else {
        rating = 1;
        ratingDescription = 'you need to exercise more';
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
}

const exerciseArgs: string[] = process.argv.slice(2);

if (exerciseArgs.length < 2) {
  console.log('Error: Please provide a target value followed by daily exercise hours.');
  console.log('Example: npm run calculateExercises 2 1 0 2 4.5 0 3 1');
  process.exit(1);
}

const targetInput = Number(exerciseArgs[0]);

const hoursInput: number[] = exerciseArgs.slice(1).map(hours => Number(hours));

if (isNaN(targetInput) || hoursInput.some((hours: number) => isNaN(hours))) {
  console.log('Error: All provided values must be valid numbers.');
  process.exit(1);
}

console.log(calculateExercises(hoursInput, targetInput));