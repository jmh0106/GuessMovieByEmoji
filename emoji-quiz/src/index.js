import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css'; // App.css를 여기서 불러옵니다.
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);