import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Box, Container, Typography, Grid, Card, CardContent, Button } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import MapIcon from '@mui/icons-material/Map'
import BloodtypeIcon from '@mui/icons-material/Bloodtype'

const quotes = [
  { text: "ரத்தம் கொடுங்கள், உயிர் காப்பாற்றுங்கள்!", lang: "Tamil" },
  { text: "Donate blood, save a life — be someone's hero today.", lang: "English" },
  { text: "உங்கள் ஒரு முறை இரத்த தானம் மூன்று உயிர்களை காப்பாற்றும்!", lang: "Tamil" },
  { text: "Blood has no religion, no caste — it only has a type.", lang: "English" },
  { text: "இரத்தம் கொடுப்பது தேவதூதர்களின் செயல்!", lang: "Tamil" },
  { text: "The blood you donate gives someone another chance at life.", lang: "English" },
  { text: "நீங்கள் கொடுக்கும் இரத்தம் ஒருவரின் கடைசி நம்பிக்கையாக இருக்கலாம்!", lang: "Tamil" },
  { text: "Be a hero. Roll up your sleeve. Donate blood.", lang: "English" },
]

export default function Home() {
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setQuoteIndex(prev => (prev + 1) % quotes.length)
        setFade(true)
      }, 500)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Box sx={{ fontFamily: 'Inter' }}>

      {/* Hero */}
      <Box sx={{
        background: 'linear-gradient(135deg, #c0392b 0%, #e74c3c 100%)',
        minHeight: '90vh', display: 'flex', alignItems: 'center',
        position: 'relative', overflow: 'hidden'
      }}>
        <Box sx={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)', top: -100, right: -100 }} />
        <Box sx={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)', bottom: -50, left: -50 }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{
                animation: 'fadeInLeft 0.8s ease',
                '@keyframes fadeInLeft': {
                  from: { opacity: 0, transform: 'translateX(-30px)' },
                  to: { opacity: 1, transform: 'translateX(0)' }
                }
              }}>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1,
                  background: 'rgba(255,255,255,0.15)', borderRadius: 50, px: 2, py: 0.8, mb: 3 }}>
                  <FavoriteIcon sx={{ color: '#fff', fontSize: 16 }} />
                  <Typography sx={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>
                    AI-Powered Blood Donor Network
                  </Typography>
                </Box>
                <Typography variant="h2" fontWeight={900} color="white"
                  sx={{ lineHeight: 1.1, mb: 2, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
                  Every Drop<br />
                  <span style={{ color: '#ffcccc' }}>Saves a Life</span>
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: 18, mb: 4, lineHeight: 1.7 }}>
                  Connect with compatible blood donors instantly during emergencies.
                  AI-powered matching finds the nearest donor in seconds.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button component={Link} to="/register" variant="contained"
                    sx={{ background: '#fff', color: '#c0392b', fontWeight: 800, px: 4, py: 1.8,
                      borderRadius: 50, fontSize: 16,
                      boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                      '&:hover': { background: '#f5f5f5', transform: 'translateY(-3px)' },
                      transition: 'all 0.3s' }}>
                    ❤️ Become a Donor
                  </Button>
                  <Button component={Link} to="/request" variant="outlined"
                    sx={{ borderColor: 'rgba(255,255,255,0.6)', color: '#fff', fontWeight: 700,
                      px: 4, py: 1.8, borderRadius: 50, fontSize: 16,
                      '&:hover': { background: 'rgba(255,255,255,0.1)', borderColor: '#fff',
                        transform: 'translateY(-3px)' }, transition: 'all 0.3s' }}>
                    🚨 Request Blood
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box sx={{
                textAlign: 'center',
                animation: 'float 3s ease-in-out infinite',
                '@keyframes float': {
                  '0%, 100%': { transform: 'translateY(0px)' },
                  '50%': { transform: 'translateY(-20px)' }
                }
              }}>
                <Typography sx={{ fontSize: 180, lineHeight: 1 }}>🩸</Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Quotes Slider */}
      <Box sx={{ background: '#1a1a1a', py: 5, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography sx={{
            color: '#fff', fontSize: { xs: 18, md: 24 }, fontWeight: 700,
            fontStyle: 'italic', lineHeight: 1.6,
            opacity: fade ? 1 : 0,
            transition: 'opacity 0.5s ease',
            minHeight: 60, display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            "{quotes[quoteIndex].text}"
          </Typography>
          <Typography sx={{ color: '#c0392b', fontWeight: 600, mt: 1, fontSize: 14 }}>
            — {quotes[quoteIndex].lang}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mt: 2 }}>
            {quotes.map((_, i) => (
              <Box key={i} onClick={() => setQuoteIndex(i)} sx={{
                width: i === quoteIndex ? 24 : 8, height: 8,
                borderRadius: 50, background: i === quoteIndex ? '#c0392b' : '#555',
                cursor: 'pointer', transition: 'all 0.3s'
              }} />
            ))}
          </Box>
        </Container>
      </Box>

      {/* Stats */}
      <Box sx={{ background: '#fff', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            {[
              { num: '4.5M+', label: 'Lives Saved Annually', icon: '❤️' },
              { num: '8', label: 'Blood Groups Supported', icon: '🩸' },
              { num: '< 2 min', label: 'Average Match Time', icon: '⚡' },
              { num: '100%', label: 'Free to Use', icon: '✅' },
            ].map(s => (
              <Grid item xs={6} md={3} key={s.label}>
                <Box sx={{ textAlign: 'center', p: 3, borderRadius: 4,
                  '&:hover': { background: '#fff5f5', transform: 'translateY(-4px)' },
                  transition: 'all 0.3s' }}>
                  <Typography fontSize={40} mb={1}>{s.icon}</Typography>
                  <Typography variant="h4" fontWeight={900} color="#c0392b">{s.num}</Typography>
                  <Typography color="text.secondary" fontSize={14}>{s.label}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features */}
      <Box sx={{ background: '#fff5f5', py: 10 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight={900} textAlign="center" color="#1a1a1a" mb={2}>
            Why BloodConnect?
          </Typography>
          <Typography color="text.secondary" textAlign="center" mb={6} fontSize={16}>
            Features that make us different from existing blood donor apps
          </Typography>
          <Grid container spacing={3}>
            {[
              { icon: <SmartToyIcon sx={{ fontSize: 40, color: '#c0392b' }} />,
                title: 'AI Donor Matching',
                desc: 'Our algorithm matches by blood compatibility AND distance. Finds the nearest compatible donor in seconds — not just a search list.' },
              { icon: <NotificationsActiveIcon sx={{ fontSize: 40, color: '#c0392b' }} />,
                title: 'Real-time SMS Alerts',
                desc: 'Top 5 nearest donors get instant SMS. No app download needed. Works on any phone, any network.' },
              { icon: <MapIcon sx={{ fontSize: 40, color: '#c0392b' }} />,
                title: 'Interactive Map',
                desc: 'Click on the map to set hospital location precisely. See donor locations visually for better coordination.' },
              { icon: <BloodtypeIcon sx={{ fontSize: 40, color: '#c0392b' }} />,
                title: 'Smart Compatibility',
                desc: 'Automatically checks blood group compatibility rules. O- donors are matched to any group. AB+ can receive from all.' },
              { icon: <EmojiEventsIcon sx={{ fontSize: 40, color: '#c0392b' }} />,
                title: 'Donor Leaderboard',
                desc: 'Gamified system with badges and ranks. Regular donors get Hero and Legend badges — motivating more donations.' },
              { icon: <SmartToyIcon sx={{ fontSize: 40, color: '#c0392b' }} />,
                title: 'RAG Medical Chatbot',
                desc: 'AI chatbot answers blood donation questions from verified WHO documents only. No hallucinations, only facts.' },
            ].map(f => (
              <Grid item xs={12} md={4} key={f.title}>
                <Card elevation={0} sx={{ borderRadius: 4, p: 1, height: '100%',
                  border: '1px solid #ffe4e4', background: '#fff',
                  '&:hover': { transform: 'translateY(-8px)',
                    boxShadow: '0 20px 50px rgba(192,57,43,0.15)' },
                  transition: 'all 0.4s' }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box mb={2}>{f.icon}</Box>
                    <Typography variant="h6" fontWeight={700} mb={1.5}>{f.title}</Typography>
                    <Typography color="text.secondary" lineHeight={1.7}>{f.desc}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How to Use */}
      <Box sx={{ background: '#fff', py: 10 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight={900} textAlign="center" color="#1a1a1a" mb={2}>
            How to Use BloodConnect
          </Typography>
          <Typography color="text.secondary" textAlign="center" mb={6} fontSize={16}>
            Simple steps for donors and patients
          </Typography>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" fontWeight={800} color="#c0392b" mb={3}>
                ❤️ For Donors
              </Typography>
              {[
                { step: '1', title: 'Register', desc: 'Click "Become a Donor" → Fill your name, email, phone, blood group → Click Detect Location → Register' },
                { step: '2', title: 'Stay Available', desc: 'Keep your profile active. You can update availability anytime from your dashboard.' },
                { step: '3', title: 'Receive SMS', desc: 'When a patient needs your blood group nearby, you get an instant SMS with hospital details.' },
                { step: '4', title: 'Save a Life', desc: 'Go to the hospital, donate blood, and earn badges on the leaderboard! 🏆' },
              ].map(s => (
                <Box key={s.step} sx={{ display: 'flex', gap: 2, mb: 3 }}>
                  <Box sx={{ background: 'linear-gradient(135deg, #c0392b, #e74c3c)',
                    borderRadius: '50%', width: 40, height: 40, minWidth: 40,
                    display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography fontWeight={900} color="white">{s.step}</Typography>
                  </Box>
                  <Box>
                    <Typography fontWeight={700} color="#1a1a1a">{s.title}</Typography>
                    <Typography color="text.secondary" fontSize={14} lineHeight={1.6}>{s.desc}</Typography>
                  </Box>
                </Box>
              ))}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" fontWeight={800} color="#c0392b" mb={3}>
                🚨 For Patients / Family
              </Typography>
              {[
                { step: '1', title: 'Click Request Blood', desc: 'Go to "Request Blood" page from the navbar or home page.' },
                { step: '2', title: 'Fill Patient Details', desc: 'Enter patient name, contact number, blood group needed, and hospital name.' },
                { step: '3', title: 'Set Location on Map', desc: 'Click on the map to pin the hospital location precisely for accurate distance matching.' },
                { step: '4', title: 'Find Donors Instantly', desc: 'Click Find Donors — AI matches compatible donors nearby and sends SMS alerts immediately!' },
              ].map(s => (
                <Box key={s.step} sx={{ display: 'flex', gap: 2, mb: 3 }}>
                  <Box sx={{ background: 'linear-gradient(135deg, #c0392b, #e74c3c)',
                    borderRadius: '50%', width: 40, height: 40, minWidth: 40,
                    display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography fontWeight={900} color="white">{s.step}</Typography>
                  </Box>
                  <Box>
                    <Typography fontWeight={700} color="#1a1a1a">{s.title}</Typography>
                    <Typography color="text.secondary" fontSize={14} lineHeight={1.6}>{s.desc}</Typography>
                  </Box>
                </Box>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Blood Facts */}
      <Box sx={{ background: '#1a1a1a', py: 10 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight={900} textAlign="center" color="white" mb={2}>
            Did You Know? 🧠
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.7)' }} textAlign="center" mb={6} fontSize={16}>
            Important facts about blood donation
          </Typography>
          <Grid container spacing={3}>
            {[
              { fact: 'Every 2 seconds', desc: 'Someone in the world needs blood', icon: '⏱️' },
              { fact: '1 donation', desc: 'Can save up to 3 lives', icon: '💉' },
              { fact: 'Only 7%', desc: 'Of people have O- (universal donor) blood', icon: '🩸' },
              { fact: '450ml', desc: 'Is the average amount donated per session', icon: '🫙' },
              { fact: '56 days', desc: 'Your body fully replenishes donated blood', icon: '📅' },
              { fact: '38%', desc: 'Of population is eligible but only 10% donate', icon: '📊' },
            ].map(f => (
              <Grid item xs={12} md={4} key={f.fact}>
                <Box sx={{ textAlign: 'center', p: 4, borderRadius: 4,
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                  '&:hover': { background: 'rgba(192,57,43,0.2)', transform: 'translateY(-4px)' },
                  transition: 'all 0.3s' }}>
                  <Typography fontSize={40} mb={2}>{f.icon}</Typography>
                  <Typography variant="h5" fontWeight={900} color="#e74c3c" mb={1}>{f.fact}</Typography>
                  <Typography color="rgba(255,255,255,0.7)">{f.desc}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA */}
      <Box sx={{ background: 'linear-gradient(135deg, #c0392b, #e74c3c)', py: 12, textAlign: 'center' }}>
        <Container maxWidth="sm">
          <Typography variant="h3" fontWeight={900} color="white" mb={2}>
            Ready to Save a Life?
          </Typography>
          <Typography color="rgba(255,255,255,0.85)" mb={5} fontSize={18} lineHeight={1.7}>
            Join thousands of donors making a difference every day.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button component={Link} to="/register" variant="contained"
              sx={{ background: '#fff', color: '#c0392b', fontWeight: 900, px: 5, py: 2,
                borderRadius: 50, fontSize: 17,
                '&:hover': { background: '#f5f5f5', transform: 'translateY(-3px)' },
                transition: 'all 0.3s' }}>
              ❤️ Become a Donor
            </Button>
            <Button component={Link} to="/info" variant="outlined"
              sx={{ borderColor: 'rgba(255,255,255,0.6)', color: '#fff', fontWeight: 700,
                px: 5, py: 2, borderRadius: 50, fontSize: 17,
                '&:hover': { background: 'rgba(255,255,255,0.1)' }, transition: 'all 0.3s' }}>
              📖 Learn More
            </Button>
          </Box>
        </Container>
      </Box>

    </Box>
  )
}