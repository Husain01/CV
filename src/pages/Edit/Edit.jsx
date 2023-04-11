import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/Auth/AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Education } from "../../components/Education/Education";
import { Projects } from "../../components/Projects/Projects";
import "./Edit.css";
import { Experience } from "../../components/Experience/Experience";

export const Edit = () => {
  const [userData, setUserData] = useState();
  const { userID } = useAuth();
  const dataRef = doc(db, "users", userID);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
  });



  console.log(profileData);

  //fetches the user data
  const fetchData = async () => {
    try {
      const profileDocSnap = await getDoc(dataRef);
      if (profileDocSnap.exists()) {
        const profData = profileDocSnap.data();
        setUserData(profileDocSnap.data());
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

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const { firstName, lastName, bio } = profileData;
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      await setDoc(
        dataRef,
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
        <div className="edit">
          <div className="edit-container">
            <div className="edit-demography">
              <h1 className="edit-heading">Edit Profile</h1>
              <div className="edit-demography-namebio">
                <div className="edit-name">
                  <div className="edit-singleName">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      value={profileData.firstName}
                      name="firstName"
                      id="firstName"
                      placeholder="First Name"
                      required
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="edit-singleName">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      value={profileData.lastName}
                      name="lastName"
                      id="lastName"
                      placeholder="Last Name"
                      required
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>
                <div className="edit-bio">
                  <label htmlFor="bio">Bio</label>
                  <textarea
                    type="text"
                    value={profileData.bio}
                    name="bio"
                    id="bio"
                    placeholder="Write a line about yourself"
                    required
                    onChange={handleProfileChange}
                  />
                </div>
              </div>

              <button className="edit-save-btn" type="submit" onClick={handleProfileSubmit}>
                Save
              </button>
            </div>
            
            <Experience/>
            
            <Education />
            
            <Projects />
          </div>
        </div>
      )}
    </>
  );
};
