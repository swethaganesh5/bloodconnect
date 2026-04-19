import { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Box, Typography, Card, CardContent, Avatar, Chip, CircularProgress } from '@mui/material'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import BloodtypeIcon from '@mui/icons-material/Bloodtype'

export default function Leaderboard() {
  const [donors, setDonors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:8000/donors')
      .then(res => {
        const sorted = res.data.sort((a, b) => b.donation_count - a.donation_count)
        setDonors(sorted)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const getMedal = (index) => {
    if (index === 0) return { emoji: '🥇', color: '#FFD700' }
    if (index === 1) return { emoji: '🥈', color: '#C0C0C0' }
    if (index === 2) return { emoji: '🥉', color: '#CD7F32' }
    return { emoji: `#${index + 1}`, color: '#c0392b' }
  }

  const getBadge = (count) => {
    if (count >= 10) return { label: '🏆 Legend', color: '#FFD700' }
    if (count >= 5) return { label: '⭐ Hero', color: '#c0392b' }
    if (count >= 2) return { label: '💪 Active', color: '#27ae60' }
    return { label: '🌱 New', color: '#3498db' }
  }

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fff5f5, #ffe4e4)', py: 8 }}>
      <Container maxWidth="sm">

        {/* Header */}
        <Box textAlign="center" mb={6}>
          <EmojiEventsIcon sx={{ fontSize: 64, color: '#FFD700', mb: 1 }} />
          <Typography variant="h4" fontWeight={800} color="#c0392b">
            Donor Leaderboard
          </Typography>
          <Typography color="text.secondary" mt={1}>
            Heroes who are saving lives 🩸
          </Typography>
        </Box>

        {/* Top 3 special cards */}
        {!loading && donors.slice(0, 3).length > 0 && (
          <Box sx={{ display: 'flex', gap: 2, mb: 4, justifyContent: 'center', flexWrap: 'wrap' }}>
            {donors.slice(0, 3).map((d, i) => {
              const medal = getMedal(i)
              return (
                <Box key={d.id} textAlign="center"
                  sx={{ background: '#fff', borderRadius: 4, p: 3, border: `2px solid ${medal.color}`,
                    boxShadow: `0 8px 25px ${medal.color}40`, minWidth: 120, flex: 1 }}>
                  <Typography fontSize={32}>{medal.emoji}</Typography>
                  <Avatar sx={{ background: `linear-gradient(135deg, #c0392b, #e74c3c)`, width: 48, height: 48,
                    fontSize: 14, fontWeight: 800, mx: 'auto', my: 1 }}>
                    {d.blood_group}
                  </Avatar>
                  <Typography fontWeight={700} fontSize={13}>{d.name}</Typography>
                  <Typography fontSize={12} color="text.secondary">{d.donation_count} donations</Typography>
                </Box>
              )
            })}
          </Box>
        )}

        {/* Full list */}
        {loading ? (
          <Box textAlign="center" py={8}>
            <CircularProgress sx={{ color: '#c0392b' }} />
          </Box>
        ) : donors.length === 0 ? (
          <Box textAlign="center" py={8}>
            <Typography color="text.secondary">No donors registered yet.</Typography>
          </Box>
        ) : (
          donors.map((d, i) => {
            const medal = getMedal(i)
            const badge = getBadge(d.donation_count)
            return (
              <Card key={d.id} elevation={0} sx={{ borderRadius: 3, mb: 2, border: '1px solid #ffe4e4',
                boxShadow: '0 4px 15px rgba(192,57,43,0.08)',
                '&:hover': { transform: 'translateY(-3px)' }, transition: 'all 0.3s' }}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2.5 }}>
                  <Typography fontSize={24} minWidth={40} textAlign="center">{medal.emoji}</Typography>
                  <Avatar sx={{ background: 'linear-gradient(135deg, #c0392b, #e74c3c)', width: 48, height: 48, fontSize: 14, fontWeight: 800 }}>
                    {d.blood_group}
                  </Avatar>
                  <Box flex={1}>
                    <Typography fontWeight={700} fontSize={15}>{d.name}</Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 0.5, flexWrap: 'wrap' }}>
                      <Chip icon={<BloodtypeIcon />} label={d.blood_group} size="small"
                        sx={{ background: '#fff5f5', color: '#c0392b', fontSize: 11 }} />
                      <Chip label={badge.label} size="small"
                        sx={{ background: badge.color, color: '#fff', fontSize: 11 }} />
                    </Box>
                  </Box>
                  <Box textAlign="center">
                    <Typography fontWeight={800} fontSize={22} color="#c0392b">{d.donation_count}</Typography>
                    <Typography fontSize={11} color="text.secondary">donations</Typography>
                  </Box>
                </CardContent>
              </Card>
            )
          })
        )}
      </Container>
    </Box>
  )
}