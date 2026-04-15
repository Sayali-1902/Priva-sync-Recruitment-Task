import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password })
      localStorage.setItem('token', res.data.token)
      navigate('/chat')
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
      <h2 style={{ marginBottom: '8px', fontSize: '24px' }}>Welcome Back :D</h2>
      <p style={{ color: '#888', marginBottom: '24px', fontSize: '14px' }}>Login to continue chatting</p>

      {error && <p style={{ color: '#ff6b6b', marginBottom: '12px', fontSize: '14px' }}>{error}</p>}

      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />

      <button onClick={handleLogin}>Login</button>

      <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px', color: '#888' }}>
        Don't have an account :O ? No worries,  <a href="/signup">Sign Up</a>
      </p>
    </div>
  )
}

export default Login