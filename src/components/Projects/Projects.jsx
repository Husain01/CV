import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../config/firebase';
import { useAuth } from '../../context/Auth/AuthContext';

export const Projects = () => {
    const [projectFields, setProjectFields] = useState([]);
    const { userID } = useAuth();
    const dataRef = doc(db, "users", userID);

    const fetchProjectData = async () => {
        try {
          const projectDocSnap = await getDoc(dataRef);
          if (projectDocSnap.exists()) {
            const projectDoc = projectDocSnap.data();
            setProjectFields(projectDoc.projects || []);
          }
        } catch (error) {
          console.error(error);
        }
      };

      useEffect(() => {
        fetchProjectData();
      }, [])
      

    const handleProjectChange = (index, event) => {
        const values = [...projectFields];
        values[index][event.target.name] = event.target.value;
        setProjectFields(values);
      };
    
      const handleAddProject = () => {
        setProjectFields([
          ...projectFields,
          { title: "", description: "", liveLink: "", githubLink: "" },
        ]);
      };
    
      const handleSaveProjects = async (e) => {
        e.preventDefault();
        try {
          await setDoc(dataRef, { projects: projectFields }, { merge: true });
          console.log("Successfully updated")
        } catch (error) {
          console.error(error);
        }
      };
    
      const handleRemoveProject = async (index) => {
        const newProjectFields = [...projectFields];
        newProjectFields.splice(index, 1);
        const newData = { projects: newProjectFields };
        try {
          await updateDoc(dataRef, newData, { merge: true });
          setProjectFields(newProjectFields);
          console.log("Successfully removed")
        } catch (error) {
          console.error(error);
        }
      };

  return (
    <div>
        {projectFields &&
        projectFields.map((field, index) => (
          <div key={index}>
            <label htmlFor={`title-${index}`}>Title</label>
            <input
              type="text"
              name="title"
              value={field.title}
              onChange={(e) => handleProjectChange(index, e)}
              id={`title-${index}`}
            />

            <label htmlFor={`description-${index}`}>Description</label>
            <input
              type="text"
              name="description"
              value={field.description}
              onChange={(e) => handleProjectChange(index, e)}
              id={`description-${index}`}
            />

            <label htmlFor={`liveLink-${index}`}>Live Link</label>
            <input
              type="text"
              name="liveLink"
              value={field.liveLink}
              onChange={(e) => handleProjectChange(index, e)}
              id={`liveLink-${index}`}
            />

            <label htmlFor={`githubLink-${index}`}>GitHub Link</label>
            <input
              type="text"
              name="githubLink"
              value={field.githubLink}
              onChange={(e) => handleProjectChange(index, e)}
              id={`githubLink-${index}`}
            />

            <button type="button" onClick={() => handleRemoveProject(index)}>
              Remove
            </button>
          </div>
        ))}
      <button type="button" onClick={handleSaveProjects}>
        Save Projects
      </button>
      <button type="button" onClick={handleAddProject}>
        Add Project
      </button>
    </div>
  )
}
