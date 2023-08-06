import { Diagnosis, EntryWithoutId, Patient } from '../../types';
import { Button } from '@mui/material';
import axios from 'axios';
import GenderIcon from './../GenderIcon';
import EntryDetails from './EntryDetails';
import { useState } from 'react';
import AddEntryModal from './../AddEntryModal';
import patientService from '../../services/patients';

interface Props {
  diagnosis: Diagnosis[];
  patient: Patient | undefined;
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}

const PatientInfo = ({ patient, diagnosis, patients, setPatients }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryWithoutId) => {
    try {
      if (patient) {
        const entry = await patientService.createNewEntry(values, patient.id);

        const addedEntry = {
          ...patient,
          entries: patient.entries.concat(entry),
        };
        const updatePatientsState = patients.map((patient) => {
          if (patient.id === addedEntry.id) {
            return { ...patient, entries: addedEntry.entries };
          } else {
            return patient;
          }
        });
        setPatients(updatePatientsState);
        setModalOpen(false);
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const message = e.response.data.replace(
            'Something went wrong. Error: ',
            ''
          );
          console.error(message);
          setError(message);
          setTimeout(() => {
            setError('');
          }, 5000);
        } else {
          setError('Unrecognized axios error');
        }
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  const style = {
    border: '1px solid black',
    borderRadius: '5px',
    marginBottom: '5px',
    padding: '5px',
  };

  return (
    <div>
      {patient ? (
        <div>
          <h2>
            {patient.name}
            <GenderIcon gender={patient.gender} />
          </h2>
          <div>
            <strong>ssn: </strong>
            {patient.ssn}
          </div>
          <div>
            <strong>occupation: </strong>
            {patient.occupation}
          </div>
          <h3>Entries</h3>
          {patient.entries.map((patient) => (
            <div style={style} key={patient.id}>
              <EntryDetails entry={patient} diagnosis={diagnosis} />
            </div>
          ))}
        </div>
      ) : (
        <div>Patient not found</div>
      )}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        diagnosis={diagnosis}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};
export default PatientInfo;
