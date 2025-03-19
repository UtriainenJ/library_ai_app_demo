import React, { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [materialType, setMaterialType] = useState('both');
  const [building, setBuilding] = useState('0/Piki/'); // Added trailing slash
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://127.0.0.1:5002/search?query=${encodeURIComponent(query)}&material_type=${materialType}&building=${encodeURIComponent(building)}`
      );
      const data = await response.json();
      setResults(data.records || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Finna API Demo</h1>
      <form onSubmit={handleSearch}>
        <div>
          <label>
            Search:
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Material Type:
            <select value={materialType} onChange={(e) => setMaterialType(e.target.value)}>
              <option value="both">Both</option>
              <option value="book">Book</option>
              <option value="audiobook">Audiobook</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Building:
            <select value={building} onChange={(e) => setBuilding(e.target.value)}>
              <option value="0/Piki/">PIKI</option>
              <option value="1/Helsinki/">Helsinki</option>
              <option value="2/Espoo/">Espoo</option>
            </select>
          </label>
        </div>
        <button type="submit">Search</button>
      </form>

      <div style={{ marginTop: '20px' }}>
        <h2>Results:</h2>
        {results.length > 0 ? (
          <ul>
            {results.map((item) => (
              <li key={item.id} style={{ 
                border: '1px solid #eee', 
                padding: '15px', 
                margin: '10px 0', 
                borderRadius: '8px' 
              }}>
                <h3>{item.title}</h3>
                <p><strong>Year:</strong> {item.year || 'N/A'}</p>
                
                <p>
                  <strong>Buildings:</strong> 
                  {item.buildings?.length > 0 ? 
                    item.buildings.map((b, i) => (
                      <React.Fragment key={b.value}>
                        {i > 0 && ', '}
                        {b.translated || b.value}
                      </React.Fragment>
                    )) : 'Unknown'}
                </p>

                <p>
                  <strong>Languages:</strong> 
                  {item.languages?.join(', ') || 'N/A'}
                </p>

                <p>
                  <strong>Formats:</strong> 
                  {item.formats?.map((f, i) => (
                    <React.Fragment key={f.value}>
                      {i > 0 && ', '}
                      {f.translated || f.value}
                    </React.Fragment>
                  ))}
                </p>

                <p>
                  <strong>Authors:</strong> 
                  {item.nonPresenterAuthors?.length > 0 ?
                    item.nonPresenterAuthors.map((a, i) => (
                      <React.Fragment key={a.name}>
                        {i > 0 && ', '}
                        {a.name}{a.role ? ` (${a.role})` : ''}
                      </React.Fragment>
                    )) : 'N/A'
                  }
                </p>
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