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
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/signup' element={<Signup/>}/>
        <Route exact path='/logout' element={<Logout/>}/>
        <Route exact path='/welcome' element={<Welcome/>}/>
        <Route exact path='/:username' element={<Profile/>}/>
        <Route exact path='/edit' element={<Edit/>}/>
      </Routes>
      
    </div>
  )
}

export default App
