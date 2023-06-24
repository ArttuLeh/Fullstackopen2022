/*interface MultiplyValues {
  weight: number;
  height: number;
}
const parseArguments = (args: string[]): MultiplyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};*/

export const calculateBmi = (height: number, weight: number) => {
  height = height / 100;
  const bmi = weight / (height * height);
  //console.log(`Your bmi is ${bmi}`);
  if (bmi < 19) {
    return 'slightly underweight';
  } else if (bmi >= 19 && bmi < 25) {
    return 'Normal (healty weight)';
  } else {
    return 'slightly overweight';
  }
};

/*try {
  const { height, weight } = parseArguments(process.argv);
  calculateBmi(height, weight);
} catch (error: unknown) {
  let errorMessage = 'something went wrong';
  if (error instanceof Error) {
    errorMessage += ' Error ' + error.message;
  }
  console.log(errorMessage);
}*/
