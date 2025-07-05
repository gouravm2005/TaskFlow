import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import Login from './pages/Login'
import PrivateRoute from './components/PrivateRoute'
import AllTasks from './pages/AllTasks'
import Calendar from './pages/Calendar'
import Team from './pages/Team'
import Categorytask from './pages/Categorytask'
import Task from './pages/Task'
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
      <Route path='/AllTasks' element={<AllTasks/>}/>
      <Route path='/Calendar' element={<Calendar/>}/>
      <Route path='/Team' element={<Team/>}/>
      <Route path='/Categorytask' element={<Categorytask:id/>}/>
      <Route path='/Task' element={<Task:id/>}/>
    </Routes>
  </Router>
  </>
  )
}

export default App
