import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Login, Signup } from './pages/Auth'
import { Logout } from './pages/Auth/Logout'
import { Welcome } from './pages/Welcome/Welcome'
import { Profile } from './pages/Profile/Profile'
import { Edit } from './pages/Edit/Edit'
import { Home } from './pages/Home/Home'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/logout' element={<Logout/>}/>
        <Route path='/welcome' element={<Welcome/>}/>
        <Route path='/:username' element={<Profile/>}/>
        <Route path='/edit' element={<Edit/>}/>
      </Routes>
      
    </div>
  )
}

export default App
