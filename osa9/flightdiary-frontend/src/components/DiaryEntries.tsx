import { FlightDiary } from '../types';

interface Props {
  diaries: FlightDiary[];
}

const DiaryEntries = ({ diaries }: Props) => {
  return (
    <div>
      <h2>Diary entries</h2>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <strong>{diary.date}</strong>
          <br></br>
          weather: {diary.weather}
          <br></br>
          visibility: {diary.visibility}
          <br></br>
          {diary.comment}
          <br></br>
          <br></br>
        </div>
      ))}
    </div>
  );
};
export default DiaryEntries;
