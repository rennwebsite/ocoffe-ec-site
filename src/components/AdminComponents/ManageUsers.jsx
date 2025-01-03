import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap'
import axios from 'axios'
import { API_URL } from '../../utils/constans'
import { UserTable } from './components'
const ManageUsers = () => {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = () => {
    axios
      .get(API_URL('users'))
      .then((res) => {
        const data = res.data
        const dataArray = Object.values(data)
        setUsers(dataArray)
      })
      .catch((err) => {
        console.log('eror get users\n' + err)
      })
  }

  const delUser = (id) => {
    axios
      .delete(API_URL('users', id -1))
      .then((res) => {
        alert('delete user successful')
        getUsers()
      })
      .catch((err) => {
        console.log('eror del users\n' + err)
      })
  }

  return (
    <Container className='my-4'>
      <Row>
        <Col md={6}>
          <h3>Users Management</h3>
        </Col>
      </Row>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>id</th>
            <th>username</th>
            <th>email</th>
            <th>password</th>
            <th>role</th>
            <th>Status</th>
            <th>delete</th>
          </tr>
        </thead>
        {users &&
          users.map((user, index) => {
            return <UserTable key={index} user={user} delUser={delUser} />
          })}
      </Table>
    </Container>
  )
}

export default ManageUsers
