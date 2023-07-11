import { useState } from 'react';
import { createFlight } from '../diaryService';
import { FlightDiary } from '../types';
import Notification from './Notification';

const NewEntry = ({ diaries }: { diaries: FlightDiary[] }) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const createNewEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createFlight({
      date: date,
      visibility: visibility,
      weather: weather,
      comment: comment,
    })
      .then((data) => {
        diaries.concat(data);
      })
      .catch((error) => {
        setError(error.response.data);
        setTimeout(() => {
          setError('');
        }, 3000);
      });

    setDate('');
    setVisibility('');
    setWeather('');
    setComment('');
  };

  return (
    <div>
      <Notification error={error} />
      {/*error && <p>{error}</p>*/}
      <h2>Add new entry</h2>
      <form onSubmit={createNewEntry}>
        <div>
          Date:{' '}
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          visibility: great
          <input
            type="radio"
            value="great"
            checked={visibility === 'great'}
            onChange={(event) => setVisibility(event.target.value)}
          />
          good
          <input
            type="radio"
            value="good"
            checked={visibility === 'good'}
            onChange={(event) => setVisibility(event.target.value)}
          />
          ok
          <input
            type="radio"
            value="ok"
            checked={visibility === 'ok'}
            onChange={(event) => setVisibility(event.target.value)}
          />
          poor
          <input
            type="radio"
            value="poor"
            checked={visibility === 'poor'}
            onChange={(event) => setVisibility(event.target.value)}
          />
        </div>
        <div>
          weather: sunny
          <input
            type="radio"
            value="sunny"
            checked={weather === 'sunny'}
            onChange={(event) => setWeather(event.target.value)}
          />
          rainy
          <input
            type="radio"
            value="rainy"
            checked={weather === 'rainy'}
            onChange={(event) => setWeather(event.target.value)}
          />
          cloudy
          <input
            type="radio"
            value="cloudy"
            checked={weather === 'cloudy'}
            onChange={(event) => setWeather(event.target.value)}
          />
          stormy
          <input
            type="radio"
            value="stormy"
            checked={weather === 'stormy'}
            onChange={(event) => setWeather(event.target.value)}
          />
          windy
          <input
            type="radio"
            value="windy"
            checked={weather === 'windy'}
            onChange={(event) => setWeather(event.target.value)}
          />
        </div>
        <div>
          Comment:{' '}
          <input
            type="text"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};
export default NewEntry;
