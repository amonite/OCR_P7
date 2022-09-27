import React from 'react';
import ReactDOM from 'react-dom/client';
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import './index.css';
import App from "./app.js"



// import Home from './pages/Home/home';
// import SignIn from "./pages/SignIn/signIn";
// import SignUp from './pages/SignUp/signUp';
// import Error from './components/Error/error';
// import Header from './components/Header/header';





const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
    {/* <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signIn" element={<SignIn />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </Router> */}
  </React.StrictMode>
);


