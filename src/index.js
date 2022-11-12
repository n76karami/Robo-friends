import React from 'react';
import ReactDom from 'react-dom';
// import arr from "./db";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from './App';
import About from "./pages/About";
import './index.css';

const root = ReactDom.createRoot(document.getElementById("root"));

// ReactDom.render(<App /> , document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="/about/:id" element={<About />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);