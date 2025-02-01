import React, { useEffect, useState } from 'react';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import './App.css';
import DailyTable from './view/DailyTable';
import DayView from './view/DayView';
import { ElectricityEntry } from './data/ElectricityEntry';
import { setGlobalEntries } from './data/Entries';

function App() {
  const [entries, setEntries] = useState<ElectricityEntry[]>([]);
  useEffect(() => {
    fetchData().then((data) => 
      setEntries(data));
  }, []);

  if (entries.length > 0) {
    setGlobalEntries(entries);
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

async function fetchData(): Promise<ElectricityEntry[]> {
  const response = await fetch('http://localhost:3003/electricity');
  const data = await response.json();
  return data;
}

export default App;
