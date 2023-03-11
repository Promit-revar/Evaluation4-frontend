import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import { LOGIN_ROUTE, HOME_ROUTE } from './constants/routes';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
         
            <Route path={HOME_ROUTE} element={<HomePage />} />
          
          <Route path={LOGIN_ROUTE} element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
