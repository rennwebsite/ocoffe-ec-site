import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { ProductCard, AddProduct } from './components'
import axios from 'axios'
import { API_URL } from '../../utils/constans'



  const ManageProducts = ({ products, getProducts }) => {
  const [page, setPage] = useState('productsPage')
  const [newproducts, setNewproducts] = useState(null)

  useEffect(() => {
    getNewproducts()
  }, [])

  const getNewproducts = () => {
    axios
      .get(API_URL('newproducts'))
      .then((res) => {
        const data = res.data
        setNewproducts(data)
      })
      .catch((err) => {
        console.log('error getting newproducts\n' + err)
      })
  }

  const handleSwitchPage = (v) => {
    setPage(v)
  }

  const delProduct = (id) => {
    axios
      .delete(API_URL('products', id))
      .then((res) => {
        alert('sukses menghapus produk')
        getProducts()
      })
      .catch((err) => {
        console.log('error deleting product\n' + err)
      })
  }

  return (
    <>
      {page === 'productsPage' ? (
        <Container className='my-4'>
          <Row className='justify-content-between mb-4 mb-md-2'>
            <Col xs={7} md={8}>
              <h2>Products Management</h2>
            </Col>
            <Col xs={5} md={3}>
              <Button
                className='bg-primary'
                style={{ width: '100%' }}
                onClick={() => handleSwitchPage('addProduct')}
              >
                + add product
              </Button>
            </Col>
          </Row>
          <Row>
            {products &&
              products
                .filter((product) => product !== null) // Menyaring null
                .map((product) => {
                  return (
                    <ProductCard
                      key={product.id}
                      product={product}
                      delProduct={delProduct}
                    />
                  )
                })}
          </Row>
        </Container>
      ) : (
        <>
          <AddProduct
            handleSwitchPage={handleSwitchPage}
            newproducts={newproducts}
            getNewproducts={getNewproducts}
          />
        </>
      )}
    </>
  )
}

export default ManageProducts
