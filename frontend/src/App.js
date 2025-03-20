import React, { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [materialType, setMaterialType] = useState('both');
  const [building, setBuilding] = useState('0/Piki/');
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
    <div style={{ 
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      {/* Header */}
      <header style={{ 
        backgroundColor: '#2c3e50',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h1 style={{ margin: 0 }}>📚 Finna Library Search</h1>
      </header>

      {/* Search Form */}
      <form onSubmit={handleSearch} style={{ 
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
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
                border: '1px solid #ced4da',
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
                  border: '1px solid #ced4da',
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
                  border: '1px solid #ced4da',
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
            backgroundColor: '#3498db',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}
        >
          Search
        </button>
      </form>

      {/* Results Section */}
      <div>
        <h2 style={{ color: '#2c3e50' }}>🔍 Results:</h2>
        {results.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {results.map((item, index) => (
              <li
                key={item.id}
                style={{ 
                  backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white',
                  border: '1px solid #e9ecef',
                  borderRadius: '8px',
                  padding: '15px',
                  marginBottom: '10px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}
              >
                <h3 style={{ 
                  color: '#2c3e50',
                  marginBottom: '10px'
                }}>{item.title}</h3>
                
                <div style={{ 
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '20px',
                  marginBottom: '10px'
                }}>
                  <div>
                    <strong>📅 Year:</strong> {item.year || 'N/A'}
                  </div>
                  <div>
                    <strong>🗣️ Languages:</strong> {item.languages?.join(', ') || 'N/A'}
                  </div>
                </div>

                <div style={{ marginBottom: '10px '}}>
                  <strong>🏛️ Buildings:</strong> 
                  {item.buildings?.length > 0 ? 
                    item.buildings.map((b, i) => (
                      <span 
                        key={b.value}
                        style={{ 
                          display: 'inline-block',
                          backgroundColor: '#e8f4ff',
                          color: '#1a73e8',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          margin: '2px',
                          fontSize: '0.9em'
                        }}
                      >
                        {b.translated || b.value}
                      </span>
                    )) : 'Unknown'}
                </div>

                <div style={{ marginBottom: '10px '}}>
                  <strong>📦 Formats:</strong> 
                  {item.formats?.map((f, i) => (
                    <span 
                      key={f.value}
                      style={{ 
                        display: 'inline-block',
                        backgroundColor: '#e6f3ff',
                        color: '#1a73e8',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        margin: '2px',
                        fontSize: '0.9em'
                      }}
                    >
                      {f.translated || f.value}
                    </span>
                  ))}
                </div>

                <div>
                  <strong>✍️ Authors:</strong> 
                  {item.nonPresenterAuthors?.length > 0 ?
                    item.nonPresenterAuthors.map((a, i) => (
                      <span 
                        key={a.name}
                        style={{ 
                          display: 'inline-block',
                          backgroundColor: '#fff3cd',
                          color: '#664d03',
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
            color: '#6c757d',
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