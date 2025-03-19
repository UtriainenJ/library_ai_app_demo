import React, { useState } from 'react';

function App() {
  // State variables
  const [query, setQuery] = useState('');
  const [materialType, setMaterialType] = useState('both');
  const [building, setBuilding] = useState('0/Piki/');
  const [results, setResults] = useState([]);

  // Handle form submission
  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://127.0.0.1:5002/search?query=${encodeURIComponent(query)}&material_type=${materialType}&building=${building}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setResults(data.records || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Finna API Demo</h1>

      {/* Search Form */}
      <form onSubmit={handleSearch}>
        <div>
          <label>
            Search Query:
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter search term"
              required
            />
          </label>
        </div>

        <div>
          <label>
            Material Type:
            <select
              value={materialType}
              onChange={(e) => setMaterialType(e.target.value)}
            >
              <option value="both">Both</option>
              <option value="book">Book</option>
              <option value="audiobook">Audiobook</option>
            </select>
          </label>
        </div>

        <div>
          <label>
            Building:
            <select
              value={building}
              onChange={(e) => setBuilding(e.target.value)}
            >
              <option value="0/Piki/">PIKI</option>
              <option value="1/Helsinki/">Helsinki</option>
              <option value="2/Espoo/">Espoo</option>
            </select>
          </label>
        </div>

        <button type="submit">Search</button>
      </form>

      {/* Results Section */}
      <div style={{ marginTop: '20px' }}>
        <h2>Results:</h2>
        {results.length > 0 ? (
          <ul>
            {results.map((item, index) => (
              <li key={index}>
                <strong>{item.title}</strong> - {item.buildings?.join(', ') || 'Unknown Building'}
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
}

export default App;