import { useState } from 'react'
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Price from './Price';
import Login from './Login';
import Register from './Register';
import './App.css'
import webScraperLogo from './Assets/webScraper2-remove.png';

function App() {
 const [showRegister, setShowRegister] = useState(false);
    const [showRegisterSuccess, setShowRegisterSuccess] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showLoginSuccess, setShowLoginSuccess] = useState(false);

  return (
    <>
    <div className="bg-light" style={{ minHeight: '100vh' }}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-5 py-2 shadow w-100" id='navbar-main'>
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img
              src={webScraperLogo}
              alt="Logo"
              width="100"
              height="90"
              className="d-inline-block me-2"
          />
          <span className="fw-bold fs-4">API Scraper</span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul className="navbar-nav ms-5 gap-4">
            <li className="nav-item">
              <a className="nav-link active fs-5" href="/">Home</a>
            </li>
            <li className="nav-item">
              <Link className="nav-link fs-5" to="/pricing">Pricing</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link fs-5" href="/features">Features</a>
            </li>
          </ul>

          <div className="d-flex gap-3">
            <button onClick={() => setShowLogin(true)} className="btn btn-outline-light px-4 fw-semibold">
              Login
            </button>
            <button onClick={() => setShowRegister(true)} className="btn btn-success px-4 fw-semibold">
               Register
            </button>
          </div>
        </div>
      </nav>
    
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Price />} />
        </Routes>
     
     {showRegister && (
  <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={() => setShowRegister(false)}>
    <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
      <div className="modal-content p-4">
        <div className="modal-header">
          <h5 className="modal-title">Register</h5>
          <button type="button" className="btn-close" onClick={() => setShowRegister(false)}></button>
        </div>
        <div className="modal-body">
          <Register onSuccess={() => {
            setShowRegister(false);
             setShowRegisterSuccess(true);
             setTimeout(() => setShowRegisterSuccess(false), 3000);
        }} />

        </div>
      </div>
     </div>
   </div>
  )}
   {showLogin && (
  <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={() => setShowLogin(false)}>
    <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
      <div className="modal-content p-4">
        <div className="modal-header">
          <h5 className="modal-title">Login</h5>
          <button type="button" className="btn-close" onClick={() => setShowLogin(false)}></button>
        </div>
        <div className="modal-body">
          <Login onSuccess={() => {
            setShowLogin(false);
            setShowLoginSuccess(true);
            setTimeout(() => setShowLoginSuccess(false), 3000);
          }} />
        </div>
      </div>
     </div>
    </div>
  )}
   
  {showLoginSuccess && (
  <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content text-center p-4">
        <div className="text-success mb-3">
          <i className="bi bi-check-circle-fill" style={{ fontSize: '3rem' }}></i>
        </div>
        <h5 className="text-success">Login successful!</h5>
      </div>
     </div>
    </div>
  )}

{/* ✅ Add this below */}
{showRegisterSuccess && (
  <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content text-center p-4">
        <div className="text-success mb-3">
          <i className="bi bi-check-circle-fill" style={{ fontSize: '3rem' }}></i>
        </div>
        <h5 className="text-success">Registered successfully!</h5>
      </div>
    </div>
  </div>
)}

    </div>
    </>
  )
}

export default App
