import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Register from './pages/Register'
import RequestBlood from './pages/RequestBlood'
import Leaderboard from './pages/Leaderboard'
import { Toaster } from 'react-hot-toast'
import './index.css'
import Chatbot from './pages/Chatbot'
import About from './pages/About'
import Info from './pages/Info'

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/request" element={<RequestBlood />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/about" element={<About />} />
        <Route path="/info" element={<Info />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App