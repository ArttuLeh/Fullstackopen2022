import { useState, useEffect } from 'react';
import { FlightDiary } from './types';
import { getDiaries } from './diaryService';
import DiaryEntries from './components/DiaryEntries';
import NewEntry from './components/NewEntry';

const App = () => {
  const [diaries, setDiaries] = useState<FlightDiary[]>([]);

  useEffect(() => {
    getDiaries().then((data) => {
      setDiaries(data);
    });
  }, [diaries]);

  return (
    <div>
      <NewEntry diaries={diaries} />
      <DiaryEntries diaries={diaries} />
    </div>
  );
};

export default App;
