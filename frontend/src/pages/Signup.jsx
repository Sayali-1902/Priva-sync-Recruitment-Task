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
    <div style={{
      background: '#1a1a2e',
      padding: '40px',
      borderRadius: '16px',
      width: '100%',
      maxWidth: '400px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
    }}>
      <h2 style={{ marginBottom: '8px', fontSize: '24px' }}>Create an Account right here :D</h2>
      <p style={{ color: '#888', marginBottom: '24px', fontSize: '14px' }}>Sign up and chat away!</p>

      {error && <p style={{ color: '#ff6b6b', marginBottom: '12px', fontSize: '14px' }}>{error}</p>}

      <input placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />

      <button onClick={handleSignup}>Sign Up</button>

      <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px', color: '#888' }}>
        Wait, you already have an account? <a href="/login">Login!</a>
      </p>
    </div>
  )
}

export default Signup