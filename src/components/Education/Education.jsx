import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../config/firebase';
import { useAuth } from '../../context/Auth/AuthContext';

export const Education = () => {
    const [educationFields, setEducationFields] = useState([]);
    const { userID } = useAuth();
    const dataRef = doc(db, "users", userID);

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

      useEffect(() => {
        fetchEduData();
      }, [])
      

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
          console.log("Successfully updated")
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
          console.log("Successfully Removed")
        } catch (error) {
          console.error(error);
        }
      };

  return (
    <div>
        {educationFields &&
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
      </button>
    </div>
  )
}
