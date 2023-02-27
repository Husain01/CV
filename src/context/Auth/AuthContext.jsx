import {createContext, useContext, useEffect, useState} from 'react'

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [username, setUsername] = useState()
    const checkUser = () => {
         setUsername(localStorage.getItem("username"))
    }

    useEffect(() => {
      checkUser()
    }, [])
    

    return (
        <AuthContext.Provider value={{ username, setUsername}}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext);

export {AuthProvider, useAuth}