import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../../context/Auth/AuthContext";

export const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {username, setUsername} = useAuth()
  

  const loginHandler = async() => {
    try {
      const data = await signInWithEmailAndPassword(auth, email, password)
      console.log(data)
      const loginRef = doc(db, "users", data.user.uid)
      const loginDocSnap = await getDoc(loginRef)
      console.log(loginRef)
      console.log(loginDocSnap.data().username)
      console.log(data.user.uid)
      setUsername(localStorage.setItem("username", loginDocSnap.data().username))
      localStorage.setItem("userID", data.user.uid);
      if (loginDocSnap.exists()) {
        navigate(`/${username}`)
      }
    } catch (error) {
      console.error(error)
    }
  }
  

  return (
    <div>
      <h1>Login</h1>
      <div>
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
        <button onClick={loginHandler}>Login</button>
      </div>
    </div>
  );
};
