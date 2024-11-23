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
  const validateDate = (date) => {
    const datePattern = /^\d{1,2}-\d{1,2}-\d{4}$/; // MM-DD-YYYY pattern
    return datePattern.test(date);
  };
  const validCategories = [
    "Backpacks", "Bikes", "Clothing", "Jewelry", "Keys/Wallet", "Other", "Technology"
  ];

  const validLocations = ["Administration", "Cotchett Education Building", "Business", "Research Development Center",
                "Architecture & Environmental Design", "Christopher Cohan Performing Arts Center",
                "Advanced Technologies Laboratories", "Bioresource and Agricultural Engineering", "Farm Shop",
                "Alan A. Erhart Agriculture", "Agricultural Sciences", "Engineering",
                "Frank E. Pilling Computer Science Building", "Cal Poly Corporation Administration",
                "Beef Unit", "Crop Science", "Dairy Science", "Leprino Foods Dairy Innovation Institute",
                "Dining Complex", "Engineering East", "Engineering West", "English", "Food Processing",
                "Faculty Offices East", "Graphic Arts", "Graphic Arts Modular", "Health Center",
                "Albert B. Smith Alumni and Conference Center", "University Housing",
                "Oppenheimer Family Equine Center", "Clyde P. Fisher Science Hall", "Walter F. Dexter Building",
                "Robert E. Kennedy Library", "University Police", "Mathematics and Science", "Engineering South",
                "Engineering III", "Robert A. Mott Athletics Center", "Recreation Center", "Kinesiology",
                "Alex and Faye Spanos Theater", "H. P. Davidson Music Center", "Crandall Gymnasium & Old Natatorium",
                "Faculty Offices North", "Environmental Horticultural Science", "Mount Bishop Warehouse, Rose Float Lab, Communications Storage",
                "Science", "Science North", "Beef Cattle Evaluation Center", "Swine Unit", "Veterinary Hospital",
                "Welding", "Crandall Gymnasium & Old Natatorium", "Alex G. Spanos Stadium",
                "Julian A. McPhee University Union", "Facilities", "Fleet Services", "Plant Conservatory",
                "Eucalyptus House", "Building 74 Modular Offices", "Environmental Health & Safety",
                "Hillcrest", "Corporation Warehouse", "Technology Park", "Poly Grove Modular Offices",
                "Shasta Hall", "Diablo Hall", "Palomar Hall", "Whitney Hall", "Lassen Hall", "Trinity Hall",
                "Santa Lucia Hall", "Muir Hall", "Sequoia Hall", "Fremont Hall", "Tenaya Hall", "Vista Grande",
                "Sierra Madre Hall", "Yosemite Hall", "Chase Hall", "Jespersen Hall", "Heron Hall",
                "Heron Hall Modular", "Cheda Ranch", "Parker Ranch", "Peterson Ranch", "Student Services",
                "Serrano Ranch", "Chorro Creek Ranch", "Grand Avenue Parking Structure", "Parking Structure",
                "Orfalea Family and ASI Children's Center", "Poultry Science Instructional Center",
                "Animal Nutrition Center", "J & G Lau Family Meat Processing Center", "E. & J. Gallo Winery & Family Building",
                "Lohr Family Winery", "Sports Complex", "Dignity Health Baseball Clubhouse", "Cerro Vista Room Number Map",
                "Cerro Morro", "Cerro Cabrillo", "Cerro Hollister", "Cerro Romauldo", "Cerro Bishop", "Cerro Islay",
                "Cerro San Luis", "Poly Canyon Village Room Number Map", "Aliso", "Buena Vista", "Corralitos",
                "Dover", "Estrella", "Foxen", "Gypsum", "Huasna", "Inyo", "tsɨtkawayu", "elewexe", "tiłhini",
                "tšɨłkukunɨtš", "nipumuʔ", "tsɨtqawɨ", "tsɨtpxatu", "Welcome Center & yakʔitʸutʸu Hall",
                "Warren J. Baker Center for Science and Mathematics", "William and Linda Frost Center for Research and Innovation",
                "Construction Innovations Center", "Simpson Strong-Tie Materials Demonstration Lab",
                "Engineering IV", "Bonderson Engineering Project Center", "Center for Coastal Marine Sciences",
                "Village Drive Parking Structure", "Canyon Circle Parking Structure", "Housing Depot"];



    
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateDate(formData.date)) {
      setError(
        `${formData.date} is not in the proper format. Use MM-DD-YYYY, e.g., 10-31-2024.`
      );
      return;
    }
    if (!validCategories.includes(formData.category)){
      setError(
        `${formData.category} is not a proper category. Valid Categories are Backpacks, Bikes, Clothing, Jewelry, Keys/Wallet, Other, Technology`
      );
      return;
    }
    if (!validLocations.includes(formData.location)){
      setError(
        `${formData.location} is not a valid location. Please refer to https://afd.calpoly.edu/facilities/campus-maps/building-floor-plans/`
      );
      return;
    }
    
    try {

      const response = await fetch('https://polyfinder-api-htfsexgcfde6dwby.westus3-01.azurewebsites.net/create-item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      // Send data to backend
      // const response = await axios.post("https://polyfinder-api-htfsexgcfde6dwby.westus3-01.azurewebsites.net/create-item", formData);

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
          type="text"
          name="date"
          placeholder="Date (MM-DD-YYYY)"
          value={formData.date}
          onChange={handleChange}
          style={styles.input}
          required
        />
       {/* Display error message here */}
      {error && ( <div style={styles.error}>
      <span role="img" aria-label="error">⚠️</span> {error} </div>)}
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

    error: {
      color: "red",
      backgroundColor: "#ffe6e6",
      border: "1px solid red",
      borderRadius: "5px",
      padding: "10px",
      marginTop: "10px",
      fontSize: "14px",
      fontWeight: "bold",
      textAlign: "left",
    },
  };


export default CreateItem;