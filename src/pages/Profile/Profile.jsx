import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../../context/Auth/AuthContext";
import "./Profile.css";

export const Profile = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const [userData, setUserData] = useState();
  const [enableEdit, setEnableEdit] = useState(false);
  const { userID: localUserID } = useAuth();
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
      const userID = await getUser();
      console.log(userID);
      const loginRef = doc(db, "users", userID);
      const loginDocSnap = await getDoc(loginRef);
      if (loginDocSnap.exists()) {
        setUserData(loginDocSnap.data());
      }
    } catch (error) {
      console.error(error);
    }
  };

  const enableEditHandler = async () => {
    try {
      const userID = await getUser();
      console.log("local Storage:", localUserID);
      console.log("From server:", userID);
      if (localUserID === userID) {
        setEnableEdit(!enableEdit);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    enableEditHandler();
  }, []);

  console.log(userData);

  const EditHandler = () => {
    navigate("/edit");
  };

  // useEffect(() => {
  //   getUser()
  //   if (userID) {
  //     const loginRef = doc(db, "users", userID);
  //     fetchData(loginRef);
  //   }
  // }, []);

  return (
    <div className="profile">
      <div className="profile-container">
        {userData && (
          <>
            <h1>{`${userData.firstName} ${userData.lastName}`}</h1>
            <p>{userData.bio}</p>
          </>
        )}
        {console.log(enableEdit)}
        {enableEdit ? <button onClick={EditHandler}>Edit</button> : null}
      </div>
    </div>
  );
};
