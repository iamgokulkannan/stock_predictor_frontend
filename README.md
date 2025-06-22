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
│   ├── App.jsx                   --> Main app logic and routing
│   └── index.jsx                 --> React DOM render
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

MIT License

Copyright (c) 2025 Gokul Kannan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
