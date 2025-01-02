import React, { useState } from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap'
import { OrderTable } from './components'
import ModalOrder from './components/ModalOrder'
import axios from 'axios'
import { API_URL } from '../../utils/constans'

const ManageOrders = ({ orders, getOrders }) => {
  const [showModal, setShowModal] = useState(false)
  const [order, setOrder] = useState(null)

  const handleShow = (data) => {
    setShowModal(true)
    setOrder(data)
  }

  const handleClose = () => {
    setShowModal(false)
  }

  const ubahStatusOrder = async (id, status) => {
    const data = { ...order, status: status }

    try {
      await axios.put(API_URL('orders', id), data)
      alert('Status order berhasil diperbarui')
      getOrders()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Container className='my-4'>
      <Row>
        <Col md={6}>
          <h3>Order Management</h3>
        </Col>
      </Row>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Id Order</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        {orders &&
          orders.map((order) => {
            return (
              <OrderTable
                key={order.id}
                order={order}
                handleClose={handleClose}
                handleShow={handleShow}
              />
            )
          })}
        <ModalOrder
          showModal={showModal}
          handleClose={handleClose}
          order={order}
          ubahStatusOrder={ubahStatusOrder}
        />
      </Table>
    </Container>
  )
}

export default ManageOrders
