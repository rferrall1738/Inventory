import React, { useState } from "react";
import axios from "axios"; // Import axios to make HTTP requests


const CreateItem = () => {
  const [formData, setFormData] = useState({
    item: "",
    category: "",
    location: "",
    date: "",
  });

  const [error, setError] = useState(null); // Optional: for error handling


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getCoordinates = async (location) => {
    const enhancedLocation = `${location}, Cal Poly, San Luis Obispo, CA`;
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
          address: enhancedLocation,
          key: "AIzaSyDBMJyGYH7GNDXSJmdzO-kg7-iMHtzJFbE", //need to take this out for testing rn
        },
      });

      if (response.data.status === "OK") {
        const { lat, lng } = response.data.results[0].geometry.location;
        return { lat, lng };
      } else {
        throw new Error("Geocoding API error");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      throw error;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get coordinates for the location
      const coordinates = await getCoordinates(formData.location);

      // Create the item data to send, including coordinates
      const itemWithCoordinates = {
        ...formData,
        Lat: coordinates.lat,
        Lng: coordinates.lng,
      };

      // Send data to backend
      const response = await axios.post("http://localhost:8000/items", itemWithCoordinates);

      if (response.status === 201) {
        alert("Item created successfully!");
        window.location.href = "/home"; // Redirect after successful creation
      } else {
        throw new Error(`Error creating item: ${response.status}`);
      }
    } catch (error) {
      console.error("Error creating item:", error);
      alert("Failed to create item. Please try again.");
    }
  };

  const back = () => {
    window.location.href = "/home";
  };

  return (
    <div style={styles.container}>
      <div style={styles.fixedHeader}>
        <button style={styles.addButton} onClick={back}>
          {"\u2190"}
        </button>
        <h1 style={styles.title}>POLYFINDER</h1>
        <img
          src="polyfinder.png" // Replace with actual user image URL
          style={styles.profileImage}
          alt="Profile"
        />
      </div>

      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.formTitle}>Item Report</h2>
        <input
          type="text"
          name="item"
          placeholder="Item Name"
          value={formData.item}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          style={styles.input}
          
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.submitButton}>
          Create Item
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    textAlign: "center",
    paddingTop: "70px",
  },
  fixedHeader: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#1e4d2b",
    padding: "10px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
  },
  title: {
    color: "#fff",
    fontSize: "32px",
    fontWeight: "600",
    textAlign: "center",
    flex: 1,
  },
  profileImage: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
  },
  addButton: {
    fontSize: "50px",
    color: "#fff",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "0",
  },
  form: {
    marginTop: "20px",
  },
  formTitle: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  submitButton: {
    width: "104%", 
    padding: "10px",
    margin: "10px 0", 
    borderRadius: "5px",
    border: "None", 
    backgroundColor: "#1e4d2b",
    color: "#fff",
    fontSize: "16px", 
    cursor: "pointer",
    boxSizing: "border-box", 
  },
};

export default CreateItem;