import { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

function App() {
  const [selectedSymbol, setSelectedSymbol] = useState("NSE:NIFTY50-INDEX");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8000/ws/${selectedSymbol}`);

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setChartData((prev) => [
        ...prev.slice(-19),
        { time: new Date().toLocaleTimeString(), ...data },
      ]);
    };

    return () => ws.close();
  }, [selectedSymbol]);

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>📈 Real-Time Index Predictor</h1>
      <select onChange={(e) => setSelectedSymbol(e.target.value)} value={selectedSymbol}>
        <option value="NSE:NIFTY50-INDEX">NIFTY 50</option>
        <option value="NSE:NIFTYBANK-INDEX">NIFTY BANK</option>
      </select>

      <ResponsiveContainer width="90%" height={400}>
        <LineChart data={chartData}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line dataKey="price" stroke="#8884d8" name="Live Price" />
          <Line dataKey="prediction" stroke="#82ca9d" name="Predicted" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default App;