import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [keyword, setKeyword] = useState('');
  const [place, setPlace] = useState('');
  const [limit, setLimit] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!keyword || !place || !limit) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword, location: place, limit }),
      });

      const data = await response.json();
      if (data.success) {
        setResults(data.data.slice(0, parseInt(limit)));
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      alert('Error fetching results');
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = (data) => {
    const headers = ['School Name', 'Address', 'Phone Number', 'Opening Hours'];
    const rows = data.map((item) => [
      item.title || '',
      item.address || '',
      item.phone || '',
      item.hours
        ? Object.entries(item.hours).map(([day, time]) => `${day}: ${time}`).join('; ')
        : ''
    ]);

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += headers.join(',') + '\n';
    rows.forEach(row => {
      csvContent += row.join(',') + '\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'results.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dashboard-wrapper bg-light py-5 px-3">
      <h4 className="mb-4 text-center">Search Businesses</h4>
      
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Keyword (e.g. cafe, school)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Place (e.g. Hyderabad)"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="number"
          className="form-control"
          placeholder="No. of results"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
        />
      </div>
      <button
        className="btn btn-primary w-100 mb-4"
        onClick={handleSearch}
        disabled={loading}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>

      {/* JSON Results */}
      {results.length > 0 && (
        <>
          <h5>Filtered Results (JSON View):</h5>
          <pre className="data-display" style={{ maxHeight: '500px', overflowY: 'scroll', background: '#f1f1f1', padding: '1rem' }}>
            {JSON.stringify(
              results.map((item) => ({
                name: item.title || 'N/A',
                address: item.address || 'N/A',
                phone: item.phone || 'N/A',
                opening_hours: item.hours
                  ? Object.entries(item.hours).map(([day, time]) => `${day}: ${time}`).join(', ')
                  : 'N/A',
              })),
              null,
              2
            )}
          </pre>

          <button className="btn btn-success mt-3" onClick={() => downloadCSV(results)}>
            Download CSV
          </button>
        </>
      )}
    </div>
  );
};

export default Dashboard;
