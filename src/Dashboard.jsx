// src/Dashboard.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import './Dashboard.css';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid
} from 'recharts';

const Dashboard = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [search, setSearch] = useState('');
  const [accuracy, setAccuracy] = useState(0);
  const [buyAccuracy, setBuyAccuracy] = useState(0);
  const [sellAccuracy, setSellAccuracy] = useState(0);

  useEffect(() => {
    const fetchLogs = async () => {
      const colRef = collection(db, 'predictions');
      const snapshot = await getDocs(colRef);
      const data = snapshot.docs.map(doc => doc.data());
      setLogs(data);
      setFilteredLogs(data);
      computeAccuracy(data);
    };
    fetchLogs();
  }, []);

  useEffect(() => {
    const filtered = logs.filter(log =>
      log.symbol.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredLogs(filtered);
  }, [search, logs]);

  const computeAccuracy = (data) => {
    let correct = 0, total = 0;
    let buyCorrect = 0, buyTotal = 0;
    let sellCorrect = 0, sellTotal = 0;

    data.forEach(log => {
      const actual = log.current_price;
      const predicted = log.prediction;

      const directionMatch =
        (predicted > actual && log.recommendation === "BUY") ||
        (predicted < actual && log.recommendation === "SELL") ||
        (Math.abs(predicted - actual) < 1 && log.recommendation === "HOLD");

      if (directionMatch) correct++;
      total++;

      if (log.recommendation === "BUY") {
        buyTotal++;
        if (predicted > actual) buyCorrect++;
      }

      if (log.recommendation === "SELL") {
        sellTotal++;
        if (predicted < actual) sellCorrect++;
      }
    });

    setAccuracy(((correct / total) * 100).toFixed(2));
    setBuyAccuracy(((buyCorrect / buyTotal) * 100 || 0).toFixed(2));
    setSellAccuracy(((sellCorrect / sellTotal) * 100 || 0).toFixed(2));
  };

  const chartData = [
    { name: 'Total Accuracy', Accuracy: +accuracy },
    { name: 'BUY Accuracy', Accuracy: +buyAccuracy },
    { name: 'SELL Accuracy', Accuracy: +sellAccuracy },
  ];

  return (
    <div className="dashboard-container">
      <h2>📊 Prediction Dashboard</h2>

      <input
        type="text"
        placeholder="🔍 Search by symbol"
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="accuracy-summary">
        <h3>📈 Accuracy Overview</h3>
        <ul>
          <li>✅ Total Accuracy: {accuracy}%</li>
          <li>📈 BUY Accuracy: {buyAccuracy}%</li>
          <li>📉 SELL Accuracy: {sellAccuracy}%</li>
        </ul>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Accuracy" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="table-wrapper">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>🕒 Timestamp</th>
              <th>Symbol</th>
              <th>Predicted</th>
              <th>Current</th>
              <th>Confidence</th>
              <th>Sentiment</th>
              <th>Reco</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log, idx) => (
              <tr key={idx}>
                <td>{new Date(log.timestamp).toLocaleString()}</td>
                <td>{log.symbol}</td>
                <td>₹{log.prediction}</td>
                <td>₹{log.current_price}</td>
                <td>{(log.confidence * 100).toFixed(2)}%</td>
                <td>{log.sentiment}</td>
                <td>{log.recommendation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;