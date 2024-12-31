import React from 'react'
import {
  Modal,
  Button,
  Row,
  Col,
  Card,
  ListGroup,
  Badge,
} from 'react-bootstrap'
import { numberFormat } from '../../../utils/numberFormat'

const ModalOrder = ({ order, handleClose, showModal, ubahStatusOrder }) => {
  if (!order) {
    return null // atau bisa tampilkan message/error handler
  }

  const status = order.status === 'pending' ? 'done' : 'pending'

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Order Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          name : <strong>{order.name}</strong>
        </p>
        <p>
          phone : <strong>{order.phone}</strong>
        </p>
        <p>
          Order Id : <strong>{order.id}</strong>
        </p>
        <p>
          Date : <strong>{order.date}</strong>
        </p>
        <p>
          Address : <strong>{order.address}</strong>
        </p>
        {order.description !== '' ? (
          <p>
            description : <strong>{order.description}</strong>
          </p>
        ) : (
          ''
        )}
        <p>Menu :</p>
        <ListGroup variant='flush'>
          {order.menus.map((item) => {
            return (
              <ListGroup.Item key={item.product.id}>
                <Row>
                  <Col xs={2}>
                    <Badge pill variant='success'>
                      {item.quantity}
                    </Badge>
                  </Col>
                  <Col>
                    <h6>{item.product.name}</h6>
                    <p>Rp {numberFormat(item.product.price)}</p>
                  </Col>
                  <Col>
                    <strong className='float-right'>
                      Rp {numberFormat(item.ttlprice)}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            )
          })}
        </ListGroup>
        <h5 className='text-success text-center'>
          Total price
          <br />
          {numberFormat(order.total_price)}
        </h5>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={() => ubahStatusOrder(order.id, status)}>
          {status}
        </Button>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalOrder
