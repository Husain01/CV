import {createContext, useContext, useState} from 'react'

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    return (
        <AuthContext.Provider value={{email, setEmail, password, setPassword, username, setUsername}}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext);

export {AuthProvider, useAuth}