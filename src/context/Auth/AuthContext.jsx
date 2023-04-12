import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  
  
  const getUserName = localStorage.getItem('username')?localStorage.getItem('username') : ''
  const getUserID = localStorage.getItem("userID")? localStorage.getItem("userID"): ""
const [username, setUsername] = useState(getUserName);
const [userID, setUserID] = useState(getUserID)
const [userName, setuserName] = useState(getUserName)

//   const checkUser = () => {
//     const storedUsername = localStorage.getItem("username");
//     const storedUserID = localStorage.getItem("userID");
//     console.log(storedUserID);
//     setUsername(storedUsername);
//     setUserID(storedUserID);
//   };

//   useEffect(() => {
//     checkUser();
//     console.log(userID);
//   }, [userID]);

  return (
    <AuthContext.Provider value={{ username, setUsername, userID, setUserID, userName,setuserName }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
