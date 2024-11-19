import {useState, useEffect} from "react";
import SmallMap from './Map'


const HomePage = () => {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'
  };

  useEffect(() =>{
    const getItems = async () => {
      try{
        const response = await fetch("http://localhost:8000/items");
        if (!response.ok) {
          throw new Error(`Error fetching items: status ${response.status}`);
        }
        const data = await response.json();
        setItems(data);
        setLoading(false);
      }catch (error){
        console.error('Error fetching items',error);
        setLoading(false);
      }
    };
    getItems();
  }, []);
  if (loading) {
    return <div>Loading...</div>
  }
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredItems = items.filter(
    (item) =>
      item.Item.toLowerCase().includes(search.toLowerCase()) ||
      item.Location.toLowerCase().includes(search.toLowerCase())||
      item.Category.toLowerCase().includes(search.toLowerCase())||
      item.Date.toLowerCase().includes(search.toLowerCase())
  );

  const handleGridClick = (item) => {
    window.location.href = 'item/' + item._id;
};

  return (
    <div style={styles.container}>
      <div style={styles.fixedHeader}>
        <button style={styles.addButton}>+</button>
        <h1 style={styles.title}>POLYFINDER</h1>
        <img src="polyfinder.png" // Replace with actual user image URL
             style={styles.profileImage}
        />
        <button onClick={handleLogout} style={styles.logoutButton}>Log Out</button>
      </div>
      
      <div style={styles.grid}>
        {filteredItems.map((item) => (
          <button key={item._id || item.Item} onClick={() => handleGridClick(item)}>
            <div style={styles.imagePlaceholder}></div>
            <div style={styles.info}>
              <h2 style={styles.cardTitle}>{item.Item}</h2>
              <p style={styles.date}>Date: {item.Date}</p>
              <p style={styles.category}>Category: {item.Category}</p>
              <p style={styles.location}>📍 {item.Location}</p>
              <SmallMap lat={item.Lat} lng={item.Lng} />
            </div>
          </button>
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
  logoutButton: {
    position: "fixed",      // Fix the position of the button relative to the viewport
    bottom: "20px",         // Position it 20px from the bottom
    right: "20px",          // Position it 20px from the right
    backgroundColor: "#e74c3c", // Red color for logout button
    color: "#fff",          // White text color
    padding: "10px 20px",   // Padding for the button
    border: "none",         // Remove border
    borderRadius: "5px",    // Rounded corners for the button
    cursor: "pointer",      // Cursor pointer for the button
    fontSize: "16px",       // Font size of the button
    zIndex: "1000",         // Ensure it's above other elements
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