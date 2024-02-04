// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Ensure this is the path to your App component.

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
