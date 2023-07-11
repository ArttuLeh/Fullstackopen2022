export interface FlightDiary {
  id?: number;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}
export type NewFlight = Omit<FlightDiary, 'id'>;
