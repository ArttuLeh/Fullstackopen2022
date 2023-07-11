import axios from 'axios';
import { FlightDiary, NewFlight } from './types';

const baseUrl = 'http://localhost:3001/api/diaries';

export const getDiaries = () => {
  return axios.get<FlightDiary[]>(baseUrl).then((response) => response.data);
};

export const createFlight = (object: NewFlight) => {
  return axios
    .post<NewFlight>(baseUrl, object)
    .then((response) => response.data);
};
