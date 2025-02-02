import { Link } from "react-router-dom";
import { sortDataByValue } from "../util/Sorter";
import { useEffect, useState } from "react";
import { DailyInfo, getStoredDailyInfo } from "../data/DailyInfo";

const DailyTable = () => {
    const storedEntries = getStoredDailyInfo();
    const [state, setState] = useState(storedEntries)
    if (storedEntries.length > 0 && state.length === 0) {
      setState(storedEntries);
    }

    const sortTable = (sorter: string) => {
      const sortedList = sortDataByValue([...state], sorter);
      setState(sortedList);
    }

    useEffect(() => {
      console.log("setting state");
    }, [state]);

    if (state.length === 0) {
      return (
        <div className="App">
          <header className="mainheader">Daily Electricity Information</header>
          <p>Fetching electricity data...</p>
        </div>
      )
    }

    return (
      <div className="App">
        <header className="mainheader">Daily Electricity Information</header>
        <div className="instruction">
          <p>The table below provides information on electricity production, consumption and hourly spot prices in Finland over the years.</p>
          <h4>Here are some instructions to guide you:</h4>
          <p>To sort the table: Click on any column header</p>
          <p>To enter a day view: Click on any date</p>
        </div>
        <table data-testid="maintable">
          <thead>
            <tr className="columnHeader">
              <th className="columnHeader" onClick={() => sortTable("date")}>Date (YYYY-MM-DD)</th>
              <th className="columnHeader" onClick={() => sortTable("consumption")}>Total Consumption (GWh)</th>
              <th className="columnHeader" onClick={() => sortTable("production")}>Total Production (GWh)</th>
              <th className="columnHeader" onClick={() => sortTable("average")}>Average Hourly Price (c/kWh)</th>
              <th className="columnHeader" onClick={() => sortTable("consecutivenegatives")}>Maximum of Consecutive Negative Price Hours</th>
            </tr>
            </thead>
            <tbody>
            {Object.values(state).map((item: DailyInfo) => (
              <tr>
                <th>
                <Link to={`/${item.date.toString().slice(0,10)}`}>{item.date.toString().slice(0,10)}</Link>
                  </th>
                <th className="consumptioncell">{item.consumption}</th>
                <th>{item.production}</th>
                <th>{item.average}</th>
                <th>{item.consecutivenegatives}</th>
              </tr>
            ))}
          </tbody>
        </table>
        <br></br>
      </div>
    );
};

export default DailyTable;