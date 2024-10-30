// src/Header.jsx
import React from "react";

const Header = () => {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>PolyFinder</h1>
      {/* Additional navigation items can go here */}
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#1e4d2b', // Cal Poly green
    color: '#fff',
    padding: '20px',
    textAlign: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  title: {
    margin: 0,
    fontSize: '24px',
  },
};

export default Header;