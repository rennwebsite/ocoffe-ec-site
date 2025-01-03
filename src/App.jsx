import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Cart from './components/Cart'
import { API_URL } from './utils/constans'

export default function App() {
  const [menus, setMenus] = useState([])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = () => {
    axios
      .get(API_URL('products'))
      .then((res) => {
        const data = res.data
        const dataArray = Array.isArray(data) ? data : Object.values(data)
        const filteredData = dataArray.filter((item) => item !== null) // Hilangkan null
        setMenus(filteredData)
      })
      .catch((err) => {
        console.log('Error fetching products:', err)
      })
  }
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Home menus={menus} />} exact />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route
            path='/dashboard'
            element={<Dashboard menus={menus} fetchProducts={fetchProducts} />}
          />
        </Routes>
      </div>
    </Router>
  )
}
