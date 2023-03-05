import React, { useEffect, useState } from "react";
import { auth, db } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const Welcome = () => {
  const navigate = useNavigate()
  const username =  localStorage.getItem("username");
  const userID = localStorage.getItem("userID");
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [bio, setBio] = useState('')

  

  const welcomeHandler = async() => {
    try {
      await setDoc(doc(db, "users", userID),{
        firstName, lastName, bio
      }, { merge: true })
      navigate(`/${username}`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div>
        <h1>Welcome Page</h1>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="Enter your first name."
          onChange={e => setFirstName(e.target.value.trim())}
          required
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Enter your last name."
          onChange={e => setLastName(e.target.value.trim())}
          required
        />
        <label htmlFor="bio">Bio</label>
        <input
          type="text"
          id="bio"
          name="bio"
          placeholder="Write a few lines about yourself."
          onChange={e => setBio(e.target.value.trim())}
          required
        />
        <button onClick={welcomeHandler}>Save</button>
      </div>
    </>
  );
};
