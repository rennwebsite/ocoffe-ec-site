import React from 'react'
import { Col, Card, Button } from 'react-bootstrap'

const ProductCard = ({ product, delProduct}) => {
  return (
    <Col sm={6} md={4} className='mb-4'>
      <Card
        style={{ width: 'auto' }}
        className='bg-dark-blue border-0 rounded-4'
      >
        <Card.Img
          variant='top'
          className='rounded-top-4'
          style={{ height: '160px' }}
          src={
            'https://raw.githubusercontent.com/rennwebsite/ec-site/refs/heads/main/public/images/product/' +
            product.image
          }
        />
        <Card.Body>
          <Card.Title>
            {product.name} ({product.code})
          </Card.Title>
          <Card.Text>Rp. {product.price}</Card.Text>
          <Button
            className='text-white border-0 rounded-3'
            size='md'
            style={{ background: '#9580F7' }}
          >
            Edit
          </Button>
          <Button
            className='text-white border-0 rounded-3 ms-2'
            size='md'
            style={{ background: '#EF476F' }}
            onClick={() => delProduct(product.id) }
          >
            Delete
          </Button>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default ProductCard
