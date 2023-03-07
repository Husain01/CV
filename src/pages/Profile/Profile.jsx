import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../../context/Auth/AuthContext";

export const Profile = () => {
  const { username } = useParams();
  // const {  userID } = useAuth();
  // const userID = localStorage.getItem("userID")

  //Gets the userID from the username from the params.
  const getUser = async () => {
    try {
      const userRef = doc(db, "usernames", username);
      const userDocSnap = await getDoc(userRef);
      const userID = userDocSnap.data().userID;
      return userID;
    } catch (error) {
      console.log(error);
    }
  };

  //fetches the user data 
  const fetchData = async () => {
    try {
      const userID =await getUser()
      console.log(userID)
      const loginRef = doc(db, "users", userID);
      const loginDocSnap = await getDoc(loginRef);
      if (loginDocSnap.exists()) {
        const userData = loginDocSnap.data();
        console.log(userData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData()
  }, [])

  // useEffect(() => {
  //   getUser()
  //   if (userID) {
  //     const loginRef = doc(db, "users", userID);
  //     fetchData(loginRef);
  //   }
  // }, []);

  

  return <div>Hi {username}</div>;
};
