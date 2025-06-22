Frontend - Stock Predictor UI (React.js)

This is the frontend for the Stock Predictor project. It communicates with a FastAPI backend to provide real-time stock predictions powered by ML models.

------------------------------------------------------------

🚀 Getting Started

1. Install dependencies:

npm install

2. Start the development server:

npm run dev

(If you're using Create React App, use: npm start)

------------------------------------------------------------

🔗 Backend API Integration

This frontend expects the backend to be running at http://localhost:8000

Create a .env file in the root of your frontend directory with:

REACT_APP_API_BASE_URL=http://localhost:8000

In your code, you can use:

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

------------------------------------------------------------

📁 Project Structure (Example)

.
├── public/
│   └── index.html
├── src/
│   ├── components/              --> Reusable components (e.g., Chart, InputForm)
│   ├── pages/                   --> Page-level components
│   ├── App.js                   --> Main app logic and routing
│   └── index.js                 --> React DOM render
├── .env                         --> Environment config
├── package.json                 --> NPM dependencies
└── README.md

------------------------------------------------------------

✨ Features

- Clean user interface for stock prediction
- Integrated with ML-powered FastAPI backend
- Predictive graphs and real-time feedback
- Axios-based API communication
- Responsive design

------------------------------------------------------------

🛠 Built With

- React.js
- Axios
- TailwindCSS / Bootstrap / Custom CSS
- Chart.js or Recharts (optional for graphs)

------------------------------------------------------------

🌐 Deployment

You can deploy this app to:

- Vercel (simple React deployment)
- Netlify (drag-and-drop or Git integration)
- GitHub Pages (for static builds if using CRA)

To create a production build:

npm run build

------------------------------------------------------------

📜 License

This project is under the MIT License.