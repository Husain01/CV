import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Login, Signup } from './pages/Auth'
import { Logout } from './pages/Auth/Logout'
import { Welcome } from './pages/Welcome/Welcome'
import { Profile } from './pages/Profile/Profile'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/logout' element={<Logout/>}/>
        <Route path='/welcome' element={<Welcome/>}/>
        <Route path='/:username' element={<Profile/>}/>
      </Routes>
      
    </div>
  )
}

export default App
