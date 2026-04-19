import { Box, Container, Typography, Grid, Card, CardContent, Avatar } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import SecurityIcon from '@mui/icons-material/Security'
import SpeedIcon from '@mui/icons-material/Speed'
import PeopleIcon from '@mui/icons-material/People'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'

export default function About() {
  return (
    <Box>
      {/* Hero */}
      <Box sx={{ background: 'linear-gradient(135deg, #c0392b 0%, #e74c3c 100%)', py: 10, textAlign: 'center' }}>
        <Container maxWidth="md">
          <FavoriteIcon sx={{ fontSize: 64, color: 'white', mb: 2 }} />
          <Typography variant="h3" fontWeight={900} color="white" gutterBottom>
            About BloodConnect
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.85)', fontWeight: 400, maxWidth: 600, mx: 'auto' }}>
            An AI-powered emergency blood donor finder built to save lives — faster, smarter, and more reliably than ever before.
          </Typography>
        </Container>
      </Box>

      {/* Mission */}
      <Box sx={{ py: 10, background: '#fff' }}>
        <Container maxWidth="md">
          <Typography variant="h4" fontWeight={800} textAlign="center" color="#2d2d2d" mb={3}>
            Our Mission
          </Typography>
          <Typography variant="body1" textAlign="center" color="text.secondary" fontSize={18} lineHeight={1.8} maxWidth={700} mx="auto">
            Every year, millions of people die due to blood shortages during emergencies. 
            BloodConnect bridges the gap between blood donors and patients using 
            AI-powered matching, real-time SMS notifications, and an intelligent medical chatbot — 
            ensuring the right blood reaches the right person at the right time.
          </Typography>
        </Container>
      </Box>

      {/* Features */}
      <Box sx={{ py: 10, background: '#fff5f5' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight={800} textAlign="center" color="#2d2d2d" mb={6}>
            What Makes Us Different
          </Typography>
          <Grid container spacing={3}>
            {[
              { icon: <SmartToyIcon sx={{ fontSize: 40, color: '#c0392b' }} />, title: 'AI Donor Matching', desc: 'Our algorithm matches donors by blood compatibility AND distance — not just blood group. Finds the closest compatible donor in seconds.' },
              { icon: <NotificationsActiveIcon sx={{ fontSize: 40, color: '#c0392b' }} />, title: 'Real-time SMS Alerts', desc: 'Top 5 nearest donors get instant SMS notifications. No app download needed — works on any phone.' },
              { icon: <SpeedIcon sx={{ fontSize: 40, color: '#c0392b' }} />, title: 'Auto Fallback System', desc: 'If donors do not respond in 10 minutes, the next batch is automatically notified. No request goes unanswered.' },
              { icon: <SmartToyIcon sx={{ fontSize: 40, color: '#c0392b' }} />, title: 'RAG Medical Chatbot', desc: 'AI chatbot answers blood donation queries from verified WHO and Red Cross documents only — reducing misinformation.' },
              { icon: <SecurityIcon sx={{ fontSize: 40, color: '#c0392b' }} />, title: 'Verified Data Only', desc: 'All medical information comes from official documents. No hallucinations, no fake data — only facts.' },
              { icon: <PeopleIcon sx={{ fontSize: 40, color: '#c0392b' }} />, title: 'Donor Leaderboard', desc: 'Gamified leaderboard rewards regular donors with badges and recognition — motivating more people to donate.' },
            ].map(f => (
              <Grid item xs={12} md={4} key={f.title}>
                <Card elevation={0} sx={{ borderRadius: 4, p: 2, height: '100%', border: '1px solid #ffe4e4',
                  '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 20px 40px rgba(192,57,43,0.12)' }, transition: 'all 0.3s' }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box mb={2}>{f.icon}</Box>
                    <Typography variant="h6" fontWeight={700} mb={1}>{f.title}</Typography>
                    <Typography color="text.secondary" lineHeight={1.7}>{f.desc}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Tech Stack */}
      <Box sx={{ py: 10, background: '#fff' }}>
        <Container maxWidth="md">
          <Typography variant="h4" fontWeight={800} textAlign="center" color="#2d2d2d" mb={6}>
            Built With
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {[
              { tech: 'React', desc: 'Frontend UI' },
              { tech: 'FastAPI', desc: 'Python Backend' },
              { tech: 'Supabase', desc: 'Cloud Database' },
              { tech: 'LangChain', desc: 'RAG Pipeline' },
              { tech: 'ChromaDB', desc: 'Vector Store' },
              { tech: 'HuggingFace', desc: 'AI Embeddings' },
              { tech: 'Textbelt', desc: 'SMS Notifications' },
              { tech: 'OpenStreetMap', desc: 'Interactive Maps' },
              { tech: 'Leaflet.js', desc: 'Map Library' },
              { tech: 'Material UI', desc: 'UI Components' },
              { tech: 'Geopy', desc: 'Distance Matching' },
              { tech: 'Python', desc: 'Backend Language' },
            ].map(t => (
              <Grid item key={t.tech}>
                <Box sx={{ background: '#fff5f5', border: '1.5px solid #ffe4e4', borderRadius: 3,
                  px: 3, py: 2, textAlign: 'center', minWidth: 100 }}>
                  <Typography fontWeight={700} color="#c0392b" fontSize={15}>{t.tech}</Typography>
                  <Typography color="text.secondary" fontSize={12}>{t.desc}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Difference from existing apps */}
      <Box sx={{ py: 10, background: '#fff5f5' }}>
        <Container maxWidth="md">
          <Typography variant="h4" fontWeight={800} textAlign="center" color="#2d2d2d" mb={2}>
            How We're Different
          </Typography>
          <Typography color="text.secondary" textAlign="center" mb={6} fontSize={16}>
            Compared to existing blood donor apps in India
          </Typography>
          <Box sx={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Inter' }}>
              <thead>
                <tr style={{ background: 'linear-gradient(135deg, #c0392b, #e74c3c)' }}>
                  {['Feature', 'Existing Apps', 'BloodConnect'].map(h => (
                    <th key={h} style={{ padding: '16px', color: '#fff', fontWeight: 700, fontSize: 15, textAlign: 'center' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Donor Search', 'Manual search only', '✅ AI auto-matches'],
                  ['SMS Notifications', '❌ None', '✅ Instant SMS alerts'],
                  ['Distance Matching', '❌ No', '✅ Nearest donor first'],
                  ['Blood Compatibility', 'Basic group match', '✅ Full compatibility check'],
                  ['Medical Chatbot', '❌ None', '✅ RAG AI chatbot'],
                  ['Interactive Map', '❌ None', '✅ Click to set location'],
                  ['Donor Leaderboard', '❌ None', '✅ Gamified badges'],
                  ['Hallucination-free AI', '❌ None', '✅ Document-based only'],
                ].map(([feature, existing, ours], i) => (
                  <tr key={feature} style={{ background: i % 2 === 0 ? '#fff' : '#fff9f9' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 600, color: '#1a1a1a', fontSize: 14 }}>{feature}</td>
                    <td style={{ padding: '14px 16px', color: '#888', fontSize: 14, textAlign: 'center' }}>{existing}</td>
                    <td style={{ padding: '14px 16px', color: '#c0392b', fontWeight: 600, fontSize: 14, textAlign: 'center' }}>{ours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Container>
      </Box>

      {/* Builder */}
      <Box sx={{ py: 10, background: 'linear-gradient(135deg, #c0392b, #e74c3c)', textAlign: 'center' }}>
        <Container maxWidth="sm">
          <Avatar sx={{ width: 80, height: 80, background: 'rgba(255,255,255,0.2)', mx: 'auto', mb: 3, fontSize: 32 }}>
            S
          </Avatar>
          <Typography variant="h5" fontWeight={800} color="white" mb={1}>
            Built by Swetha G
          </Typography>
          <Typography color="rgba(255,255,255,0.85)" fontSize={16}>
            B.E Electronics & Communication Engineering
          </Typography>
          <Typography color="rgba(255,255,255,0.7)" fontSize={14} mt={1}>
            R.M.D Engineering College, Chennai
          </Typography>
          <Typography color="rgba(255,255,255,0.85)" fontSize={15} mt={3} lineHeight={1.8}>
            "I built BloodConnect because blood shortage during emergencies is a real problem in India. 
            I wanted to use AI to make the process faster and more intelligent."
          </Typography>
        </Container>
      </Box>

    </Box>
  )
}