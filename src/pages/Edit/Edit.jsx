import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/Auth/AuthContext";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

export const Edit = () => {
  const [userData, setUserData] = useState();
  const { userID } = useAuth();
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
  });
  console.log(profileData);

  //fetches the user data
  const fetchData = async () => {
    try {
      console.log(userID);
      const loginRef = doc(db, "users", userID);
      const loginDocSnap = await getDoc(loginRef);
      if (loginDocSnap.exists()) {
        const profData = loginDocSnap.data();
        setUserData(loginDocSnap.data());
        setProfileData({
          firstName: profData.firstName,
          lastName: profData.lastName,
          bio: profData.bio,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(userData);
  console.log(profileData);

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const { firstName, lastName, bio } = profileData;
  console.log(firstName, lastName, bio);
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      await setDoc(
        doc(db, "users", userID),
        {
          firstName,
          lastName,
          bio,
        },
        { merge: true }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {userData && (
        <div>
          <h1>Edit Profile</h1>
          <form>
            <input
              type="text"
              value={profileData.firstName}
              name="firstName"
              onChange={handleProfileChange}
            />
            <input
              type="text"
              value={profileData.lastName}
              name="lastName"
              onChange={handleProfileChange}
            />
            <input
              type="text"
              value={profileData.bio}
              name="bio"
              onChange={handleProfileChange}
            />
            <button type="submit" onClick={handleProfileSubmit}>
              Save
            </button>
            {console.log(profileData)}
          </form>
        </div>
      )}
    </>
  );
};
