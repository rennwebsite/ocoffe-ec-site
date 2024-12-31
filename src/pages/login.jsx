import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../utils/constans'

const Login = () => {
  const [credentials, setCredentials] = useState({
    usernameOrEmail: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [usersData, setUsersData] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(API_URL + 'users')
      .then((res) => {
        const data = res.data
        setUsersData(data)
      })
      .catch((err) => {
        console.log('eror get usersData\n' + err)
      })
  }, [])

  const db = {
    users: usersData,
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCredentials((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const user = db.users.find(
      (u) =>
        (u.username === credentials.usernameOrEmail ||
          u.email === credentials.usernameOrEmail) &&
        u.password === credentials.password,
    )

    if (user) {
      localStorage.setItem('role', user.role) // Simpan role di localStorage
      setError('')
      alert(`Login berhasil sebagai ${user.role}`)

      const name = user.username
      localStorage.setItem('username', name)
      // Navigate to specific path
      navigate('/')
    } else {
      setError('Username/email atau password salah.')
    }
  }

  return (
    <div
      style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}
    >
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type='text'
            name='usernameOrEmail'
            placeholder='Username atau Email'
            value={credentials.usernameOrEmail}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '10px', margin: '10px 0' }}
            required
          />
        </div>
        <div>
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={credentials.password}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '10px', margin: '10px 0' }}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button
          type='submit'
          style={{ padding: '10px 20px', cursor: 'pointer' }}
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
