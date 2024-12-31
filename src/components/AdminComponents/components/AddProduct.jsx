import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import ImageUploader from '../../ImageUploader'
import { Form, Button, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import { API_URL } from '../../../utils/constans'

const AddProduct = ({ handleSwitchPage, newproducts, getNewproducts }) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    price: '',
    image: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const productData = {
      id: newproducts.length + 1,
      name: formData.name,
      code: formData.code,
      price: formData.price,
      image: formData.image,
    }

    axios
      .post(API_URL + 'newproducts', productData)
      .then((res) => {
        alert('Product placed successfully!')
        getNewproducts()
      })
      .catch((err) => {
        console.error('Error placing Product:', err)
        alert('An error occurred while placing the Product.')
      })
  }

  return (
    <>
      <Row>
        <Col md={6}>
          <Button
            className='border-0 bg-pink'
            onClick={() => handleSwitchPage('productsPage')}
          >
            &lt; back
          </Button>
        </Col>
      </Row>
      <Container className='mt-5'>
        <ImageUploader />
        <Row className='justify-content-center'>
          <Col md={8}>
            <Form className='mt-5 p-4 shadow rounded' onSubmit={handleSubmit}>
              <h2 className='mb-4 text-center'>Add Product</h2>

              <Row className='mb-3'>
                <Col md={6}>
                  <Form.Group className='mb-3'>
                    <Form.Label>Name of product</Form.Label>
                    <Form.Control
                      type='text'
                      name='name'
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder='Enter name of product'
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>image url</Form.Label>
                    <Form.Control
                      type='text'
                      name='image'
                      value={formData.image}
                      onChange={handleInputChange}
                      required
                      placeholder='Enter image url'
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className='mb-3'>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>price</Form.Label>
                    <Form.Control
                      type='number'
                      name='price'
                      value={formData.price}
                      onChange={handleInputChange}
                      rows={3}
                      required
                      placeholder='Enter product price'
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Code</Form.Label>
                    <Form.Control
                      type='text'
                      name='code'
                      value={formData.code}
                      onChange={handleInputChange}
                      required
                      placeholder='Enter product code'
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button type='submit' className='w-100 mt-4 bg-pink'>
                Submit Order
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default AddProduct
