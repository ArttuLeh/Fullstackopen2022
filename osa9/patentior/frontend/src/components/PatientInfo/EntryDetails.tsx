import { Diagnosis, Entry } from '../../types';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FavoriteIcon from '@mui/icons-material/Favorite';

const EntryDetails: React.FC<{ entry: Entry; diagnosis: Diagnosis[] }> = ({
  entry,
  diagnosis,
}) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const patientDiagnosis = entry.diagnosisCodes?.map((diagnoseCode) => {
    const matchingCode = diagnosis.find(
      (diagnose) => diagnose.code === diagnoseCode
    );
    return matchingCode;
  });

  switch (entry.type) {
    case 'Hospital':
      return (
        <div>
          <p>
            {entry.date} <LocalHospitalIcon />
          </p>

          <i>{entry.description}</i>
          <p>Diagnosed by {entry.specialist}</p>
          <p>Discharge:</p>
          <ul>
            {Object.values(entry.discharge).map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          {!patientDiagnosis?.[0] ? null : <p>Diagnosis codes:</p>}
          <ul>
            {!patientDiagnosis?.[0]
              ? null
              : patientDiagnosis?.map((diagnose) => (
                  <li key={diagnose?.code}>
                    {diagnose?.code} {diagnose?.name}
                  </li>
                ))}
          </ul>
        </div>
      );
    case 'OccupationalHealthcare':
      return (
        <div>
          <p>
            {entry.date} <LocalHospitalIcon />
            <i>{entry.employerName}</i>
          </p>
          <i>{entry.description}</i>
          <p>Diagnosed by {entry.specialist}</p>
          {entry.sickLeave?.startDate === '' &&
          entry.sickLeave?.endDate === '' ? null : (
            <div>
              Sickleaves:
              <ul>
                <li>Start date: {entry.sickLeave?.startDate}</li>
                <li>End date: {entry.sickLeave?.endDate}</li>
              </ul>
            </div>
          )}
          {!patientDiagnosis?.[0] ? null : <p>Diagnosis codes:</p>}
          <ul>
            {!patientDiagnosis?.[0]
              ? null
              : patientDiagnosis?.map((diagnose) => (
                  <li key={diagnose?.code}>
                    {diagnose?.code} {diagnose?.name}
                  </li>
                ))}
          </ul>
        </div>
      );
    case 'HealthCheck':
      const healthCheckRating = () => {
        switch (entry.healthCheckRating) {
          case 0:
            return <FavoriteIcon sx={{ color: 'green' }} />;
          case 1:
            return <FavoriteIcon sx={{ color: 'yellowgreen' }} />;
          case 2:
            return <FavoriteIcon sx={{ color: 'yellow' }} />;
          case 3:
            return <FavoriteIcon sx={{ color: 'red' }} />;
        }
      };
      return (
        <div>
          <p>
            {entry.date} <LocalHospitalIcon />
          </p>
          <i>{entry.description}</i>
          <p>{healthCheckRating()}</p>
          <p>Diagnosed by {entry.specialist}</p>
          {!patientDiagnosis?.[0] ? null : <p>Diagnosis codes:</p>}
          <ul>
            {!patientDiagnosis?.[0]
              ? null
              : patientDiagnosis?.map((diagnose) => (
                  <li key={diagnose?.code}>
                    {diagnose?.code} {diagnose?.name}
                  </li>
                ))}
          </ul>
        </div>
      );
    default:
      return assertNever(entry);
  }
};
export default EntryDetails;
