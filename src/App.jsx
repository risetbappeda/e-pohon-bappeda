import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Detail from './pages/Detail'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tanaman/:id" element={<Detail />} />
      {/* Redirect semua route tidak dikenal ke home */}
      <Route path="*" element={<Home />} />
    </Routes>
  )
}
