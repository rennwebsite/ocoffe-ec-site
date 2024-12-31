import React from 'react'
import { Button } from 'react-bootstrap'


const OrderTable = ({ order, handleShow, handleClose }) => {
  return (
    <>
      <tbody>
        <tr>
          <td>{order.name}</td>
          <td>{order.phone}</td>
          <td>{order.id}</td>
          <td>{order.date}</td>
          <td>            {order.status == 'done' ? (
              <span className='bg-success text-white text-sm px-2 p-1 rounded-4'>
                {order.status}
              </span>
            ) : (

              <span>{order.status}</span>
            )}
          </td>
          <td>
            <Button
              className='m-0 text-white'
              style={{}}
              variant="secondary"
              onClick={() => handleShow(order)}
            >
              Detail
            </Button>
          </td>
        </tr>
      </tbody>
    </>
  )
}

export default OrderTable
