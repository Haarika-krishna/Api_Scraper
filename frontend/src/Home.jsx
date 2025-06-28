// src/Home.jsx
import {React,useState} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './Register';
import Login from './Login';
import { Link } from 'react-router-dom';
import './Home.css';
function Home() {
    

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }} className="bg-light">
      {/* Navbar */}
     

      {/* Main Section Full Height Below Navbar */}
      <div
        className="d-flex justify-content-center align-items-center text-center"
        style={{ height: 'calc(100vh - 80px)' }} 
      >
        <div>
          <h1 className="display-3 fw-bold ">Welcome to API Scraper</h1>
          <p className="lead fs-4 text-muted">Scrape public data easily with one click!</p>
        </div>
      </div>

      
    </div>
  );
}

export default Home;
