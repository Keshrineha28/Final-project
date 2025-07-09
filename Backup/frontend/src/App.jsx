import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login'
import Upload from './pages/Upload'
import VideoPlayer from './pages/VideoPlayer'
import Navbar from './components/Navbar'
import Register from './pages/Register';
import Logout from './pages/Logout';

function App() {
  return (
    <BrowserRouter>
     <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/video/:id" element={<VideoPlayer />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
