import React, { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [materialType, setMaterialType] = useState('both');
  const [building, setBuilding] = useState('0/Piki/');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002';
      const response = await fetch(
        `${API_URL}/search?query=${encodeURIComponent(query)}&material_type=${materialType}&building=${encodeURIComponent(building)}`
      );
      const data = await response.json();
      setResults(data.records || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ 
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto',
      backgroundColor: '#1e1e1e',
      color: '#e0e0e0',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <header style={{ 
        backgroundColor: '#2a2f2a',
        color: '#a8ff60',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h1 style={{ 
            margin: 0, 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px' 
          }}>
            <img 
              src="/logo.png"
              alt="Library logo"
              style={{ width: '40px', height: '40px' }}
            />
            Finna API demo for Lennu Reads library assistant
        </h1>

      </header>

      {/* Search Form */}
      <form onSubmit={handleSearch} style={{ 
        backgroundColor: '#2b2b2b',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.6)'
      }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Search Term:
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              required
              style={{ 
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #444',
                backgroundColor: '#1c1c1c',
                color: '#d0ffd0',
                marginTop: '5px'
              }}
            />
          </label>
        </div>

        <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Material Type:
              <select
                value={materialType}
                onChange={(e) => setMaterialType(e.target.value)}
                style={{ 
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #444',
                  backgroundColor: '#1c1c1c',
                  color: '#d0ffd0',
                  marginTop: '5px'
                }}
              >
                <option value="both">Both</option>
                <option value="book">Book</option>
                <option value="audiobook">Audiobook</option>
              </select>
            </label>
          </div>

          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Building:
              <select
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
                style={{ 
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #444',
                  backgroundColor: '#1c1c1c',
                  color: '#d0ffd0',
                  marginTop: '5px'
                }}
              >
                <option value="0/Piki/">PIKI</option>
                <option value="0/TUNI/">TUNI</option>
                <option value="0/Helmet/">Helmet kirjastot</option>
              </select>
            </label>
          </div>
        </div>

        <button
          type="submit"
          style={{ 
            backgroundColor: '#3c6e47',
            color: '#e0ffe0',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#2d5b37'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#3c6e47'}
        >
          Search
        </button>
      </form>

      {/* Results Section */}
      <div>
        <h2 style={{ color: '#a8ff60' }}>🔍 Results:</h2>
        {results.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {results.map((item, index) => (
              <li
                key={item.id}
                style={{ 
                  backgroundColor: index % 2 === 0 ? '#2a2a2a' : '#242424',
                  border: '1px solid #333',
                  borderRadius: '8px',
                  padding: '15px',
                  marginBottom: '10px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.4)'
                }}
              >
                <h3 style={{ color: '#a8ff60', marginBottom: '10px' }}>{item.title}</h3>
                
                <div style={{ 
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '20px',
                  marginBottom: '10px'
                }}>
                  <div><strong>📅 Year:</strong> {item.year || 'N/A'}</div>
                  <div><strong>🗣️ Languages:</strong> {item.languages?.join(', ') || 'N/A'}</div>
                </div>

                <div style={{ marginBottom: '10px' }}>
                  <strong>🏛️ Buildings:</strong> 
                  {item.buildings
                  ?.filter(b => isNaN(Number(b.translated || b.value))) // Remove purely numeric entries
                    .map((b) => (
                      <span 
                        key={b.value}
                        style={{ 
                          display: 'inline-block',
                          backgroundColor: '#264d3c',
                          color: '#a8ff60',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          margin: '2px',
                          fontSize: '0.9em'
                        }}
                      >
                        {b.translated || b.value}
                      </span>
                  ))}
                </div>

                <div style={{ marginBottom: '10px' }}>
                  <strong>📦 Formats:</strong> 
                  {[...new Set(item.formats?.map(f => f.translated || f.value))].map((format, i) => (
                    <span 
                      key={format}
                      style={{ 
                        display: 'inline-block',
                        backgroundColor: '#1e2e1e',
                        color: '#a8d5a2',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        margin: '2px',
                        fontSize: '0.9em'
                      }}
                    >
                      {format}
                    </span>
                  ))}
                </div>


                <div>
                  <strong>✍️ Authors:</strong> 
                  {item.nonPresenterAuthors?.length > 0 ?
                    item.nonPresenterAuthors.map((a) => (
                      <span 
                        key={a.name}
                        style={{ 
                          display: 'inline-block',
                          backgroundColor: '#4e5134',
                          color: '#fff7d6',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          margin: '2px',
                          fontSize: '0.9em'
                        }}
                      >
                        {a.name}{a.role ? ` (${a.role})` : ''}
                      </span>
                    )) : 'N/A'
                  }
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ 
            fontStyle: 'italic',
            color: '#888',
            textAlign: 'center',
            padding: '20px'
          }}>
            No results found. Try adjusting your search criteria.
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
