import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/Auth/AuthContext";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import "./Experience.css";

export const Experience = () => {
  const [experienceFields, setExperienceFields] = useState([]);
  const { userID } = useAuth();
  const dataRef = doc(db, "users", userID);

  const fetchExpData = async () => {
    try {
      const eduDocSnap = await getDoc(dataRef);
      if (eduDocSnap.exists()) {
        const eduDoc = eduDocSnap.data();
        setExperienceFields(eduDoc.experience || []);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchExpData();
  }, []);

  const handleExperienceChange = (index, event) => {
    const values = [...experienceFields];
    values[index][event.target.name] = event.target.value;
    setExperienceFields(values);
  };

  const handleAddExperience = () => {
    setExperienceFields([
      ...experienceFields,
      { position: "", company: "", startDate: "", endDate: "" },
    ]);
  };

  const handleSaveExperience = async (e) => {
    e.preventDefault();
    try {
      await setDoc(dataRef, { experience: experienceFields }, { merge: true });
      console.log("Successfully updated");
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveExperience = async (index) => {
    const newExperienceFields = [...experienceFields];
    newExperienceFields.splice(index, 1);
    const newData = { experience: newExperienceFields };
    try {
      await updateDoc(dataRef, newData, { merge: true });
      setExperienceFields(newExperienceFields);
      console.log("Successfully Removed");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="exp-heading">
        <h2>Experience</h2>
        <div className="exp-btns">
          <button type="button" onClick={handleAddExperience}>
            Add Exp
          </button>
          <button type="button" onClick={handleSaveExperience}>
            Save Exp
          </button>
        </div>
      </div>
      <div className="experience-fields">
        {experienceFields &&
          experienceFields.map((field, index) => (
            <div className="experience-fields-container" key={index}>
              <div className="exp-position">
                <label htmlFor={`position-${index}`}>Position</label>
                <input
                  type="text"
                  name="position"
                  value={field.position}
                  onChange={(e) => handleExperienceChange(index, e)}
                  id={`position-${index}`}
                />
              </div>
              <div className="exp-company">
                <label htmlFor={`company-${index}`}>Company</label>
                <input
                  type="text"
                  name="company"
                  value={field.company}
                  onChange={(e) => handleExperienceChange(index, e)}
                  id={`company-${index}`}
                />
              </div>
              <div className="exp-startDate">
                <label htmlFor={`startDate-${index}`}>Start Date</label>
                <input
                  type="text"
                  name="startDate"
                  value={field.startDate}
                  onChange={(e) => handleExperienceChange(index, e)}
                  id={`startDate-${index}`}
                />
              </div>
              <div className="exp-endDate">
                <label htmlFor={`endDate-${index}`}>End Date</label>
                <input
                  type="text"
                  name="endDate"
                  value={field.endDate}
                  onChange={(e) => handleExperienceChange(index, e)}
                  id={`endDate-${index}`}
                />
              </div>

              <button
                type="button"
                onClick={() => handleRemoveExperience(index)}
              >
                Remove
              </button>
            </div>
          ))}
      </div>
    </>
  );
};
