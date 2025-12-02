import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Dòng này QUAN TRỌNG NHẤT để nạp Tailwind
import App from './App';
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Bọc App trong AuthProvider nếu chưa có trong App.js, 
        nhưng trong code App.js của bạn đã có AuthProvider rồi nên ở đây chỉ cần App */}
    <App />
  </React.StrictMode>
);