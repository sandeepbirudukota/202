import './App.css';
import React from "react";

// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
import { Link, Routes, Route, Navigate,Router } from 'react-router-dom';

import { SignIn } from "./pages/SignIn";
import { ViewArrival } from "./pages/ViewArrival";
import { ViewDeparture} from "./pages/ViewDeparture";

import { HomePage } from "./pages/HomePage";
import { AirlinesPage } from './pages/AirlinesPage';
import { Airport } from "./pages/Airport";

// import { NotFound } from "./pages/NotFound";
// import ProtectedRoutes from "./common/ProtectedRoutes";
function App() {

  return (
    // <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" exact element={<SignIn />} />
        <Route path="/airlines" element={<AirlinesPage/>} />
        <Route path="/airport" element={<Airport/>} />
      </Routes>
    // </Router>
  );
}

export default App;