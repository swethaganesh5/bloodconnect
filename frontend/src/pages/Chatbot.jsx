import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { Container, Box, Typography, TextField, Button, Paper, CircularProgress, Avatar } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import PersonIcon from '@mui/icons-material/Person'

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { role: 'bot', text: '👋 Hi! I am BloodConnect AI. I can answer questions about blood donation based on medical documents. Ask me anything!' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return
    const userMsg = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: userMsg }])
    setLoading(true)
    try {
      const res = await axios.post('https://bloodconnect-backend-ey40.onrender.com/chat', { question: userMsg })
      const answer = typeof res.data === 'string' ? res.data : res.data.answer
      setMessages(prev => [...prev, { role: 'bot', text: answer }])
    } catch {
      setMessages(prev => [...prev, { role: 'bot', text: 'Sorry, something went wrong. Please try again.' }])
    }
    setLoading(false)
  }

  const handleUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    try {
      const res = await axios.post('https://bloodconnect-backend-ey40.onrender.com/upload-doc', formData)
      setMessages(prev => [...prev, { role: 'bot', text: `✅ Document uploaded! ${res.data.message} Now you can ask questions about it.` }])
    } catch {
      setMessages(prev => [...prev, { role: 'bot', text: '❌ Upload failed. Please try again.' }])
    }
    setUploading(false)
  }

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fff5f5, #ffe4e4)', py: 4 }}>
      <Container maxWidth="sm">

        {/* Header */}
        <Box textAlign="center" mb={3}>
          <SmartToyIcon sx={{ fontSize: 56, color: '#c0392b', mb: 1 }} />
          <Typography variant="h4" fontWeight={800} color="#c0392b">AI Medical Assistant</Typography>
          <Typography color="text.secondary" mt={1}>
            Ask questions about blood donation — answers from verified medical documents only
          </Typography>
        </Box>

        {/* Upload button */}
        <Box textAlign="center" mb={3}>
          <Button variant="outlined" component="label" disabled={uploading}
            sx={{ borderColor: '#c0392b', color: '#c0392b', borderRadius: 3, px: 3,
              '&:hover': { background: '#fff5f5' } }}>
            {uploading ? <CircularProgress size={20} sx={{ color: '#c0392b' }} /> : '📄 Upload Medical PDF'}
            <input type="file" accept=".pdf" hidden onChange={handleUpload} />
          </Button>
        </Box>

        {/* Chat window */}
        <Paper elevation={0} sx={{ borderRadius: 4, border: '1px solid #ffe4e4',
          boxShadow: '0 20px 60px rgba(192,57,43,0.12)', overflow: 'hidden' }}>

          {/* Messages */}
          <Box sx={{ height: 400, overflowY: 'auto', p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {messages.map((msg, i) => (
              <Box key={i} sx={{ display: 'flex', gap: 1.5, justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                {msg.role === 'bot' && (
                  <Avatar sx={{ background: 'linear-gradient(135deg, #c0392b, #e74c3c)', width: 32, height: 32 }}>
                    <SmartToyIcon sx={{ fontSize: 18 }} />
                  </Avatar>
                )}
                <Box sx={{
                  maxWidth: '75%', p: 2, borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: msg.role === 'user' ? 'linear-gradient(135deg, #c0392b, #e74c3c)' : '#fff',
                  color: msg.role === 'user' ? '#fff' : '#333',
                  border: msg.role === 'bot' ? '1px solid #ffe4e4' : 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  fontSize: 14, lineHeight: 1.6, whiteSpace: 'pre-wrap'
                }}>
                  {msg.text}
                </Box>
                {msg.role === 'user' && (
                  <Avatar sx={{ background: '#eee', width: 32, height: 32 }}>
                    <PersonIcon sx={{ fontSize: 18, color: '#888' }} />
                  </Avatar>
                )}
              </Box>
            ))}
            {loading && (
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <Avatar sx={{ background: 'linear-gradient(135deg, #c0392b, #e74c3c)', width: 32, height: 32 }}>
                  <SmartToyIcon sx={{ fontSize: 18 }} />
                </Avatar>
                <Box sx={{ p: 2, borderRadius: '18px 18px 18px 4px', background: '#fff', border: '1px solid #ffe4e4' }}>
                  <CircularProgress size={16} sx={{ color: '#c0392b' }} />
                </Box>
              </Box>
            )}
            <div ref={bottomRef} />
          </Box>

          {/* Input */}
          <Box sx={{ p: 2, borderTop: '1px solid #ffe4e4', display: 'flex', gap: 1 }}>
            <TextField fullWidth placeholder="Ask about blood donation..." value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && sendMessage()}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3,
                '&.Mui-focused fieldset': { borderColor: '#c0392b' } } }} />
            <Button variant="contained" onClick={sendMessage} disabled={loading}
              sx={{ background: 'linear-gradient(135deg, #c0392b, #e74c3c)', borderRadius: 3,
                minWidth: 50, px: 2 }}>
              <SendIcon />
            </Button>
          </Box>
        </Paper>

      </Container>
    </Box>
  )
}