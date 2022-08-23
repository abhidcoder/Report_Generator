import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Client/App';
import Populate from './Client/populate';
import reportWebVitals from './reportWebVitals';
import {Routes,Route,BrowserRouter} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
    <Route index element={<App/>} />
    <Route path="/get" element={<Populate/>} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
