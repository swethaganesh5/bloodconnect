import { Link, useLocation } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'

export default function Navbar() {
  const location = useLocation()

const navItems = [
  { label: 'Donate', path: '/register' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Guide', path: '/info' },
  { label: 'AI Assistant', path: '/chatbot' },
  { label: 'About', path: '/about' },
]

  return (
    <AppBar position="sticky" elevation={0}
      sx={{ background: '#fff', borderBottom: '1px solid #ffe4e4' }}>
      <Toolbar sx={{ maxWidth: '1100px', width: '100%', margin: '0 auto', px: 3, py: 1 }}>
        
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}
          component={Link} to="/" style={{ textDecoration: 'none' }}>
          <FavoriteIcon sx={{ color: '#c0392b', fontSize: 28 }} />
          <Typography variant="h6" fontWeight={900} color="#c0392b"
            sx={{ fontFamily: 'Inter', letterSpacing: '-0.5px' }}>
            BloodConnect
          </Typography>
        </Box>

        {/* Nav links */}
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          {navItems.map(item => (
            <Button key={item.path} component={Link} to={item.path}
              sx={{
                color: location.pathname === item.path ? '#c0392b' : '#555',
                fontWeight: location.pathname === item.path ? 700 : 500,
                fontSize: 14,
                fontFamily: 'Inter',
                borderRadius: 2,
                px: 2,
                background: location.pathname === item.path ? '#fff5f5' : 'transparent',
                '&:hover': { background: '#fff5f5', color: '#c0392b' },
                transition: 'all 0.2s'
              }}>
              {item.label}
            </Button>
          ))}
          <Button component={Link} to="/request" variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #c0392b, #e74c3c)',
              color: '#fff', fontWeight: 700, fontSize: 14,
              fontFamily: 'Inter', borderRadius: 50, px: 3, py: 1,
              boxShadow: '0 4px 15px rgba(192,57,43,0.35)',
              '&:hover': { transform: 'translateY(-1px)', boxShadow: '0 6px 20px rgba(192,57,43,0.4)' },
              transition: 'all 0.2s', ml: 1
            }}>
            🚨 Request Blood
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}