import express from 'express';
import patientServices from '../services/patientServices';
import toNewPatientEntry from '../utils/patientUtils';
import toNewEntry from '../utils/entryUtils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientServices.getNonsensitiveEntry());
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientServices.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get('/:id', (req, res) => {
  const patient = patientServices.findById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const patient = patientServices.findById(req.params.id);
    if (patient) {
      const addedEntry = patientServices.addNewEntry(patient, newEntry);
      res.json(addedEntry);
    } else {
      res.sendStatus(404);
    }
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});
export default router;
