import React, { useEffect, useState } from 'react';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import './App.css';
import DailyTable from './view/DailyTable';
import DayView from './view/DayView';
import { getStoredDailyInfo, setStoredDailyInfo, DailyInfo } from './data/DailyInfo';

function App() {
  const [entries, setEntries] = useState<DailyInfo[]>(getStoredDailyInfo());
  useEffect(() => {
    fetchData().then((data) => 
      setEntries(data));
  }, []);

  if (entries.length > 0) {
    setStoredDailyInfo(entries);
  }
  
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/:date" element={<DayView />} />   
            <Route path="/" element={<DailyTable />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

async function fetchData(): Promise<DailyInfo[]> {
  try {
    const response = await fetch('http://localhost:3003/electricity/dailyinfo');
    const data = await response.json();
    return data;
  } catch (e) {
    console.log('error while fetching data', e)
  }
  return [];
}

export default App;
