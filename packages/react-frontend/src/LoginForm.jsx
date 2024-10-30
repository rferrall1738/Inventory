import React, { useState } from "react";

function UserLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
    // Implement authentication logic here
  };

  return (
    <div className="container" style={styles.container}>
      <h2>Login to PolyFinder</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <div style={styles.field}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.field}>
          <label>Password:</label>
          <input
            type="password"
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