import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

export const Home = () => {
  return (
    <div className='home'>
        <Link to='/login'>
        <button>Login</button>
        </Link>
        <Link to='/signup'>
        <button>Signup</button>
        </Link>
    </div>
  )
}
