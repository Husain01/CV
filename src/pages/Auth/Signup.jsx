import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { db } from "../../config/firebase"; 
import { doc, setDoc } from "firebase/firestore";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
console.log(auth?.currentUser?.uid)
  const signUpHandler = async () => {
    try {
       const data =  await createUserWithEmailAndPassword(auth, email, password);
       await setDoc(doc(db,"users", data.user.uid), {
        
       })
    }
    catch (error) {
        console.error(error);
    }
  };

  return (
    <div>
      <h1>Signup</h1>
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
        <button onClick={signUpHandler}>Signup</button>
      </div>
    </div>
  );
};
