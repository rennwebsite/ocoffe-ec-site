//src/components/Cart
import React, { useState, useEffect, useCallback } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import OrderForm from './OrderForm'
import { NavigationBar } from '../components'
import { numberFormat } from '../utils/numberFormat'

const Cart = () => {
  const [cart, setCart] = useState([])

  useEffect(() => {
    const updateCartFromStorage = () => {
      const storedCart = JSON.parse(localStorage.getItem('cart')) || []
      setCart(storedCart)
    }
    updateCartFromStorage()

    // Dengarkan event 'cartUpdated'
    window.addEventListener('cartUpdated', updateCartFromStorage)

    // Cleanup listener saat komponen di-unmount
    return () => {
      window.removeEventListener('cartUpdated', updateCartFromStorage)
    }
  }, [])

  const removeFromCart = useCallback(
    (id) => {
      const updatedCart = cart.filter((item) => item.id !== id)
      setCart(updatedCart)
      localStorage.setItem('cart', JSON.stringify(updatedCart))
    },
    [cart],
  )

  const updateCart = useCallback(
    (id, newQuantity) => {
      if (newQuantity <= 0) return

      const updatedCart = cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: newQuantity,
              ttlprice: newQuantity * item.product.price,
            }
          : item,
      )
      setCart(updatedCart)
      localStorage.setItem('cart', JSON.stringify(updatedCart))
    },
    [cart],
  )

  const handleOrderPlaced = useCallback(() => {
    setCart([])
    localStorage.removeItem('cart')
  }, [])

  return (
    <>
      <NavigationBar />
      <Container className='mt-4'>
        <h1 className='mb-4 text-center'>Shopping Cart</h1>
        {cart.length === 0 ? (
          <p className='text-center text-muted'>Your cart is empty.</p>
        ) : (
          <>
            <Row>
              {cart.map((item) => (
                <Col key={item.id} xs={12} md={6} lg={4} className='mb-4'>
                  <Card className='hover-top border-0 rounded-4'>
                    <Card.Img
                      variant='top'
                      src={'/images/product/' + item.product.image}
                      style={{
                        height: '150px',
                        objectFit: 'cover',
                      }}
                      className='rounded-4'
                    />
                    <Card.Body>
                      <Card.Title>{item.product.name}</Card.Title>
                      <Card.Text>Price: Rp {numberFormat(item.product.price)}</Card.Text>
                      <Card.Text>Total Price: Rp {numberFormat((item.ttlprice))}</Card.Text>
                      <div className='d-flex align-items-center gap-2'>
                        <Button
                          variant='outline-secondary'
                          size='sm'
                          onClick={() => updateCart(item.id, item.quantity - 1)}
                        >
                          -
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          variant='outline-secondary'
                          size='sm'
                          onClick={() => updateCart(item.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                        <Button
                          variant='danger'
                          size='sm'
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}
        <OrderForm cart={cart} onOrderPlaced={handleOrderPlaced} />
      </Container>
    </>
  )
}

export default Cart
