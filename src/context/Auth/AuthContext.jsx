import {createContext, useContext, useEffect, useState} from 'react'

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [username, setUsername] = useState()
    const [userID, setUserID] = useState()
    const checkUser = () => {
         setUsername(localStorage.getItem("username"))
         setUserID(localStorage.getItem("userID"))
    }

    useEffect(() => {
      checkUser()
    }, [])
    

    return (
        <AuthContext.Provider value={{ username, setUsername, userID, setUserID}}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext);

export {AuthProvider, useAuth}