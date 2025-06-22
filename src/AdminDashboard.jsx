import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { saveAs } from 'file-saver';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [logs, setLogs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [symbol, setSymbol] = useState('All');

  useEffect(() => {
    fetch('/prediction_log.json')
      .then((res) => res.json())
      .then((data) => {
        const parsed = JSON.parse(data);
        setLogs(parsed);
        setFiltered(parsed);
      });
  }, []);

  const filterBySymbol = (sym) => {
    setSymbol(sym);
    if (sym === 'All') setFiltered(logs);
    else setFiltered(logs.filter((log) => log.symbol === sym));
  };

  const exportToCSV = () => {
    const csv = [
      'Time,Symbol,Prediction,Actual,Recommendation,Sentiment,Confidence',
      ...filtered.map(
        (log) =>
          `${log.timestamp},${log.symbol},${log.predicted_price},${log.current_price},${log.recommendation},${log.sentiment},${log.confidence}`
      ),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'prediction_logs.csv');
  };

  const chartData = {
    labels: filtered.map((log) => new Date(log.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'Predicted Price',
        data: filtered.map((log) => log.predicted_price),
        borderColor: 'green',
        fill: false,
      },
      {
        label: 'Actual Price',
        data: filtered.map((log) => log.current_price),
        borderColor: 'red',
        fill: false,
      },
    ],
  };

  return (
    <div className="admin-container">
      <h1>📊 Admin Dashboard</h1>

      <div className="controls">
        <select value={symbol} onChange={(e) => filterBySymbol(e.target.value)}>
          <option>All</option>
          {[...new Set(logs.map((log) => log.symbol))].map((s, i) => (
            <option key={i}>{s}</option>
          ))}
        </select>

        <button onClick={exportToCSV}>📥 Export to CSV</button>
      </div>

      <Line data={chartData} />

      <div className="log-table">
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Symbol</th>
              <th>Prediction</th>
              <th>Actual</th>
              <th>Sentiment</th>
              <th>Reco</th>
              <th>Conf</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((log, idx) => (
              <tr key={idx}>
                <td>{new Date(log.timestamp).toLocaleString()}</td>
                <td>{log.symbol}</td>
                <td>{log.predicted_price}</td>
                <td>{log.current_price}</td>
                <td>{log.sentiment}</td>
                <td>{log.recommendation}</td>
                <td>{log.confidence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;