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
    <div>
      <h2>Login!</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <br />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <br />
      <button onClick={handleLogin}>Login</button>
      <p>Don't have an account :O ? <a href="/signup">Signup here!</a></p>
    </div>
  )
}

export default Login