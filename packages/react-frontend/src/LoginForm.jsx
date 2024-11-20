import { useState } from "react";

const API_URL = import.meta.env.REACT_APP_API_URL;

function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword,setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevents the default form submission behavior

    // Grabs what is in the "name" field under the <input>
  
    // Implement authentication logic here

    const loginData = {
      email: event.target.elements.email.value,
      password: event.target.elements.password.value
    };

    //Debug statements
    console.log("Email", loginData.email);
    console.log('Password:', loginData.password);

    try {
      // Post Request
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      const data = await response.json() // Assume the backend returns JSON

      if (response.status === 200) {
        console.log(data.token)
        setSuccessMessage("Login Successful. Redirecting...");
        setErrorMessage('');
        localStorage.setItem("token", data.token);
        console.log('Login successful:', data);

        setTimeout(() => {
          window.location.href = '/home';
        }, 2000);
        
        // Clear fields//
        event.target.elements.email.value = '';
        event.target.elements.password.value = '';

      } else if (response.status === 404){
        console.error('User not found. Check credentials or sign up.')
        setErrorMessage(data.message || "User not found. Check credentials or sign up.");
        setSuccessMessage('');
      } else if (response.status === 401) {
        console.error('Invalid Password');
        setErrorMessage(data.message || "Invalid Password");
        setSuccessMessage('')
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
      {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}
      {successMessage && <p style={{color: "green" }}>{successMessage}</p>}
      <form onSubmit={handleLogin} style={styles.form}>
        <div style={styles.field}>
          <label>Email:</label>
          <input
            type="text"
            name="email" // From event.target.elements.email.value in handleLogin function
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.field}>
  <label>Password:</label>
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    style={styles.input}
  />
  <div style={styles.checkboxContainer}>
    <input
      type="checkbox"
      id="showPassword"
      checked={showPassword}
      onChange={() => setShowPassword(!showPassword)}
      style={styles.checkbox}
    />
    <label htmlFor="showPassword" style={styles.checkboxLabel}>
      Show Password
      </label>
      </div>
      </div>
          <button type="submit" style={styles.button}>
            Login
          </button>
          <button type="button" onClick={() => (window.location.href = '/signup')} // Redirect to signup page
          style={{ ...styles.button, backgroundColor: '#f8c471', marginTop: '10px' }}>
            Signup
          </button>
          

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
    width: '100%',
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