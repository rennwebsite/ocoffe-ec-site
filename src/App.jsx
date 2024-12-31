import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Cart from './components/Cart'

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </div>
    </Router>
  )
}
