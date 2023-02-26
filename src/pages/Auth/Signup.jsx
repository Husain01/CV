import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { db } from "../../config/firebase";
import { collection, doc, runTransaction, setDoc } from "firebase/firestore";
import { useAuth } from "../../context/Auth/AuthContext";

export const Signup = () => {
  const { email, setEmail, password, setPassword, username, setUsername } =
    useAuth();
  console.log(auth?.currentUser?.uid);

  const signUpHandler = async () => {
    const usernamesCol = collection(db, "usernames");
    const userDoc = doc(usernamesCol, username);
    try {
      await runTransaction(db, async (transaction) => {
        const existingDoc = await transaction.get(userDoc);

        if (existingDoc.exists()) {
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
        await setDoc(doc(db, "users", data.user.uid), {
          email: data.user.email,
          username: username,
        });
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
          onChange={(e) => setUsername(e.target.value)}
        />
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
          placeholder="Password"
          id="password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={signUpHandler}>Signup</button>
      </div>
    </div>
  );
};
