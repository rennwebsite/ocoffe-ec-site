import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { StatistikCard, PendingOrders, Kalender } from './components'

const ManageDashboard = ({ orders }) => {
  return (
    <Row className='me-3'>
      <Col xs={12} md={8}>
        <Row className='ms-1 ms-md-0'>
          <StatistikCard />
        </Row>
        <div className='mt-3 ms-3'>
          <h2>Pending Order</h2>
          <Row>
            <Col>
              {orders &&
                orders.map((order) => {
                  if (order.status === 'pending') {
                    return (
                      <div key={order.id}>
                        <PendingOrders order={order} />
                      </div>
                    )
                  }
                })}
            </Col>
          </Row>
        </div>
      </Col>
      <Col xs={12} md={4} className='mt-4 mt-md-0'>
        <Row className='ms-3 ms-md-0 bg-dark-blue rounded-3 pt-4 p-2 justify-content-center'>
          <Kalender />
        </Row>
      </Col>
    </Row>
  )
}

export default ManageDashboard
