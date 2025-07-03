import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import Login from './pages/Login'
import PrivateRoute from './components/PrivateRoute'
import './App.css'

function App() {

  return (
  <>
  <Router>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Dashboard' 
      element={
      <PrivateRoute>
       <Dashboard/>
      </PrivateRoute>
      }/>
      <Route path='/Register' element={<Register/>}/>
      <Route path='/Login' element={<Login/>}/>
    </Routes>
  </Router>
  </>
  )
}

export default App
