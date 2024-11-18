import React, { useState } from "react";

const CreateItem = () => {
  const [formData, setFormData] = useState({
    item: "",
    category: "",
    location: "",
    date: "",
    lat: "",
    lng: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error creating item: ${response.status}`);
      }
      alert("Item created successfully!");
      window.location.href = "/home";
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
        <h2 style={styles.formTitle}>Create a New Item</h2>
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
          required
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
        <input
          type="text"
          name="lat"
          placeholder="Latitude"
          value={formData.lat}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="lng"
          placeholder="Longitude"
          value={formData.lng}
          onChange={handleChange}
          style={styles.input}
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
    width: "100%",
    padding: "10px",
    backgroundColor: "#1e4d2b",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "18px",
    cursor: "pointer",
  },
};

export default CreateItem;