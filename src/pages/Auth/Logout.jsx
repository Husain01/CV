import React from 'react'
import { auth } from '../../config/firebase'

export const Logout = () => {

    const logoutHandler = () => {
        auth.signOut()
    }
  return (  
    <div>
        <button onClick={logoutHandler}>Logout</button>
    </div>
  ) 
}
