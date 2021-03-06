import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Collection from './routes/Collection';
import Page404 from './routes/404';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/collections/:collection_address" element={<Collection />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      
    </BrowserRouter>
  </React.StrictMode>
);
