import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, sendSignInLinkToEmail, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDWdaM4CJe4V1ow1E7Z27QEODNrygUHSSs",
  authDomain: "polyfinder-47ff5.firebaseapp.com",
  projectId: "polyfinder-47ff5",
  storageBucket: "polyfinder-47ff5.firebasestorage.app",
  messagingSenderId: "981344798183",
  appId: "1:981344798183:web:fe61aef7136650d4df6942",
  measurementId: "G-QDXC8DE6RR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function signInOrCreateUser(email, password) {
  try {
    // Try to sign in the user
    const userCredentials = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredentials.user;
    console.log("Existing user signed in:", user.email);
    return user;
  } catch (error) {
      // User not found, create a new account
      const newUser = await createUserWithEmailAndPassword(auth, email, password);
      const user = newUser.user;
      console.log("New user created:", user.email);
      return user;
      // Handle other errors
  }
}

async function send2FAEmail(email) {
  const actionCodeSettings = {
    url: 'https://ambitious-wave-0b9c2fc1e.5.azurestaticapps.net/verify-email', // Adjust this URL as needed
    handleCodeInApp: true,
  };

  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    console.log("2FA email sent to:", email);
    // Save the email locally to complete the sign-in later
    window.localStorage.setItem('emailForSignIn', email);
  } 
  catch (error) 
  {
    console.error("Error sending 2FA email:", error.message);
  }
}

function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword,setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isCleared, setIsCleared] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevents the default form submission behavior

    // Grabs what is in the "name" field under the <input>
    const loginData = {
      email: event.target.elements.email.value,
      password: event.target.elements.password.value
    };

    //Debug statements
    console.log("Email", loginData.email);
    console.log('Password:', loginData.password);

    function transitionHome(data)
    {
      setSuccessMessage("Login Successful. Redirecting...");
      setErrorMessage('');
      localStorage.setItem("token", data.token);
      console.log('Login successful:', data);
  
      setTimeout(() => {
        window.location.href = '/home';
      }, 2000);
    }
   
    try {
      // Post Request
      const response = await fetch('https://polyfinder-api-htfsexgcfde6dwby.westus3-01.azurewebsites.net//login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      const data = await response.json() // Assume the backend returns JSON

      if (response.status === 200) {
        const user = signInOrCreateUser(data.user.email, data.user.password);
        if ((await user).emailVerified)
        {
          send2FAEmail(data.user.email);
          
          setSuccessMessage("Waiting for email verification...");
          setErrorMessage('');
  
          localStorage.setItem("isVerified", false);
          console.log(localStorage.getItem("isVerified"));
          setIsCleared(true); // Clear username/password fields
          const interval = setInterval(() => 
          {
            if (localStorage.getItem("isVerified") === "true") {
              // Executes only after verifying with MFA
              setSuccessMessage("Verified");
              transitionHome(data);
  
              clearInterval(interval); // Stop the periodic check
            } else {
                console.log("Waiting for verification...");
            }
          }, 1000); // Check every 1000ms (1 second)
        }
        else
        {
          transitionHome(data);
        }
      } 
      else 
      {
        setEmail('');
        setPassword('');
        if (response.status === 404){
          console.error('User not found. Check credentials or sign up.')
          setErrorMessage(data.message || "User not found. Check credentials or sign up.");
          setSuccessMessage('');
        }
        else if (response.status === 401) {
          console.error('Invalid Password');
          setErrorMessage(data.message || "Invalid Password");
          setSuccessMessage('')
        }
        else {
          console.error('Login failed:', response.statusText);
        }
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
      {!isCleared && (
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
      )}
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