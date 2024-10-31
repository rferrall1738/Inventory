import React, { useState } from "react";

function UserLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevents the default form submission behavior

    // Grabs what is in the "name" field under the <input>
    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;
  
    // Implement authentication logic here

    const loginData = {
      username: username,
      password: password
    };

    //Debug statements
    console.log("Username", loginData.username);
    console.log('Password:', loginData.password);

    try {
      // Post Request
      const response = await fetch('Http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json(); // Assume the backend returns JSON
        console.log('Login successful:', data);

        // Clear fields
        event.target.elements.username.value = '';
        event.target.elements.password.value = '';

      } else {
        console.error('Login failed:', response.statusText);
        // Handle login failure (e.g., show error message to user)
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Handle network or other errors
    }
  };
  

  return (
    <div className="container" style={styles.container}>
      <h2>Login to PolyFinder</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <div style={styles.field}>
          <label>Username:</label>
          <input
            type="text"
            name="username" // From event.target.elements.username.value in handleLogin function
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.field}>
          <label>Password:</label>
          <input
            type="password"
            name="password" // From event.target.elements.password.value in handleLogin function
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Login</button>

      </form>
    </div>
  );
}


const styles = {
  container: {
    maxWidth: '400px',
    margin: 'auto',
    padding: '30px',
    textAlign: 'center',
    border: '1px solid #ddd',
    borderRadius: '10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f8f8f8', // Soft white background
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
  },
  input: {
    padding: '12px',
    width: '100%',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
    backgroundColor: '#fff',
  },
  button: {
    padding: '12px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#1e4d2b', // Cal Poly green
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#154c24', // Darker green on hover
  },
  label: {
    color: '#333', // Dark neutral for readability
    fontWeight: 'bold',
  },
  title: {
    color: '#1e4d2b', // Green title
    fontWeight: 'bold',
    fontSize: '24px',
    marginBottom: '10px',
  }
};

export default UserLogin;