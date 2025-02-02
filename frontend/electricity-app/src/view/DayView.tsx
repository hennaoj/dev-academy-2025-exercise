import { Link, useParams } from "react-router-dom";
import { ElectricityEntry } from "../data/ElectricityEntry";
import React, { useEffect, useState } from "react";
import { CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { findMinMaxPrices } from "../util/FrontCalculator";
import { DailyInfo, getStoredDailyInfo } from "../data/DailyInfo";

const DayView = () => {
    const { date = "test" } = useParams<{ date: string }>();
    const [entriesOfDate, setEntries] = useState<ElectricityEntry[]>([]);
    const storedDailyInfo = getStoredDailyInfo();

    useEffect(() => {
        fetchData(date).then((data) => 
            setEntries(data));
    }, []);

    if (entriesOfDate.length === 0) {
        return(
            <div>
                <header className="mainheader">Electricity Statistics of {date}</header>
                <Link to={`/`}>Back to daily table</Link>
                <p>Just a moment, fetching data...</p>
            </div>
        )
    }

    let dailyInfo;
    if (storedDailyInfo.length > 0) {
        dailyInfo = storedDailyInfo.find((item) => item.date.toString().slice(0,10) === date);
    }

    entriesOfDate.sort((a, b) => a.id - b.id);

    const [ minAx, maxAx ] = findMinMaxPrices(entriesOfDate);
    return(
        <div>
            <header className="mainheader">Electricity Statistics of {date}</header>
                <div className="chart">
                <header className="chartTitle">Price of electricity by hour</header>
                <ResponsiveContainer width="100%" height={400}>
                    <ComposedChart data={entriesOfDate} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>  
                        <XAxis dataKey="starttime" />
                        <YAxis yAxisId={1} type="number" domain={[Number(minAx), Number(maxAx)]} tickCount={8}/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Legend/>
                        <Line
                            yAxisId={1}
                            strokeWidth={2}
                            type="monotone"
                            dataKey="hourlyprice"
                            name="Price (c/kWh)"
                        />
                    </ComposedChart>
                    </ResponsiveContainer>
                </div>
                <div>
                    {dailyInfo.average ? (
                        <p>Average electricity price: {dailyInfo.average} c/kWh</p>
                    ) : (
                        <p>Average price is not available</p>
                    )}
                    {dailyInfo.production ? (
                        <p>Total production: {dailyInfo.production} MWh</p>
                    ) : (
                        <p>Total production is not available</p>
                    )}
                    {dailyInfo.consumption ? (
                        <p>Total consumption: {dailyInfo.consumption} MWh</p>
                    ) : (
                        <p>Total consumption is not available</p>
                    )}
                </div>
                <Link to={`/`} className="navLink">Back to daily table</Link>
        </div>
    )
}

async function fetchData(date: string): Promise<ElectricityEntry[]> {
  try {
    const response = await fetch(`http://localhost:3003/electricity/dates/${date}`);
    const data = await response.json();
    return data;
  } catch (e) {
    console.log('error while fetching data', e)
  }
  return [];
}

export default DayView;