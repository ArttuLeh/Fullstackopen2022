interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

/*const parseArg = (args: string[]) => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const array = args.map((arg) => parseFloat(arg)).slice(2);

  let i = 0;
  while (i < array.length) {
    if (isNaN(array[i])) {
      throw new Error('provided values were not numbers!');
    }
    i++;
  }
  return {
    target: array[0],
    array: array.slice(1),
  };
};*/

export const calculateExercises = (target: number, array: number[]): Result => {
  const periodLength = array.length;
  const trainingDays = array.filter((value) => value !== 0);
  const sum = array.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  const average = sum / array.length;
  const rating = (sum: number): number => {
    if (sum <= 10) {
      return 1;
    } else if (sum > 10 || sum <= 15) {
      return 2;
    } else {
      return 3;
    }
  };
  const ratingDescription = (sum: number): string => {
    if (sum <= 10) {
      return 'not too bad but could be better';
    } else if (sum > 10 || sum <= 15) {
      return 'good enough to improve your physical condition';
    } else {
      return 'your physical condition will improve a lot, but remember to rest';
    }
  };
  const success = average > target;
  return {
    periodLength: periodLength,
    trainingDays: trainingDays.length,
    success: success,
    rating: rating(sum),
    ratingDescription: ratingDescription(sum),
    target: target,
    average: average,
  };
};

/*try {
  const { target, array } = parseArg(process.argv);
  console.log(calculateExercises(target, array));
} catch (error: unknown) {
  let errorMessage = 'something bad hapenned';
  if (error instanceof Error) {
    errorMessage += ' Error ' + error.message;
  }
  console.log(errorMessage);
}*/
