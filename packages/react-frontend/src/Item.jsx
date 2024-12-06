import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SmallMap from "./Map";

const Item = () => {
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [claimed, setClaimed] = useState(false); // Track if the item is claimed
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

    const handleClaim = async () => {
        try {
          const response = await fetch(`https://polyfinder-api-htfsexgcfde6dwby.westus3-01.azurewebsites.net/items/${id}`, {
            method: "DELETE",
          });
          if (!response.ok) {
            throw new Error(`Error deleting item: status ${response.status}`);
          }
          window.alert("Your item is ready for pickup at the ASI desk!");
          setClaimed(true);
          window.location.href = "/home"; // Redirect immediately
        } catch (error) {
          console.error("Error deleting item:", error);
        }
      };
      

    if (loading) {
        return <div>Loading item details...</div>;
    }

    if (!item) {
        return <div>Item not found.</div>;
    }

    if (claimed) {
        return <div style={styles.claimedMessage}>Come to the ASI desk to pick it up!</div>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.fixedHeader}>
                <button style={styles.backButton} onClick={back}>{"\u2190"}</button>
                <h1 style={styles.title}>POLYFINDER</h1>
                <img src="polyfinder.png" style={styles.profileImage} />
            </div>
            <div style={styles.content}>
                <h2 style={styles.itemTitle}>{item.Item}</h2>
                {item.Image ? (
                    <img src={item.Image} alt={item.Item} style={styles.image} />
                ) : (
                    <div style={styles.imagePlaceholder}>No Image Available</div>
                )}
                <div style={styles.info}>
                    <p><strong>Status:</strong> {item.Status}</p>
                    <p><strong>Date:</strong> {item.Date}</p>
                    <p><strong>Category:</strong> {item.Category}</p>
                    <p><strong>Location:</strong> 📍 {item.Location}</p>
                    <SmallMap lat={item.Lat} lng={item.Lng} />
                </div>
                <button style={styles.claimButton} onClick={handleClaim}>Claim This Item</button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
    },
    fixedHeader: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "#1e4d2b",
        padding: "10px 20px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 1000,
    },
    backButton: {
        fontSize: "36px",
        color: "#fff",
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
    },
    title: {
        color: "#fff",
        fontSize: "32px",
        margin: "0",
    },
    profileImage: {
        width: "60px",
        height: "60px",
        borderRadius: "50%",
    },
    content: {
        marginTop: "80px",
        padding: "20px",
        textAlign: "center",
    },
    itemTitle: {
        fontSize: "28px",
        margin: "20px 0",
    },
    image: {
        maxWidth: "100%",
        height: "auto",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        marginBottom: "20px",
    },
    imagePlaceholder: {
        width: "100%",
        height: "300px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e0e0e0",
        borderRadius: "8px",
        marginBottom: "20px",
    },
    info: {
        textAlign: "left",
        backgroundColor: "#f9f9f9",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        marginBottom: "20px",
    },
    claimButton: {
        backgroundColor: "#1e4d2b",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        padding: "10px 20px",
        fontSize: "16px",
        cursor: "pointer",
    },
    claimedMessage: {
        textAlign: "center",
        fontSize: "18px",
        color: "#1e4d2b",
        marginTop: "20px",
    },
};

export default Item;
