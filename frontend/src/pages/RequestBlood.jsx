import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Container, Box, Typography, TextField, MenuItem, Button, Paper, CircularProgress, Card, CardContent, Chip, Avatar } from '@mui/material'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import BloodtypeIcon from '@mui/icons-material/Bloodtype'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import PhoneIcon from '@mui/icons-material/Phone'

const BLOOD_GROUPS = ['A+','A-','B+','B-','O+','O-','AB+','AB-']

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

function LocationPicker({ onSelect }) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng.lat, e.latlng.lng)
    }
  })
  return null
}

export default function RequestBlood() {
  const [form, setForm] = useState({ patient_name:'', phone:'', blood_group:'A+', hospital:'', latitude:'', longitude:'' })
  const [matched, setMatched] = useState([])
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value})

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.latitude) { toast.error('Please select hospital location on map!'); return }
    setLoading(true)
    try {
      const res = await axios.post('http://localhost:8000/requests/create', {
        ...form, latitude: parseFloat(form.latitude), longitude: parseFloat(form.longitude)
      })
      setMatched(res.data.matched_donors)
      toast.success(`Found ${res.data.matched_donors.length} matching donors!`)
    } catch (err) {
      toast.error('Request failed. Try again.')
    }
    setLoading(false)
  }

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fff5f5, #ffe4e4)', py: 8 }}>
      <Container maxWidth="sm">
        <Paper elevation={0} sx={{ borderRadius: 4, p: 5, border: '1px solid #ffe4e4', boxShadow: '0 20px 60px rgba(192,57,43,0.12)', mb: 4 }}>
          <Box textAlign="center" mb={4}>
            <LocalHospitalIcon sx={{ fontSize: 56, color: '#c0392b', mb: 1 }} />
            <Typography variant="h4" fontWeight={800} color="#c0392b">Request Blood</Typography>
            <Typography color="text.secondary" mt={1}>Fill the form — we'll find matching donors instantly</Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <TextField label="Patient Name" name="patient_name" value={form.patient_name}
                onChange={handleChange} required fullWidth sx={fieldStyle} />
              <TextField label="Contact Phone" name="phone" value={form.phone}
                onChange={handleChange} required fullWidth sx={fieldStyle} />
              <TextField select label="Blood Group Needed" name="blood_group"
                value={form.blood_group} onChange={handleChange} fullWidth sx={fieldStyle}>
                {BLOOD_GROUPS.map(g => <MenuItem key={g} value={g}>{g}</MenuItem>)}
              </TextField>
              <TextField label="Hospital Name" name="hospital" value={form.hospital}
                onChange={handleChange} required fullWidth sx={fieldStyle} />

              {/* Map */}
              <Typography variant="body2" color="text.secondary" fontWeight={600}>
                📍 Click on map to set hospital location
              </Typography>
              <Box sx={{ borderRadius: 3, overflow: 'hidden', border: '1.5px solid #ffe4e4', height: 220 }}>
                <MapContainer center={[13.0827, 80.2707]} zoom={12} style={{ height: '100%', width: '100%' }}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <LocationPicker onSelect={(lat, lng) => {
                    setForm(f => ({...f, latitude: lat, longitude: lng}))
                    toast.success('Hospital location set!')
                  }} />
                  {form.latitude && (
                    <Marker position={[form.latitude, form.longitude]} icon={markerIcon} />
                  )}
                </MapContainer>
              </Box>
              {form.latitude && (
                <Box sx={{ background: '#f0fff4', border: '1px solid #68d391', borderRadius: 2, p: 1.5, textAlign: 'center' }}>
                  <Typography variant="caption" color="green">✅ Location selected on map</Typography>
                </Box>
              )}

              <Button type="submit" variant="contained" disabled={loading} fullWidth
                sx={{ background: 'linear-gradient(135deg, #c0392b, #e74c3c)', borderRadius: 3, py: 2,
                  fontSize: 16, fontWeight: 700, boxShadow: '0 8px 25px rgba(192,57,43,0.35)',
                  '&:hover': { transform: 'translateY(-2px)' }, transition: 'all 0.3s' }}>
                {loading ? <CircularProgress size={24} color="inherit" /> : '🚨 Find Donors Now'}
              </Button>
            </Box>
          </form>
        </Paper>

        {matched.length > 0 && (
          <Box>
            <Typography variant="h5" fontWeight={800} color="#c0392b" mb={3} textAlign="center">
              🎉 {matched.length} Matching Donors Found!
            </Typography>
            {matched.map((d, i) => (
              <Card key={i} elevation={0} sx={{ borderRadius: 3, mb: 2, border: '1px solid #ffe4e4',
                boxShadow: '0 8px 25px rgba(192,57,43,0.1)',
                '&:hover': { transform: 'translateY(-4px)' }, transition: 'all 0.3s' }}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 3 }}>
                  <Avatar sx={{ background: 'linear-gradient(135deg, #c0392b, #e74c3c)', width: 56, height: 56, fontSize: 18, fontWeight: 800 }}>
                    {d.blood_group}
                  </Avatar>
                  <Box flex={1}>
                    <Typography fontWeight={700} fontSize={17}>{d.name}</Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 0.5, flexWrap: 'wrap' }}>
                      <Chip icon={<PhoneIcon />} label={d.phone} size="small" sx={{ background: '#fff5f5', color: '#c0392b' }} />
                      <Chip icon={<LocationOnIcon />} label={`${d.distance_km} km away`} size="small" sx={{ background: '#fff5f5', color: '#c0392b' }} />
                      <Chip icon={<BloodtypeIcon />} label={d.blood_group} size="small" sx={{ background: '#c0392b', color: '#fff' }} />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
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