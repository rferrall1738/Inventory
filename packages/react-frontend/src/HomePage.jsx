import React, { useState } from "react";

const items = [
  { id: 1, title: "Lost Wallet", location: "Library", description: "Black leather wallet" },
  { id: 2, title: "Found Keychain", location: "Dining Hall", description: "Red keychain with keys" },
  { id: 3, title: "Lost Backpack", location: "Engineering Building", description: "Blue backpack with laptop" },
  { id: 4, title: "Found Water Bottle", location: "Gym", description: "Green water bottle with stickers" },
  { id: 5, title: "Lost Headphones", location: "Student Center", description: "Wireless headphones in a black case" },
  { id: 6, title: "Found Sunglasses", location: "Parking Lot C", description: "Black sunglasses with polarized lenses" },
  { id: 7, title: "Lost Notebook", location: "Coffee Shop", description: "Red notebook with math notes" },
  { id: 8, title: "Found Calculator", location: "Math Lab", description: "Graphing calculator with initials" },
];

const HomePage = () => {
  const [search, setSearch] = useState("");

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <div style={styles.fixedHeader}>
        <button style={styles.addButton}>+</button>
        <h1 style={styles.title}>POLYFINDER</h1>
        <img src="https://via.placeholder.com/60" // Replace with actual user image URL
             alt="User Profile"
             style={styles.profileImage}
        />
      </div>
      <div style={styles.grid}>
        {filteredItems.map((item) => (
          <div key={item.id} style={styles.card}>
            <div style={styles.imagePlaceholder}></div>
            <div style={styles.info}>
              <h2 style={styles.cardTitle}>{item.title}</h2>
              <p style={styles.location}>📍 {item.location}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={styles.searchBarContainer}>
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search by category/location"
          style={styles.searchBar}
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "40px auto",
    padding: "20px",
    textAlign: "center",
    paddingTop: "70px", // Ensures space below the fixed header
  },
  fixedHeader: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#1e4d2b", // Cal Poly Green
    padding: "10px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
    zIndex: 1000, // Ensures the header stays on top of other content
  },
  title: {
    color: "#fff", // White text color
    fontSize: "32px",
    fontWeight: "600",
    textAlign: "center",
    flex: 1, // Center title by allowing it to expand
    marginLeft: "-20px", // Adjust for visual centering
  },
  profileImage: {
    width: "60px", // Larger profile image
    height: "60px",
    borderRadius: "50%",
  },
  addButton: {
    fontSize: "70px", // Adjust size of the plus sign
    color: "#fff", // White color for the plus sign
    backgroundColor: "transparent", // No background color
    border: "none", // Remove any borders
    cursor: "pointer",
    padding: "0", // No padding around the plus sign
  },
  grid: {
    display: "grid",
    gap: "20px",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "0", // Remove rounded corners
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
    overflow: "hidden",
    transition: "transform 0.2s ease",
    padding: "10px",
    textAlign: "left",
  },
  imagePlaceholder: {
    width: "100%",
    height: "100px",
    backgroundColor: "#e0e0e0",
    borderRadius: "0", // Remove rounded corners
    marginBottom: "10px",
  },
  info: {
    padding: "10px 0",
  },
  cardTitle: {
    color: "#1e4d2b",
    fontSize: "18px",
    fontWeight: "500",
    marginBottom: "5px",
  },
  location: {
    fontSize: "14px",
    color: "#555",
  },
  searchBarContainer: {
    marginTop: "30px",
  },
  searchBar: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    border: "1px solid #ddd",
    borderRadius: "0", // Remove rounded corners
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
};

export default HomePage;