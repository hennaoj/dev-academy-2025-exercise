import { Link, useParams } from "react-router-dom";
import { ElectricityEntry } from "../data/ElectricityEntry";
import React, { useEffect, useState } from "react";
import { 
    Bar,
    CartesianGrid,
    ComposedChart, Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis 
} from "recharts";
import { findMinMaxPrices } from "../util/FrontCalculator";
import { getStoredDailyInfo } from "../data/DailyInfo";

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

    const [ minAx, maxAx ] = findMinMaxPrices(entriesOfDate);
    return(
        <div>
            <header className="mainheader">Electricity Statistics of {date}</header>
                <div className="chart">
                <header className="chartTitle">Price of electricity by hour</header>
                <ResponsiveContainer width="100%" height={400}>
                    <ComposedChart data={entriesOfDate} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>  
                        <XAxis dataKey="starttime" />
                        <YAxis
                            yAxisId={1}
                            type="number"
                            domain={
                                [Math.floor(Number(minAx)),
                                Math.ceil(Number(maxAx))]
                            }
                            tickCount={8}
                        />
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Legend/>
                        <Bar
                            yAxisId={1}
                            dataKey="hourlyprice"
                            name="Price (c/kWh)"
                            fill="#668db1"
                        />
                    </ComposedChart>
                    </ResponsiveContainer>
                </div>
                <div>
                    {dailyInfo.average ? (
                        <p>Average electricity price: {dailyInfo.average.toFixed(2)} c/kWh</p>
                    ) : (
                        <p>Average price is not available</p>
                    )}
                    {dailyInfo.production ? (
                        <p>Total production: {dailyInfo.production.toFixed(1)} GWh</p>
                    ) : (
                        <p>Total production is not available</p>
                    )}
                    {dailyInfo.consumption ? (
                        <p>Total consumption: {dailyInfo.consumption.toFixed(1)} GWh</p>
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