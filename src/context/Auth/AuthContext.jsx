import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [username, setUsername] = useState()
    const [userID, setUserID] = useState()
    const checkUser = () => {
         setUsername(localStorage.getItem("username"))
         setUserID(localStorage.getItem("userID"))
    }

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
    <AuthContext.Provider value={{ username, setUsername, userID, setUserID }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
