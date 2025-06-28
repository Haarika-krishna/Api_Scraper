import React, { useState } from 'react';
import './Dashboard.css'; // custom styles

const Dashboard = () => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    alert(`You searched for: ${query}`);
  };

  return (
    <div className="dashboard-wrapper bg-light">
      <div className="container-fluid py-5">
        <h2 className="text-center mb-5">Welcome to the Dashboard</h2>
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter your search term..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="btn btn-primary" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
