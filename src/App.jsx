import React, { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './App.css';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

const App = () => {
  const [prediction, setPrediction] = useState(null);
  const [sentiment, setSentiment] = useState('');
  const [news, setNews] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState('NSE:NIFTY50-INDEX');
  const [socket, setSocket] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [confidence, setConfidence] = useState(null);
  const [recommendation, setRecommendation] = useState('');
  const chartRef = useRef(null);

  const indices = {
    'NIFTY 50': 'NSE:NIFTY50-INDEX',
    'NIFTY BANK': 'NSE:NIFTYBANK-INDEX',
    'NIFTY IT': 'NSE:CNXIT-INDEX',
    'NIFTY FMCG': 'NSE:CNXFMCG-INDEX',
    'NIFTY AUTO': 'NSE:NIFTYAUTO-INDEX',
    'NIFTY METAL': 'NSE:CNXMETAL-INDEX',
    'NIFTY PHARMA': 'NSE:CNXPHARMA-INDEX',
    'NIFTY MEDIA': 'NSE:CNXMEDIA-INDEX',
    'NIFTY ENERGY': 'NSE:CNXENERGY-INDEX',
  };

  const connectWebSocket = () => {
    if (socket) socket.close();
    const newSocket = new WebSocket(`ws://localhost:8000/ws/${selectedSymbol}`);
    setSocket(newSocket);
    setLoading(true);

    newSocket.onopen = () => {
      console.log('✅ Connected to WebSocket');
      setError(null);
    };

    newSocket.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      setConfidence(data.confidence);
      setRecommendation(data.recommendation);
      if (data.predicted_price) {
        const timestamp = new Date().toLocaleString();
        setPrediction(data.predicted_price);
        setSentiment(data.sentiment);
        setNews(data.news || []);
        setHistory((prev) => [...prev.slice(-29), { time: timestamp, value: data.predicted_price }]);
        setLoading(false);

        await addDoc(collection(db, "predictions"), {
          symbol: selectedSymbol,
          prediction: data.predicted_price,
          current_price: data.current_price,
          sentiment: data.sentiment,
          sentiment_score: data.sentiment_score,
          recommendation: data.recommendation,
          confidence: data.confidence,
          timestamp: timestamp,
        });
      } else if (data.error) {
        setError(data.error);
        setPrediction(null);
        setLoading(false);
      }
    };

    newSocket.onerror = () => {
      console.error("WebSocket error. Attempting reconnect...");
      setError("WebSocket error");
      setTimeout(() => connectWebSocket(), 3000);
    };

    newSocket.onclose = () => {
      console.warn('❌ WebSocket closed. Reconnecting...');
      setTimeout(() => connectWebSocket(), 3000);
    };
  };

  useEffect(() => {
    connectWebSocket();
    return () => socket?.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSymbol]);

  const chartData = {
    labels: history.map((h) => h.time),
    datasets: [
      {
        label: `${selectedSymbol} Prediction`,
        data: history.map((h) => h.value),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.1)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const tvSymbol = selectedSymbol.replace('NSE:', 'NSE:');

  return (
    <div className={`container ${darkMode ? 'dark' : ''}`}>
      <div className="topbar">
        <h1>📈 Real-Time Stock Prediction</h1>
        <button onClick={() => setDarkMode(!darkMode)} className="toggle-btn">
          {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <select
        value={selectedSymbol}
        onChange={(e) => setSelectedSymbol(e.target.value)}
        className="dropdown"
      >
        {Object.entries(indices).map(([label, value]) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>

      {loading ? (
        <h2>⏳ Loading prediction...</h2>
      ) : error ? (
        <h2 className="error">❌ Error: {error}</h2>
      ) : (
        <>
          <h2>📊 Predicted Price: ₹ {prediction}</h2>
          <h3>🧠 Sentiment: <span className={`sentiment ${sentiment.toLowerCase()}`}>{sentiment}</span></h3>

          <h3>🎯 Confidence: {(confidence * 100).toFixed(2)}%</h3>
          <h3>📌 Recommendation: <span className={`recommend ${recommendation.toLowerCase()}`}>{recommendation}</span></h3>

          <div className="chart">
            <Line ref={chartRef} data={chartData} />
          </div>

          <div className="tv-container">
            <iframe
              title="candlestick"
              src={`https://s.tradingview.com/embed-widget/mini-symbol-overview/?symbol=${tvSymbol}&locale=en`}
              width="100%"
              height="220"
              frameBorder="0"
              allowTransparency
              scrolling="no"
            ></iframe>
          </div>

          <div className="news">
            <h3>📰 Latest News</h3>
            <ul>
              {news.length > 0 ? (
                news.map((n, idx) => (
                  <li key={idx}>
                    <a href={n.url} target="_blank" rel="noreferrer">
                      {n.title} <br />
                      <i>{n.summary}</i>
                    </a>
                  </li>
                ))
              ) : (
                <p>No recent news found.</p>
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default App;