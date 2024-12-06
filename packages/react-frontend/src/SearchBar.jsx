import { useState, useEffect } from 'react';

const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const placeholders = [
    'Search by category',
    'Search by date',
    'Search by location',
    'Search by status',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
        setIsFading(false);
      }, 500); // Smooth fade-out duration
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearch(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div style={{ position: 'relative', marginTop: '15px' }}>
      {/* Input Field */}
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="" // Native placeholder removed for custom transition
        style={{
          width: '97.5%',
          padding: '12px',
          fontSize: '20x',
          border: '1px solid #ddd',
          borderRadius: '5px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          backgroundColor: 'transparent', // Transparent for placeholder text overlay
        }}
      />
      {/* Custom Placeholder for Smooth Text Transitions */}
      {!search && (
        <div
          style={{
            position: 'absolute',
            top: '12px', 
            left: '12px', 
            fontSize: '16px',
            color: '#aaa',
            pointerEvents: 'none', 
            transition: 'opacity 0.5s ease', 
            opacity: isFading ? 0 : 1, // Fades in and out smoothly
          }}
        >
          {placeholders[placeholderIndex]}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
