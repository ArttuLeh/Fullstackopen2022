const calculateBmi = (height: number, weight: number) => {
  height = height / 100;
  const bmi = weight / (height * height);
  console.log(bmi);
  if (bmi < 19) {
    return 'slightly underweight';
  } else if (bmi >= 19 && bmi < 25) {
    return 'Normal (healty weight)';
  } else if (bmi >= 25) {
    return 'slightly overweight';
  }
};

try {
  console.log(calculateBmi(180, 75));
} catch (error: unknown) {
  let errorMessage = 'something went wrong';
  if (error instanceof Error) {
    errorMessage += ' Error ' + error.message;
  }
  console.log(errorMessage);
}
//call function console.log(calculateBmi(180, 74))

//print: Normal (healthy weight)
