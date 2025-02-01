import { Link, useParams } from "react-router-dom";
import { ElectricityEntry } from "../data/ElectricityEntry";
import { useEffect, useState } from "react";
import { CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const DayView = () => {
    const { date = "test" } = useParams<{ date: string }>();
    const [entries, setEntries] = useState<ElectricityEntry[]>([]);
    useEffect(() => {
    fetchData(date).then((data) => 
        setEntries(data));
    }, []);
    if (entries.length === 0) {
        return(
            <div>
                <Link to={`/`}>Back to daily table</Link>
                <p>Just a moment, fetching data...</p>
            </div>
        )
    }

    entries.sort((a, b) => a.id - b.id)

    let maxAx = 0;
    let minAx = 0;
    let average = 0;

    for (const entry of entries) {
        if (entry.hourlyprice) {
            if (Number(entry.hourlyprice) > maxAx) {
                maxAx = entry.hourlyprice;
            } else if (Number(entry.hourlyprice)< minAx) {
                minAx = entry.hourlyprice;
            }
            average = (average + entry.hourlyprice)/2
        }
    }

    return(
        <div>
            <header className="mainheader">Electricity Statistics of {date}</header>
                <div className="chart">
                <header className="chartTitle">Price of electricity by hour</header>
                <ResponsiveContainer width="100%" height={400}>
                    <ComposedChart data={entries} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>  
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
                <Link to={`/`} className="navLink">Back to daily table</Link>
        </div>
    )
}

async function fetchData(date: string): Promise<ElectricityEntry[]> {
  const response = await fetch(`http://localhost:3003/electricity/dates/${date}`);
  const data = await response.json();
  return data;
}

export default DayView;