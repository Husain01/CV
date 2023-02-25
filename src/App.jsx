import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Login, Signup } from './pages/Auth'
import { Logout } from './pages/Auth/Logout'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/logout' element={<Logout/>}/>
      </Routes>
      
    </div>
  )
}

export default App
