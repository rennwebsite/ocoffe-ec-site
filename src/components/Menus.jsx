// src/components/Menus
import React from 'react'
import { Col, Card, Button } from 'react-bootstrap'

const Menus = ({ menu }) => {
  // Fungsi untuk menambahkan item ke cart
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || []

    const updatedCart = cart.map((item) =>
      item.product.id === menu.id
        ? {
            ...item,
            quantity: item.quantity + 1,
            ttlprice: (item.quantity + 1) * item.product.price,
          }
        : item,
    )

    const newCart = cart.find((item) => item.product.id === menu.id)
      ? updatedCart
      : [
          ...cart,
          {
            id: `cart-${menu.id}`,
            ttlprice: menu.price,
            quantity: 1,
            product: menu,
          },
        ]

    localStorage.setItem('cart', JSON.stringify(newCart))

    // Kirim custom event untuk memberitahu Cart
    window.dispatchEvent(new Event('cartUpdated'))

    alert(`${menu.name} has been added to the cart!`)
  }

  return (
    <Col sm={6} md={4} lg={3} className='mb-4'>
      <Card style={{ width: 'auto' }} className='border-0 hover-top rounded-4'>
        <Card.Img
          variant='top'
          className='rounded-4'
          src={
            'https://raw.githubusercontent.com/rennwebsite/ec-site/refs/heads/main/public/images/product/' +
            menu.image
          }
        />
        <Card.Body>
          <Card.Title>{menu.name}</Card.Title>
          <Card.Text>Rp. {menu.price}</Card.Text>
          <Button
            className='text-sc btn-p border-0 rounded-3'
            size='sm'
            onClick={addToCart}
          >
            Add to Cart
          </Button>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default Menus
//src={'/images/product/' + menu.image}