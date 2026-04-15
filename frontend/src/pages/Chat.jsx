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
      setMessages(prev => [...prev, { role: 'bot', content: 'Error getting response :(' }])
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100%',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        padding: '16px 20px',
        background: '#1a1a2e',
        borderRadius: '12px',
      }}>
        <h2 style={{ fontSize: '20px' }}>💬 Chatbot :D</h2>
        <button onClick={handleLogout} style={{
          width: 'auto',
          padding: '8px 16px',
          background: '#2a2a3e',
          fontSize: '13px'
        }}>Logout</button>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}>
        {messages.length === 0 && (
          <p style={{ color: '#555', textAlign: 'center', marginTop: '40px' }}>
            Start chatting!
          </p>
        )}
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: 'flex',
            justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
          }}>
            <span style={{
              background: msg.role === 'user' ? '#6c63ff' : '#1e1e2e',
              color: '#f0f0f0',
              padding: '10px 16px',
              borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
              maxWidth: '70%',
              fontSize: '14px',
              lineHeight: '1.5',
              wordBreak: 'break-word',
              whiteSpace: 'pre-wrap',
            }}>
              {msg.content}
            </span>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <span style={{
              background: '#1e1e2e',
              padding: '10px 16px',
              borderRadius: '16px 16px 16px 4px',
              color: '#888',
              fontSize: '14px'
            }}>Lemme think...</span>
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{
        display: 'flex',
        gap: '10px',
        marginTop: '16px',
        padding: '16px',
        background: '#1a1a2e',
        borderRadius: '12px',
      }}>
        <input
          style={{ marginBottom: '0', flex: 1 }}
          placeholder="Type something :)"
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} style={{ width: 'auto', padding: '10px 20px' }}>
          Send
        </button>
      </div>
    </div>
  )
}

export default Chat