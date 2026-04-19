import { useState } from 'react'
import { Box, Container, Typography, Grid, Card, CardContent, Accordion, AccordionSummary, AccordionDetails, Chip } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const compatibility = [
  { group: 'A+', canGiveTo: ['A+', 'AB+'], canReceiveFrom: ['A+', 'A-', 'O+', 'O-'] },
  { group: 'A-', canGiveTo: ['A+', 'A-', 'AB+', 'AB-'], canReceiveFrom: ['A-', 'O-'] },
  { group: 'B+', canGiveTo: ['B+', 'AB+'], canReceiveFrom: ['B+', 'B-', 'O+', 'O-'] },
  { group: 'B-', canGiveTo: ['B+', 'B-', 'AB+', 'AB-'], canReceiveFrom: ['B-', 'O-'] },
  { group: 'O+', canGiveTo: ['A+', 'B+', 'O+', 'AB+'], canReceiveFrom: ['O+', 'O-'] },
  { group: 'O-', canGiveTo: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'], canReceiveFrom: ['O-'] },
  { group: 'AB+', canGiveTo: ['AB+'], canReceiveFrom: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'] },
  { group: 'AB-', canGiveTo: ['AB+', 'AB-'], canReceiveFrom: ['A-', 'B-', 'O-', 'AB-'] },
]

const faqs = [
  { q: 'Who can donate blood?', a: 'Anyone aged 18-65, weighing more than 50kg, and in good health can donate blood. You must not have donated in the last 3 months.' },
  { q: 'Does blood donation hurt?', a: 'You may feel a small pinch when the needle is inserted, but the process is generally painless. The entire donation takes about 10-15 minutes.' },
  { q: 'How often can I donate blood?', a: 'Whole blood can be donated every 3 months (90 days). Platelets can be donated every 2 weeks.' },
  { q: 'Can I donate if I have diabetes?', a: 'People with well-controlled diabetes (diet or tablets) can donate. Those on insulin should consult a doctor before donating.' },
  { q: 'What should I eat before donating?', a: 'Eat a healthy meal and drink plenty of water before donating. Avoid fatty foods. Do not donate on an empty stomach.' },
  { q: 'How does BloodConnect match donors?', a: 'Our AI algorithm matches donors by blood group compatibility AND distance from the hospital. The nearest compatible donors are notified first via SMS.' },
  { q: 'Is my data safe on BloodConnect?', a: 'Yes! We use Supabase with secure encryption. Your phone number is only shared with patients in genuine emergencies.' },
  { q: 'What is the RAG chatbot?', a: 'Our AI chatbot answers blood donation questions using only verified WHO and Red Cross medical documents — ensuring accurate, hallucination-free answers.' },
]

const eligibility = [
  { criteria: 'Age', eligible: '18 - 65 years', icon: '🎂' },
  { criteria: 'Weight', eligible: 'More than 50 kg', icon: '⚖️' },
  { criteria: 'Hemoglobin', eligible: 'Min 12.5 g/dL', icon: '🩸' },
  { criteria: 'Gap between donations', eligible: 'Every 90 days', icon: '📅' },
  { criteria: 'Blood pressure', eligible: '80/60 to 160/100', icon: '💓' },
  { criteria: 'Temperature', eligible: 'Normal (below 37.5°C)', icon: '🌡️' },
]

export default function Info() {
  const [selected, setSelected] = useState(null)

  return (
    <Box sx={{ fontFamily: 'Inter' }}>

      {/* Hero */}
      <Box sx={{ background: 'linear-gradient(135deg, #c0392b, #e74c3c)', py: 8, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight={900} color="white" mb={2}>
            Blood Donation Guide 🩸
          </Typography>
          <Typography color="rgba(255,255,255,0.85)" fontSize={18}>
            Everything you need to know about blood donation, compatibility, and eligibility
          </Typography>
        </Container>
      </Box>

      {/* Compatibility Chart */}
      <Box sx={{ py: 10, background: '#fff' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight={900} textAlign="center" color="#1a1a1a" mb={2}>
            Blood Group Compatibility Chart
          </Typography>
          <Typography color="text.secondary" textAlign="center" mb={6} fontSize={16}>
            Click on any blood group to see who they can donate to and receive from
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {compatibility.map(b => (
              <Grid item xs={6} md={3} key={b.group}>
                <Card elevation={0} onClick={() => setSelected(selected?.group === b.group ? null : b)}
                  sx={{
                    borderRadius: 4, p: 1, cursor: 'pointer', textAlign: 'center',
                    border: selected?.group === b.group ? '2px solid #c0392b' : '1px solid #ffe4e4',
                    background: selected?.group === b.group ? '#fff5f5' : '#fff',
                    '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 30px rgba(192,57,43,0.15)' },
                    transition: 'all 0.3s'
                  }}>
                  <CardContent>
                    <Box sx={{ background: 'linear-gradient(135deg, #c0392b, #e74c3c)', borderRadius: '50%',
                      width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      mx: 'auto', mb: 2 }}>
                      <Typography fontWeight={900} color="white" fontSize={18}>{b.group}</Typography>
                    </Box>
                    <Typography fontSize={12} color="text.secondary">Click to see compatibility</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {selected && (
            <Box sx={{ mt: 4, p: 4, background: '#fff5f5', borderRadius: 4, border: '1px solid #ffe4e4' }}>
              <Typography variant="h5" fontWeight={800} color="#c0392b" mb={3} textAlign="center">
                {selected.group} Blood Group
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Typography fontWeight={700} mb={2} color="#1a1a1a">✅ Can Donate To:</Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {selected.canGiveTo.map(g => (
                      <Chip key={g} label={g} sx={{ background: '#c0392b', color: '#fff', fontWeight: 700 }} />
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography fontWeight={700} mb={2} color="#1a1a1a">💉 Can Receive From:</Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {selected.canReceiveFrom.map(g => (
                      <Chip key={g} label={g} sx={{ background: '#27ae60', color: '#fff', fontWeight: 700 }} />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </Container>
      </Box>

      {/* Eligibility */}
      <Box sx={{ py: 10, background: '#fff5f5' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight={900} textAlign="center" color="#1a1a1a" mb={2}>
            Are You Eligible to Donate?
          </Typography>
          <Typography color="text.secondary" textAlign="center" mb={6} fontSize={16}>
            Basic criteria to donate blood safely
          </Typography>
          <Grid container spacing={3}>
            {eligibility.map(e => (
              <Grid item xs={12} md={4} key={e.criteria}>
                <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid #ffe4e4', background: '#fff',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 30px rgba(192,57,43,0.12)' },
                  transition: 'all 0.3s' }}>
                  <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography fontSize={40}>{e.icon}</Typography>
                    <Box>
                      <Typography fontWeight={700} color="#1a1a1a">{e.criteria}</Typography>
                      <Typography color="#c0392b" fontWeight={600} fontSize={15}>{e.eligible}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Emergency Contacts */}
      <Box sx={{ py: 10, background: '#fff' }}>
        <Container maxWidth="md">
          <Typography variant="h4" fontWeight={900} textAlign="center" color="#1a1a1a" mb={2}>
            Emergency Blood Contacts 📞
          </Typography>
          <Typography color="text.secondary" textAlign="center" mb={6} fontSize={16}>
            Call these numbers for urgent blood requirements
          </Typography>
          <Grid container spacing={3}>
            {[
              { name: 'National Blood Transfusion Council', number: '1800-180-1104', icon: '🇮🇳', free: true },
              { name: 'Red Cross Blood Bank', number: '011-23711551', icon: '🏥', free: false },
              { name: 'eRaktKosh (Govt of India)', number: '104', icon: '💉', free: true },
              { name: 'Apollo Blood Bank', number: '1860-500-1066', icon: '🏨', free: false },
              { name: 'AIIMS Blood Bank Delhi', number: '011-26588500', icon: '🔬', free: false },
              { name: 'Emergency Ambulance', number: '108', icon: '🚑', free: true },
            ].map(c => (
              <Grid item xs={12} md={6} key={c.name}>
                <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #ffe4e4',
                  '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 10px 25px rgba(192,57,43,0.1)' },
                  transition: 'all 0.3s' }}>
                  <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 3 }}>
                    <Typography fontSize={36}>{c.icon}</Typography>
                    <Box flex={1}>
                      <Typography fontWeight={700} fontSize={14} color="#1a1a1a">{c.name}</Typography>
                      <Typography fontWeight={900} fontSize={20} color="#c0392b">{c.number}</Typography>
                    </Box>
                    {c.free && <Chip label="FREE" size="small" sx={{ background: '#27ae60', color: '#fff', fontWeight: 700 }} />}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FAQ */}
      <Box sx={{ py: 10, background: '#fff5f5' }}>
        <Container maxWidth="md">
          <Typography variant="h4" fontWeight={900} textAlign="center" color="#1a1a1a" mb={2}>
            Frequently Asked Questions ❓
          </Typography>
          <Typography color="text.secondary" textAlign="center" mb={6} fontSize={16}>
            Everything you want to know about blood donation
          </Typography>
          {faqs.map((f, i) => (
            <Accordion key={i} elevation={0} sx={{ mb: 2, borderRadius: '12px !important', border: '1px solid #ffe4e4',
              '&:before': { display: 'none' }, overflow: 'hidden' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#c0392b' }} />}
                sx={{ background: '#fff', fontWeight: 700, color: '#1a1a1a' }}>
                <Typography fontWeight={700}>{f.q}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ background: '#fff9f9', color: '#555', lineHeight: 1.7 }}>
                {f.a}
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Box>

    </Box>
  )
}