import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { ProductCard, AddProduct } from './components'
import axios from 'axios'
import { API_URL } from '../../utils/constans'

const ManageProducts = ({ menus, fetchProducts }) => {
  const [page, setPage] = useState('productsPage')
  const [products, setProducts] = useState([])
  const [newproducts, setNewproducts] = useState(null)

  // Sinkronisasi state `products` dengan `menus` dari props
  useEffect(() => {
    setProducts(menus)
  }, [menus])

  const getNewproducts = () => {
    axios
      .get(API_URL('newproducts'))
      .then((res) => {
        const data = res.data
        setNewproducts(data)
      })
      .catch((err) => {
        console.log('Error getting newproducts\n' + err)
      })
  }

  useEffect(() => {
    getNewproducts()
  }, [])

  const handleSwitchPage = (v) => {
    setPage(v)
  }

  const delProduct = (id) => {
    axios
      .delete(API_URL('products', id -1))
      .then(() => {
        alert('Sukses menghapus produk')
        fetchProducts() // Memanggil fungsi dari parent untuk memperbarui data `menus`
        // Memperbarui state `products` lokal
        setProducts((prev) => prev.filter((product) => product.id !== id))
      })
      .catch((err) => console.log('Error deleting product\n' + err))
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
              products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  delProduct={delProduct}
                />
              ))}
          </Row>
        </Container>
      ) : (
        <AddProduct
          handleSwitchPage={handleSwitchPage}
          newproducts={newproducts}
          getNewproducts={getNewproducts}
        />
      )}
    </>
  )
}

export default ManageProducts
