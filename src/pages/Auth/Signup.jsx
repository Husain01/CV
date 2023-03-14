import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { db } from "../../config/firebase";
import { collection, doc, runTransaction, setDoc } from "firebase/firestore";
import { useAuth } from "../../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { username, setUsername } = useAuth();
  // console.log(auth?.currentUser?.uid);

  const signUpHandler = async () => {
    const usernamesCol = collection(db, "usernames");
    const userDoc = doc(usernamesCol, username);
    try {
      await runTransaction(db, async (transaction) => {
        const existingDoc = await transaction.get(userDoc);

        if (existingDoc.exists()) {
          alert("Username already exists!")
          throw new Error("Username already exists!");
        }
        const data = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        transaction.set(userDoc, {
          userID: data.user.uid,
        });
        localStorage.setItem("username", username);
        localStorage.setItem("userID", data.user.uid);
        await setDoc(doc(db, "users", data.user.uid), {
          email: data.user.email,
          username: username,
        });
        navigate("/welcome");
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <div>
        <label htmlFor="text">Username</label>
        <input
          type="text"
          placeholder="Enter Username"
          id="email"
          name="email"
          required
          onChange={(e) => setUsername(e.target.value.trim())}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Enter Email"
          id="email"
          name="email"
          required
          onChange={(e) => setEmail(e.target.value.trim())}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value.trim())}
        />
        <button onClick={signUpHandler}>Signup</button>
      </div>
    </div>
  );
};
