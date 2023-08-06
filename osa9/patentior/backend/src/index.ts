import express from 'express';
import cors from 'cors';
import diagnoseRoute from './routes/diagnose';
import patientRoute from './routes/patient';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnoseRoute);
app.use('/api/patients', patientRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
