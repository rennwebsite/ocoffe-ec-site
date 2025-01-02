import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { Form, Button, Alert, Card, Container } from 'react-bootstrap'
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
      .get(API_URL('users'))
      .then((res) => {
        const data = res.data
        const dataArray = Object.values(data)
        setUsersData(dataArray)
      })
      .catch((err) => {
        console.log('Error fetching users data:', err)
      })
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCredentials((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const user = usersData?.find(
      (u) =>
        (u.username === credentials.usernameOrEmail ||
          u.email === credentials.usernameOrEmail) &&
        u.password === credentials.password,
    )

    if (user) {
      localStorage.setItem('role', user.role)
      localStorage.setItem('username', user.username)
      setError('')
      alert(`Login berhasil sebagai ${user.role}`)
      navigate('/dashboard')
    } else {
      setError('Username/email atau password salah.')
    }
  }

  return (
    <Container
      className='d-flex justify-content-center align-items-center'
      style={{ minHeight: '100vh' }}
    >
      <Card style={{ width: '100%', maxWidth: '400px', padding: '20px' }}>
        <Card.Body>
          <h3 className='text-center'>Login</h3>
          <Form onSubmit={handleSubmit}>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form.Group controlId='formUsernameOrEmail'>
              <Form.Label>Username atau Email</Form.Label>
              <Form.Control
                type='text'
                name='usernameOrEmail'
                placeholder='Masukkan username atau email'
                value={credentials.usernameOrEmail}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId='formPassword' className='mt-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                name='password'
                placeholder='Masukkan password'
                value={credentials.password}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Button variant='primary' type='submit' className='mt-4 w-100'>
              Login
            </Button>
          </Form>
          <div className='text-center mt-3'>
            <p>
              Don't have an account?{' '}
              <Link to='/signup' className='text-primary'>
                Signup
              </Link>
            </p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Login
