import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../../context/Auth/AuthContext";
import "./Profile.css";
import {FiGithub, FiLink} from 'react-icons/fi'


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
        setEnableEdit(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    enableEditHandler();
    console.log(userData);
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
    <>
      {userData && (
        <div className="profile">
          <div className="profile-container">
            <div className="profile-demography">
              <div className="profile-nameBio">
                <h1>{`${userData.firstName} ${userData.lastName}`}</h1>
                <p>{userData.bio}</p>
              </div>
              {console.log(enableEdit)}
              {enableEdit ? <button onClick={EditHandler}>Edit</button> : null}
            </div>
            <div className="profile-data">
              {userData.experience && (
                <div className="profile-experience">
                  <h2>Experience</h2>
                  <div className="profile-fields">
                    <ul>
                      {userData.experience.map((exp, index) => (
                        <li key={index}>
                          <p className="exp-position">{exp.position}</p>
                          <p className="exp-companyName">{exp.company}</p>
                          <p className="exp-date">
                            {exp.startDate} - {exp.endDate}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              {userData.education && (
                <div className="profile-education">
                  <h2>Education</h2>
                  <div className="profile-fields">
                    <ul>
                      {userData.education.map((edu, index) => (
                        <li key={index}>
                          <p className="edu-institution">{edu.institution}</p>
                          <p className="edu-degree">{edu.degree}</p>
                          <p className="edu-date">
                            {edu.startYear} - {edu.endYear}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              {userData.projects && (
                <div className="profile-projects">
                  <h2>Projects</h2>
                  <div className="profile-fields">
                    <ul>
                      {userData.projects.map((project, index) => (
                        <li key={index}>
                          <h3 className="project-title">{project.title}</h3>
                          <p className="project-description">
                            {project.description}
                          </p>
                          <div className="proj-btns">
                            {project.liveLink && (
                              <a href={project.liveLink} target="_blank"><FiLink/></a>
                            )}
                            {project.githubLink && (
                              <a href={project.githubLink}><FiGithub/></a>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
