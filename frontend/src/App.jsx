import { Routes, Route, Navigate } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Chat from './pages/Chat'

function App() {
  const token = localStorage.getItem('token')   /*Check if logged in */

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/chat" element={token ? <Chat /> : <Navigate to="/login" />} /> 
      /*If logged in, will go to chat page, else redirect to login page */
    </Routes>
  )
}

export default App