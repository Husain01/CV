import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/Auth/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

export const Edit = () => {
  const [userData, setUserData] = useState();
  const { userID } = useAuth();

  //fetches the user data
  const fetchData = async () => {
    try {
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

  useEffect(() => {
    fetchData();
  }, []);

  console.log(userData);

  return (
    <>
      {userData && (
        <div>
          <h1>Edit Profile</h1>
          <input type="text" value={userData.firstName} />
        </div>
      )}
    </>
  );
};
