import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";

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

function Verification() {
  const [status, setStatus] = useState("Verifying..."); // State for status updates

  useEffect(() => {
    const verifyEmailLink = async () => {
    const url = window.location.href;

      // Check if the current URL is a valid email sign-in link
      if (isSignInWithEmailLink(auth, url)) {
        let email = window.localStorage.getItem("emailForSignIn");
        console.log("Email is ", email);

        if (!email) {
          // If the email is not in localStorage, prompt the user to provide it
          email = window.prompt("Please provide your email for confirmation");
        }

        try {
            // Attempt to sign in with the email link
            const result = await signInWithEmailLink(auth, email, url);
            console.log("Sign-in successful:", result.user);

            // Clear email from localStorage after successful sign-in
            window.localStorage.removeItem("emailForSignIn");
            localStorage.setItem("isVerified", true);
        } catch (error) {
          console.error("Error signing in with email link:", error);
          setStatus("Error: " + error.message); // Display error message
        }
      } else {
        setStatus("Invalid or expired sign-in link. Please try again.");
      }
    };

    verifyEmailLink();
  }, []); // Empty dependency array ensures this runs only on mount

  return <div>{status}</div>; // Display status or loading message
}

export default Verification;
