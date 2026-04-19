import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Container, Box, Typography, TextField, MenuItem, Button, Paper, CircularProgress } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import FavoriteIcon from '@mui/icons-material/Favorite'

const BLOOD_GROUPS = ['A+','A-','B+','B-','O+','O-','AB+','AB-']

export default function Register() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', blood_group:'A+', latitude:'', longitude:'' })
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value})

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(pos => {
      setForm({...form, latitude: pos.coords.latitude, longitude: pos.coords.longitude})
      toast.success('Location detected!')
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post('http://localhost:8000/donors/register', {
        ...form, latitude: parseFloat(form.latitude), longitude: parseFloat(form.longitude)
      })
      toast.success('Registered as donor successfully!')
      setForm({ name:'', email:'', phone:'', blood_group:'A+', latitude:'', longitude:'' })
    } catch (err) {
      toast.error('Registration failed. Try again.')
    }
    setLoading(false)
  }

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fff5f5, #ffe4e4)', py: 8 }}>
      <Container maxWidth="sm">
        <Paper elevation={0} sx={{ borderRadius: 4, p: 5, border: '1px solid #ffe4e4', boxShadow: '0 20px 60px rgba(192,57,43,0.12)' }}>
          <Box textAlign="center" mb={4}>
            <FavoriteIcon sx={{ fontSize: 56, color: '#c0392b', mb: 1 }} />
            <Typography variant="h4" fontWeight={800} color="#c0392b">Become a Donor</Typography>
            <Typography color="text.secondary" mt={1}>Save lives by registering as a blood donor</Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <TextField label="Full Name" name="name" value={form.name} onChange={handleChange} required fullWidth
                sx={fieldStyle} />
              <TextField label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} required fullWidth
                sx={fieldStyle} />
              <TextField label="Phone Number" name="phone" value={form.phone} onChange={handleChange} required fullWidth
                sx={fieldStyle} />
              <TextField select label="Blood Group" name="blood_group" value={form.blood_group} onChange={handleChange} fullWidth
                sx={fieldStyle}>
                {BLOOD_GROUPS.map(g => <MenuItem key={g} value={g}>{g}</MenuItem>)}
              </TextField>
              <Button onClick={getLocation} variant="outlined" startIcon={<LocationOnIcon />}
                sx={{ borderColor: '#c0392b', color: '#c0392b', borderRadius: 3, py: 1.5, '&:hover': { borderColor: '#a93226', background: '#fff5f5' } }}>
                {form.latitude ? '✅ Location Detected' : 'Detect My Location'}
              </Button>
              <Button type="submit" variant="contained" disabled={loading} fullWidth
                sx={{ background: 'linear-gradient(135deg, #c0392b, #e74c3c)', borderRadius: 3, py: 2, fontSize: 16, fontWeight: 700,
                  boxShadow: '0 8px 25px rgba(192,57,43,0.35)', '&:hover': { transform: 'translateY(-2px)' }, transition: 'all 0.3s' }}>
                {loading ? <CircularProgress size={24} color="inherit" /> : '❤️ Register as Donor'}
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  )
}

const fieldStyle = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 3,
    '&:hover fieldset': { borderColor: '#c0392b' },
    '&.Mui-focused fieldset': { borderColor: '#c0392b' },
  },
  '& .MuiInputLabel-root.Mui-focused': { color: '#c0392b' }
}