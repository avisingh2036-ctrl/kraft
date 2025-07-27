import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./authform.css";

export default function AuthForm() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const snapshot = await getDocs(q);

    if (isSignup) {
      if (!snapshot.empty) {
        alert("User already exists!");
        return;
      }
      await addDoc(usersRef, { email, password });
      alert("Signup successful!");
      localStorage.setItem("userEmail", email);
      navigate("/survey");
    } else {
      if (snapshot.empty) {
        alert("User not found!");
        return;
      }
      const user = snapshot.docs[0].data();
      if (user.password === password) {
        localStorage.setItem("userEmail", email);
        navigate("/survey");
      } else {
        alert("Wrong password!");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img src="/twirltales-logo.png" alt="TwirlTales Logo" className="logo-img" />

        <h2>{isSignup ? "Create Account" : ""}</h2>
        <form onSubmit={handleAuth}>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email or username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">
            {isSignup ? "Sign Up" : "Log In"}
          </button>
        </form>
        <p onClick={() => setIsSignup(!isSignup)}>
          {isSignup
            ? "Already have an account? Login"
            : "Don't have an account? Sign Up"}
        </p>
      </div>
    </div>
  );
}
