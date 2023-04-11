import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../../context/Auth/AuthContext";
import "./Auth.css";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { username, setUsername } = useAuth();

  const loginHandler = async () => {
    try {
      const data = await signInWithEmailAndPassword(auth, email, password);
      console.log(data);
      const loginRef = doc(db, "users", data.user.uid);
      const loginDocSnap = await getDoc(loginRef);
      console.log(loginRef);
      console.log(loginDocSnap.data().username);
      console.log(data.user.uid);
      setUsername(
        localStorage.setItem("username", loginDocSnap.data().username)
      );
      localStorage.setItem("userID", data.user.uid);
      if (loginDocSnap.exists()) {
        navigate(`/${username}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth">
      <div className="auth-container">
        <h1 className="auth-heading">Login</h1>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Enter Email"
          id="email"
          name="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="password"
          id="password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="auth-btn" onClick={loginHandler}>
          Login
        </button>
        <Link to="/signup">
          <p>Don't have an account? Sign Up</p>
        </Link>
      </div>
    </div>
  );
};
