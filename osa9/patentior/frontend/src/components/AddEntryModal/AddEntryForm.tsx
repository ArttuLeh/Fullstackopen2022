import { SyntheticEvent, useState } from 'react';
import {
  TextField,
  Grid,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  SelectChangeEvent,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Input,
} from '@mui/material';
import { Diagnosis, EntryWithoutId, HealthCheckRating } from '../../types';

interface Props {
  onCancel: () => void;
  onSubmit: (entry: EntryWithoutId) => void;
  diagnosis: Diagnosis[];
}

interface HealthCheckRatingOption {
  value: HealthCheckRating;
  label: string;
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = Object.values(
  HealthCheckRating
)
  .filter((v) => typeof v === 'number')
  .map((v) => ({
    value: v as number,
    label: v.toString(),
  }));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const AddEntryForm = ({ onCancel, onSubmit, diagnosis }: Props) => {
  const [type, setType] = useState('Hospital');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.Healty
  );
  const [diagnosisCodes, setDiagnosisCodes] = useState<
    Array<Diagnosis['code']>
  >([]);
  const [employerName, setEmployerName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [criteria, setCriteria] = useState('');

  const handleHealthCheckRaitingChange = (event: SelectChangeEvent<number>) => {
    event.preventDefault();
    if (typeof event.target.value === 'number') {
      const value = event.target.value;
      const rating = Object.values(HealthCheckRating).find(
        (g) => g.valueOf() === value
      );
      if (rating) {
        setHealthCheckRating(value);
      }
    }
  };

  const handleDiagnosisCodesChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const baseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes: {
        diagnosisCodes: diagnosisCodes,
        ...diagnosisCodes,
      },
    };

    switch (type) {
      case 'Hospital':
        return onSubmit({
          type: 'Hospital',
          ...baseEntry,
          discharge: {
            date: dischargeDate,
            criteria: criteria,
          },
        });
      case 'HealthCheck':
        return onSubmit({
          type: 'HealthCheck',
          ...baseEntry,
          healthCheckRating,
        });
      case 'OccupationalHealthcare':
        return onSubmit({
          type: 'OccupationalHealthcare',
          ...baseEntry,
          employerName,
          sickLeave: {
            startDate: startDate,
            endDate: endDate,
          },
        });
    }
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="type"
            name="type"
            value={type}
            onChange={({ target }) => setType(target.value)}
          >
            <FormControlLabel
              value="Hospital"
              control={<Radio />}
              label="Hospital"
            />
            <FormControlLabel
              value="HealthCheck"
              control={<Radio />}
              label="Health Check"
            />
            <FormControlLabel
              value="OccupationalHealthcare"
              control={<Radio />}
              label="Occupational Healthcare"
            />
          </RadioGroup>
        </FormControl>
        <InputLabel sx={{ marginTop: 1 }} />
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <InputLabel sx={{ marginTop: 1 }}>Date</InputLabel>
        <Input
          type="date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <InputLabel sx={{ marginTop: 2 }} />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        <InputLabel sx={{ marginTop: 1 }}>Diagnosis codes</InputLabel>
        <Select
          label="Diagnosis codes"
          multiple
          fullWidth
          value={diagnosisCodes}
          onChange={handleDiagnosisCodesChange}
          input={<OutlinedInput label="Diagnosis codes" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {diagnosis.map((diagnose) => (
            <MenuItem key={diagnose.name} value={diagnose.code}>
              <Checkbox checked={diagnosisCodes.indexOf(diagnose.code) > -1} />
              <ListItemText primary={diagnose.code} />
            </MenuItem>
          ))}
        </Select>
        {type === 'HealthCheck' && (
          <div>
            <InputLabel sx={{ marginTop: 1, marginBottom: 1 }}>
              Health check raiting
            </InputLabel>
            <Select
              sx={{ marginBottom: 1 }}
              //label="Health Check Raiting"
              fullWidth
              value={healthCheckRating}
              onChange={handleHealthCheckRaitingChange}
            >
              {healthCheckRatingOptions.map((option) => (
                <MenuItem key={option.label} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </div>
        )}
        {type === 'Hospital' && (
          <div>
            <InputLabel sx={{ marginTop: 1 }}>Discharge</InputLabel>
            <InputLabel sx={{ marginTop: 1, marginLeft: 2 }}>Date</InputLabel>
            <Input
              sx={{ marginLeft: 2, width: 535 }}
              type="date"
              placeholder="YYYY-MM-DD"
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <InputLabel sx={{ marginTop: 2 }} />
            <TextField
              sx={{ marginLeft: 2, marginBottom: 1, width: 535 }}
              label="Criteria"
              value={criteria}
              onChange={({ target }) => setCriteria(target.value)}
            />
          </div>
        )}
        {type === 'OccupationalHealthcare' && (
          <div>
            <InputLabel sx={{ marginTop: 1 }} />
            <TextField
              label="Employer Name"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <InputLabel sx={{ marginTop: 1 }}>Sickleave</InputLabel>
            <InputLabel sx={{ marginTop: 2, marginLeft: 2 }}>
              Start date
            </InputLabel>
            <Input
              sx={{ marginLeft: 2, width: 535 }}
              type="date"
              placeholder="YYYY-MM-DD"
              value={startDate}
              onChange={({ target }) => setStartDate(target.value)}
            />
            <InputLabel sx={{ marginTop: 2, marginLeft: 2 }}>
              End date
            </InputLabel>
            <Input
              sx={{ marginLeft: 2, marginBottom: 1, width: 535 }}
              type="date"
              placeholder="YYYY-MM-DD"
              value={endDate}
              onChange={({ target }) => setEndDate(target.value)}
            />
          </div>
        )}
        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: 'left' }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: 'right',
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
export default AddEntryForm;
