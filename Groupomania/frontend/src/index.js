import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './index.css';

import Home from './pages/Home/home';
import Profil from "./pages/Profil/profil";
import Error from './components/Error/error';
import Header from './components/Header/header';
//import App from './App';




const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* <div>
      <p>hello react :)</p>
    </div> */}
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/profil" element={<Profil />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </Router>
  </React.StrictMode>
);


