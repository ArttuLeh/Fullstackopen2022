import {
  Diagnosis,
  Discharge,
  HealthCheckRating,
  Entry,
  EntryWithoutId,
  BaseEntryWithoutId,
  SickLeave,
} from '../types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseDescription = (description: unknown): string => {
  if (!isString(description) || description === '') {
    throw new Error('Incorrect or missing description');
  }
  return description;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist) || specialist === '') {
    throw new Error('Incorrect or missing specialist');
  }
  return specialist;
};

const parseEntryType = (type: unknown): Entry['type'] => {
  if (!isString(type)) {
    throw new Error('Incorrect or missing type');
  }
  const validTypes: Entry['type'][] = [
    'Hospital',
    'OccupationalHealthcare',
    'HealthCheck',
  ];

  if (!validTypes.includes(type as Entry['type'])) {
    throw new Error(`Incorrect entry type: ${type}`);
  }
  return type as Entry['type'];
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }
  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseCriteria = (criteria: unknown): string => {
  if (!isString(criteria) || criteria === '') {
    throw new Error('Incorrect or missing criteria');
  }
  return criteria;
};

const parseDischarge = (object: unknown): Discharge => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing discharge');
  }
  if ('date' in object && 'criteria' in object) {
    const newDischargeEntry = {
      date: parseDate(object.date),
      criteria: parseCriteria(object.criteria),
    };
    return newDischargeEntry;
  }
  throw new Error('Incorrect data: some fields are missing: discharge');
};

const parseSickLeave = (object: unknown): SickLeave => {
  console.log(object);
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing sick leave');
  }

  if ('startDate' in object && 'endDate' in object) {
    if (object.startDate === '' && object.endDate === '') {
      const newSickLeave = {
        startDate: '',
        endDate: '',
      };
      return newSickLeave;
    } else {
      const newSickLeave = {
        startDate: parseDate(object.startDate),
        endDate: parseDate(object.endDate),
      };
      return newSickLeave;
    }
  }
  throw new Error('Incorrect data: some fields are missing: sick leave');
};

const parseEmplyerName = (employerName: unknown): string => {
  if (!isString(employerName) || employerName === '') {
    throw new Error('Incorrect or missing employer name');
  }
  return employerName;
};

const isNumber = (text: unknown): text is number => {
  return typeof text === 'number' || text instanceof Number;
};

const isHealthCheckRaiting = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((v) => v.valueOf())
    .includes(param);
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (
    !isNumber(healthCheckRating) ||
    typeof healthCheckRating !== 'number' ||
    !isHealthCheckRaiting(healthCheckRating)
  ) {
    throw new Error('Incorrect or missing health check rating');
  }
  return healthCheckRating;
};

const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if (
    'description' in object &&
    'date' in object &&
    'specialist' in object &&
    'type' in object
  ) {
    if ('diagnosisCodes' in object) {
      const newEntry: BaseEntryWithoutId = {
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        type: parseEntryType(object.type),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      };
      switch (object.type) {
        case 'Hospital':
          if (!('discharge' in object)) {
            throw new Error('Incorrect or missing discharge');
          }
          const hospitalEntry: EntryWithoutId = {
            ...newEntry,
            type: 'Hospital',
            discharge: parseDischarge(object.discharge),
          };
          return hospitalEntry;
        case 'OccupationalHealthcare':
          if (!('employerName' in object)) {
            throw new Error('Incorrect or missing employer name');
          }
          if (!('sickLeave' in object)) {
            const occupationEntry: EntryWithoutId = {
              ...newEntry,
              type: 'OccupationalHealthcare',
              employerName: parseEmplyerName(object.employerName),
            };
            return occupationEntry;
          } else {
            const occupationEntry: EntryWithoutId = {
              ...newEntry,
              type: 'OccupationalHealthcare',
              employerName: parseEmplyerName(object.employerName),
              sickLeave: parseSickLeave(object.sickLeave),
            };
            return occupationEntry;
          }

        case 'HealthCheck':
          if (!('healthCheckRating' in object)) {
            throw new Error('Incorrect or missing health check raiting');
          }
          const healthCheckEntry: EntryWithoutId = {
            ...newEntry,
            type: 'HealthCheck',
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
          };
          return healthCheckEntry;
      }
    }
    const newEntry: BaseEntryWithoutId = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      type: parseEntryType(object.type),
    };

    switch (object.type) {
      case 'Hospital':
        if (!('discharge' in object)) {
          throw new Error('Incorrect or missing discharge');
        }
        const hospitalEntry: EntryWithoutId = {
          ...newEntry,
          type: 'Hospital',
          discharge: parseDischarge(object.discharge),
        };
        return hospitalEntry;
      case 'OccupationalHealthcare':
        if (!('employerName' in object)) {
          throw new Error('Incorrect or missing employer name');
        }
        if (!('sickLeave' in object)) {
          const occupationEntry: EntryWithoutId = {
            ...newEntry,
            type: 'OccupationalHealthcare',
            employerName: parseEmplyerName(object.employerName),
          };
          return occupationEntry;
        } else {
          const occupationEntry: EntryWithoutId = {
            ...newEntry,
            type: 'OccupationalHealthcare',
            employerName: parseEmplyerName(object.employerName),
            sickLeave: parseSickLeave(object.sickLeave),
          };
          return occupationEntry;
        }

      case 'HealthCheck':
        if (!('healthCheckRating' in object)) {
          throw new Error('Incorrect or missing health check raiting');
        }
        const healthCheckEntry: EntryWithoutId = {
          ...newEntry,
          type: 'HealthCheck',
          healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        };
        return healthCheckEntry;
    }
  }
  throw new Error('Incorrect data: some fields are missing: new entry');
};
export default toNewEntry;
