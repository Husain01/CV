import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import { Navbar } from '../../components/Navbar/Navbar'
import { Hero } from '../../components/Hero/Hero'

export const Home = () => {
  return (
    <div className='home'>
      <Navbar/>
      <Hero/>
    </div>
  )
}
