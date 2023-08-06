import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());
app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight || isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: 'malformatted parameters' });
  }
  const bmi = calculateBmi(height, weight);
  res.json({ weight, height, bmi });
});

app.post('/exercises', (req, res) => {
  console.log('POST', req.body);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { dailyExercises, target } = req.body;

  if (!Array.isArray(dailyExercises)) {
    res.status(400).json({ error: 'dailyExercises must be an array' });
  } else if (
    !dailyExercises.every((exercise: number) => typeof exercise === 'number')
  ) {
    res
      .status(400)
      .json({ error: 'dailyExercises must contains only numbers' });
  }

  if (isNaN(Number(target))) {
    res.status(400).send({ error: 'target must be number' });
  } else if (!target) {
    res.status(400).send({ error: 'target parameter must be given' });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(Number(target), dailyExercises);
  res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
