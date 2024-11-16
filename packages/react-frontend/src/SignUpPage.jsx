import React, { useState } from "react";

function UserSignup() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (event) => {
    event.preventDefault(); // Prevents default form submission behavior

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      setSuccessMessage('');
      return;
    }

    const signupData = {
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
    };

    console.log("Sign-Up Data:", signupData);

    try {
      // Post request to the backend
      const response = await fetch('http://localhost:8000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (response.status === 201) {
        setSuccessMessage("Sign-Up Successful! Redirecting...");
        setErrorMessage('');
        console.log('Sign-Up successful:', data);

        setTimeout(() => {
          window.location.href = '/home'; // Redirect to login page
        }, 2000);
      } else {
        setErrorMessage(data.message || "Sign-Up failed. Try again.");
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
      setErrorMessage("Network error. Please try again.");
    }
  };

  return (
    <div className="container" style={styles.container}>
      <h2>Sign Up for PolyFinder</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <form onSubmit={handleSignup} style={styles.form}>
        <div style={styles.field}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
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
            required
          />
        </div>
        <div style={styles.field}>
          <label>Confirm Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>
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
        <button type="submit" style={styles.button}>
          Sign Up
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
    backgroundColor: '#f8f8f8',
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
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
  },
  checkbox: {
    cursor: 'pointer',
  },
  checkboxLabel: {
    fontSize: '14px',
    color: '#333',
    cursor: 'pointer',
    marginLeft: '5px',
  },
  button: {
    padding: '12px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#1e4d2b',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};
export default UserSignup;
