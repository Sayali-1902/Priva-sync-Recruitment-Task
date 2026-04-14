import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('') // Variables declared to store user input
  const navigate = useNavigate() //To redirect user to other page

  const handleSignup = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/signup', { name, email, password }) //send POST request to backend
      navigate('/login')//if successful, will redirect to login page
    } catch (err) {
      setError(err.response?.data?.message || 'Looks like something is wrong :(')
    }
  }

  return (
    <div>
      <h2>Signup here :D</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <br />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <br />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <br />
      <button onClick={handleSignup}>Signup</button>
      <p>Hold up, already have an account? <a href="/login">Login's right here!</a></p>
    </div>
  )
}

export default Signup