import { useState } from "react";
import emailjs from '@emailjs/browser';



function SendPasswordResetEmail() {
  
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  

  const handleReset = async (event) => {
    event.preventDefault(); // Prevents default form submission behavior

    // Check if passwords match

    const serviceId = 'service_b1nal1k';
    const templateId = 'template_fz9ieja';
    const publicKey = 'GnsukMgroNi6MIBau';

    const toEmail = {
      email: event.target.elements.email.value,
    };

    console.log("Received Email:", toEmail);
    console.log("Payload sent to backend:", JSON.stringify(toEmail));

    try {
      // Post request to the backend
      const response = await fetch(`https://polyfinder-api-htfsexgcfde6dwby.westus3-01.azurewebsites.net/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(toEmail),
      });
      console.log("Sending POST request to:", `https://polyfinder-api-htfsexgcfde6dwby.westus3-01.azurewebsites.net/reset-password`);

      const data = await response.json();
      console.log("send_link", data.link);
      console.log("email ", toEmail.email);
      console.log("Response received with status:", response.status);

      if (response.status === 200) {
        setSuccessMessage("Email Sent");
        setErrorMessage('');
        const templateParameters = {to_email: toEmail.email, reset_link: data.link };
        emailjs.send(serviceId, templateId, templateParameters, publicKey).then(
          (res) => {
            console.log('Success!', res.status, res.text);
          },
          (error) => {
            console.log('Failed...', error);
          }
        );
        console.log('User Found, Email Sent', data);

      } else {
        setErrorMessage(data.message || "Check credentials. Try again.");
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error during fetching link:', error);
      setErrorMessage("Network error. Please try again.");
    }
  };

  return (
    <div className="container" style={styles.container}>
      <h2>Enter Email</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <form onSubmit={handleReset} style={styles.form}>
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
        <button type="submit" style={styles.button}>
          Submit
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
export default SendPasswordResetEmail;
