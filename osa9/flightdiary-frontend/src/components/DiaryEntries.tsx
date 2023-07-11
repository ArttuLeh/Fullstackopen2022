import { FlightDiary } from '../types';

const DiaryEntries = ({ diaries }: { diaries: FlightDiary[] }) => {
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
