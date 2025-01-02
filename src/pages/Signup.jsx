import React, { useState } from 'react'
import { Button, Form, Alert, Card, Container } from 'react-bootstrap'
import axios from 'axios'
import { API_URL } from '../utils/constans'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const handleSignup = async (e) => {
  e.preventDefault()

  // Reset error sebelum memulai
  setError('')

  try {
    setLoading(true)

    // Ambil data users dari API
    const { data: users } = await axios.get(API_URL('users'))

    // Cek apakah username atau email sudah terdaftar
    const userExists = users.some(
      (user) => user.username === username || user.email === email,
    )

    if (userExists) {
      // Jika username atau email sudah terdaftar, tampilkan error
      setError('Username atau Email sudah terdaftar')
      setLoading(false)
      return
    }

    // Hitung id baru berdasarkan panjang data users
    const newId = users.length + 1

    // Kirim data ke API jika username dan email belum terdaftar
    await axios.post(API_URL('users'), {
      id: newId,
      username,
      email,
      password,
      role: 'user', // Role default
      status: 'active',
    })

    alert('Registrasi berhasil! Silakan login.')

    // Reset form setelah berhasil
    setUsername('')
    setEmail('')
    setPassword('')
    setLoading(false)
  } catch (err) {
    console.log('Error signup:', err)
    setError('Terjadi kesalahan saat mendaftar, coba lagi nanti.')
    setLoading(false)
  }
}


  return (
    <Container
      className='d-flex justify-content-center align-items-center'
      style={{ minHeight: '100vh' }}
    >
      <Card
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h3 className='text-center mb-4'>Create an Account</h3>
        <Form onSubmit={handleSignup}>
          {error && <Alert variant='danger'>{error}</Alert>}

          <Form.Group controlId='formUsername' className='mb-3'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter your username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId='formEmail' className='mb-3'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId='formPassword' className='mb-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button
            variant='primary'
            type='submit'
            disabled={loading}
            className='w-100'
            style={{ borderRadius: '5px', backgroundColor: '#007bff' }}
          >
            {loading ? 'Loading...' : 'Sign Up'}
          </Button>
        </Form>

        <p className='text-center mt-3'>
          Already have an account?{' '}
          <a href='/login' style={{ color: '#007bff', textDecoration: 'none' }}>
            Log in
          </a>
        </p>
      </Card>
    </Container>
  )
}

export default Signup
