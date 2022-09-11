import React from 'react';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App