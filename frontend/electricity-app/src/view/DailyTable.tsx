import { calculateDailyInfromation } from "../util/Calculator";
import { Link } from "react-router-dom";
import { getGlobalEntries, setGlobalEntries } from "../data/Entries";
import { DailyInfo } from "../data/DailyInfo";
import { sortDataByValue } from "../util/Sorter";
import { useEffect, useState } from "react";

const DailyTable = () => {
    const storedEntries = getGlobalEntries();
    storedEntries.sort((a, b) => a.id - b.id)

    var initialList: Array<DailyInfo> = []
    var [state, setState] = useState(initialList)
    if (storedEntries.length > 0 && state.length === 0) {
      initialList = calculateDailyInfromation(storedEntries);
      setState(initialList);
    };

    const sortTable = (sorter: string) => {
      const sortedList = sortDataByValue([...state], sorter);
      console.log(sortedList[0]);
      setState(sortedList);
      console.log(state[0]);
    }

    useEffect(() => {
      document.title = `You clicked ${state} times`;
    }, [state]);

    return (
      <div className="App">
        <p></p>
        <header>Daily Electricity Information</header>
        <table>
          <thead>
            <tr className="columnHeader">
              <th className="columnHeader" onClick={() => sortTable("date")}>Date (YYYY-MM-DD)</th>
              <th className="columnHeader" onClick={() => sortTable("consumption")}>Total Consumption (GWh)</th>
              <th className="columnHeader" onClick={() => sortTable("production")}>Total Production (GWh)</th>
              <th className="columnHeader" onClick={() => sortTable("average")}>Average Hourly Price (c/kWh)</th>
              <th className="columnHeader" onClick={() => sortTable("consecutivenegatives")}>Max Consecutive Negative Price Hours</th>
            </tr>
            </thead>
            <tbody>
            {Object.values(state).map((item: DailyInfo) => (
              <tr>
                <th>
                <Link to={`/${item.date.toString().slice(0,16)}`}>{item.date.toString().slice(0,16)}</Link>
                  </th>
                <th>{item.consumption}</th>
                <th>{item.production}</th>
                <th>{item.average}</th>
                <th>{item.consecutivenegatives}</th>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
    );
};

export default DailyTable;