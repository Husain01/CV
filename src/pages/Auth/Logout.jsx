import React from 'react'
import { auth } from '../../config/firebase'

export const Logout = () => {

    const logoutHandler = () => {
        auth.signOut()
        localStorage.removeItem("userID")
        localStorage.removeItem("username")
    }
  return (  
    <div>
        <button onClick={logoutHandler}>Logout</button>
    </div>
  ) 
}
