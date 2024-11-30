import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SmallMap from "./Map";

const Item = () => {
    const [item, setItem] = useState(null); 
    const [loading, setLoading] = useState(true);
    const { id } = useParams(); 

    useEffect(() => {
        const getItem = async () => {
            try {
                const response = await fetch(`https://polyfinder-api-htfsexgcfde6dwby.westus3-01.azurewebsites.net/items/${id}`);
                if (!response.ok) {
                    throw new Error(`Error fetching item: status ${response.status}`);
                }
                const fetchedItem = await response.json();
                setItem(fetchedItem);
                setLoading(false); 
            } catch (error) {
                console.error("Error fetching item:", error);
                setLoading(false); 
            }
        };
        getItem();
    }, [id]);

    const back = () => {
        window.location.href = "/home";
    };

    if (loading) {
        return <div>Loading item details...</div>;
    }

    if (!item) {
        return <div>Item not found.</div>; 
    }

    return (
        <div style={styles.container}>
            <div style={styles.fixedHeader}>
                <button style={styles.addButton} onClick={back}>{"\u2190"}</button>
                <h1 style={styles.title}>POLYFINDER</h1>
                <img src="polyfinder.png" style={styles.profileImage} />
            </div>
            <div style={styles.grid}>
                <div key={item._id || item.Item}>
                <h2 style={styles.cardTitle}>{item.Item}</h2>
                  {item.Image ? (<img src={item.Image} alt={item.Item} style={styles.image} />) : 
              (<div style={styles.imagePlaceholder}>
                <div>No Image Available</div>
                </div>)}
                    <div style={styles.info}>
                        <p style={styles.Category}>Status: {item.Status}</p>
                        <p style={styles.date}>Date: {item.Date}</p>
                        <p style={styles.category}>Category: {item.Category}</p>
                        <p style={styles.location}>📍 {item.Location}</p>
                        <SmallMap lat={item.Lat} lng={item.Lng} />
                    </div>
                </div>
            </div>
            <button>Claim This Item</button>
        </div>
    );
};


    const styles = {
      container: {
        maxWidth: "800px", // Slightly smaller container for a compact layout
      margin: "40px auto",
      padding: "20px",
      textAlign: "center",
      paddingTop: "100px", // Ensures space below the fixed header
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
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
        fontSize: "50px", // Adjust size of arrow sign
        color: "#fff", // White color for the plus sign
        backgroundColor: "transparent", // No background color
        border: "none", // Remove any borders
        cursor: "pointer",
        padding: "0", // No padding around the plus sign
      },
      card: {
        border: "10px solid black",
        borderRadius: "0", // Remove rounded corners
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        // backgroundColor: "#ffffff",
        // overflow: "hidden",
        transition: "transform 0.2s ease",
        padding: "100px",
        textAlign: "left",
      },
      imagePlaceholder: {
        width: "100%",
        height: "300px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e0e0e0",
        borderRadius: "10px", // Slightly rounded corners
        marginBottom: "20px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Add subtle shadow for depth
      },
      image: {
        maxWidth: "100%", // Ensure image fits within its container
        height: "auto", // Maintain aspect ratio
        borderRadius: "10px", // Add a consistent border radius
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Add shadow for depth
      },
      info: {
        textAlign: "left", // Align content to the left for better readability
        width: "100%",
        marginTop: "20px",
        padding: "20px",
        border: "1px solid #ddd", // Add subtle border
        borderRadius: "10px", // Match card style
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)", // Add shadow for depth
        backgroundColor: "#ffffff", // White background for clarity
      },
      cardTitle: {
        color: "#1e4d2b",
        fontSize: "36px",
        fontWeight: "500",
        marginRight: "5px",
      },
      location: {
        fontSize: "24px",
        color: "#555",
      },
    };


export default Item;