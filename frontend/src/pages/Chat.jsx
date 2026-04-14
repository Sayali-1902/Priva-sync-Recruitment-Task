import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Chat() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const sendMessage = async () => {
    if (!message.trim()) return

    const userMessage = { role: 'user', content: message }
    setMessages(prev => [...prev, userMessage])
    setMessage('')
    setLoading(true)

    try {
      const res = await axios.post(
        'http://localhost:5000/api/chat',
        { message },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      const botMessage = { role: 'bot', content: res.data.reply }
      setMessages(prev => [...prev, botMessage])
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', content: 'Error getting response' }])
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Chat</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div style={{ height: '400px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.role === 'user' ? 'right' : 'left', margin: '10px 0' }}>
            <span style={{
              background: msg.role === 'user' ? '#007bff' : '#e0e0e0',
              color: msg.role === 'user' ? 'white' : 'black',
              padding: '8px 12px',
              borderRadius: '12px',
              display: 'inline-block',
              maxWidth: '70%',
              wordBreak: 'break-word'
            }}>
              {msg.content}
            </span>
          </div>
        ))}
        {loading && <p>Thinking...</p>}
      </div>
      <div style={{ display: 'flex', marginTop: '10px' }}>
        <input
          style={{ flex: 1, padding: '8px' }}
          placeholder="Type a message..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}

export default Chat