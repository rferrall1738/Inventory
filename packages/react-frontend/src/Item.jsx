import { useState ,useEffect} from "react";
import { useParams } from "react-router-dom";
import SmallMap from "./Map";



const Item = () =>
{
    const [item, setItem] = useState([]);

    const {id} = useParams(); // Extract the unique ID from the route
    useEffect(() =>{
        const getItem = async () => {
          try{
            const response = await fetch(`https://polyfinder-api-htfsexgcfde6dwby.westus3-01.azurewebsites.net/${id}`);
            if (!response.ok) {
              throw new Error(`Error fetching items: status ${response.status}`);
            }
            try 
            {
                const item = await response.json();
                setItem(item)
            }
            catch (error)
            {
                console.error('No item associated with that ID', error);
            }
          }catch (error){
            console.error('Error fetching items',error);
          }
        };
        getItem();
      });

      const back = () => {
        window.location.href = '/home';
      }

      return (
        <div style={styles.container}>
          <div style={styles.fixedHeader}>
            <button style={styles.addButton} onClick = {() => back()}>{"\u2190"}
            </button>
            <h1 style={styles.title}>POLYFINDER</h1>
            <img src="polyfinder.png" // Replace with actual user image URL
                 style={styles.profileImage}
            />
          </div>
          <div style={styles.grid}>
          {filteredItems.map((item) => (
          <div key={item._id || item.Item}>
            <div style={styles.imagePlaceholder}></div>
            <div style={styles.info}>
              <h2 style={styles.cardTitle}>{item.Item}</h2>
              <p style={styles.date}>Date: {item.Date}</p>
              <p style={styles.category}>Category: {item.Category}</p>
              <p style={styles.location}>📍 {item.Location}</p>
              <SmallMap lat={item.Lat} lng={item.Lng} />
            </div>
          </div>
          ))}
      </div>

      <button>
        Claim This Item
      </button>



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
        backgroundColor: "#e0e0e0",
        borderRadius: "0", // Remove rounded corners
        marginBottom: "10px",
      },
      info: {
        padding: "10px 0",
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