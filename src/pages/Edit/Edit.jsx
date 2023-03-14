import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/Auth/AuthContext";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Education } from "../../components/Education/Education";
import { Projects } from "../../components/Projects/Projects";

export const Edit = () => {
  const [userData, setUserData] = useState();
  const { userID } = useAuth();
  const dataRef = doc(db, "users", userID);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
  });
  const [educationFields, setEducationFields] = useState([]);

  const fetchEduData = async () => {
    try {
      const eduDocSnap = await getDoc(dataRef);
      if (eduDocSnap.exists()) {
        const eduDoc = eduDocSnap.data();
        setEducationFields(eduDoc.education || []);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
    fetchEduData();
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

  const handleEducationChange = (index, event) => {
    const values = [...educationFields];
    values[index][event.target.name] = event.target.value;
    setEducationFields(values);
  };

  const handleAddEducation = () => {
    setEducationFields([
      ...educationFields,
      { institution: "", degree: "", field: "", startYear: "", endYear: "" },
    ]);
  };

  const handleSaveEducation = async (e) => {
    e.preventDefault();
    try {
      await setDoc(dataRef, { education: educationFields }, { merge: true });
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveEducation = async (index) => {
    const newEducationFields = [...educationFields];
    newEducationFields.splice(index, 1);
    const newData = { education: newEducationFields };
    try {
      await updateDoc(dataRef, newData, { merge: true });
      setEducationFields(newEducationFields);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {userData && (
        <div>
          <h1>Edit Profile</h1>
          <div>
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
          </div>
          <h2>Education</h2>
          <Education/>
          <h2>Projects</h2>
          <Projects/>
        </div>
      )}
      {/* {educationFields &&
        educationFields.map((field, index) => (
          <div key={index}>
            <label htmlFor={`institution-${index}`}>Institution</label>
            <input
              type="text"
              name="institution"
              value={field.institution}
              onChange={(e) => handleEducationChange(index, e)}
              id={`institution-${index}`}
            />

            <label htmlFor={`degree-${index}`}>Degree</label>
            <input
              type="text"
              name="degree"
              value={field.degree}
              onChange={(e) => handleEducationChange(index, e)}
              id={`degree-${index}`}
            />

            <label htmlFor={`field-${index}`}>Field</label>
            <input
              type="text"
              name="field"
              value={field.field}
              onChange={(e) => handleEducationChange(index, e)}
              id={`field-${index}`}
            />

            <label htmlFor={`startYear-${index}`}>Start Year</label>
            <input
              type="text"
              name="startYear"
              value={field.startYear}
              onChange={(e) => handleEducationChange(index, e)}
              id={`startYear-${index}`}
            />

            <label htmlFor={`endYear-${index}`}>End Year</label>
            <input
              type="text"
              name="endYear"
              value={field.endYear}
              onChange={(e) => handleEducationChange(index, e)}
              id={`endYear-${index}`}
            />

            <button type="button" onClick={() => handleRemoveEducation(index)}>
              Remove
            </button>
          </div>
        ))}
      <button type="button" onClick={handleSaveEducation}>
        Save Education
      </button>
      <button type="button" onClick={handleAddEducation}>
        Add Education
      </button> */}
      
    </>
  );
};
