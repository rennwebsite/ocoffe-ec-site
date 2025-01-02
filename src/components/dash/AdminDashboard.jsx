import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'
import { API_URL } from '../../utils/constans'
import DashboardNavbar from '../DashboardNavbar'
import BottomBar from '../BottomBar'
import GreetingBar from '../GreetingBar'
import {
  ManageDashboard,
  ManageProducts,
  ManageOrders,
  ManageUsers,
} from '../AdminComponents'

const AdminDashboard = () => {
  const [navigationPage, setNavigationPage] = useState('ManageUsers')
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState(null)

  useEffect(() => {
    getOrders()
    getProducts()
  }, [])

  const getOrders = () => {
    axios
      .get(API_URL('orders'))
      .then((res) => {
        const data = res.data
        // Mengonversi data objek menjadi array
        const ordersArray = Object.values(data)
        setOrders(ordersArray)
      })
      .catch((err) => {
        console.log('Error getting orders\n' + err)
      })
  }

  const getProducts = () => {
    axios
      .get(API_URL('products'))
      .then((res) => {
        const data = res.data
        const dataArray = Object.values(data)
        setProducts(dataArray)
      })
      .catch((err) => {
        console.log('eror get orders\n' + err)
      })
  }
  

  const db = {
    componentsName: [
      { 'id': 1, 'name': 'Home', 'page': 'ManageDashboard' },
      { 'id': 2, 'name': 'Orders', 'page': 'ManageOrders' },
      { 'id': 3, 'name': 'products', 'page': 'ManageProducts' },
      { 'id': 4, 'name': 'User', 'page': 'ManageUsers' },
    ],
  }
  const handlePutPage = (page) => {
    setNavigationPage(page)
  }

  return (
    <div style={{ minHeight: '100vh' }} className=''>
      <BottomBar
        page={db.componentsName}
        handlePutPage={handlePutPage}
        navigationPage={navigationPage}
      />
      <Row>
        <Col xs={0} md={1}>
          {/*DashboardNavbar*/}
          <DashboardNavbar
            page={db.componentsName}
            handlePutPage={handlePutPage}
          />
        </Col>
        <Col>
          {/*AdminComponents*/}
          <GreetingBar />
          {navigationPage === 'ManageDashboard' ? (
            <ManageDashboard orders={orders} />
          ) : navigationPage === 'ManageOrders' ? (
            <ManageOrders orders={orders} getOrders={getOrders} />
          ) : navigationPage === 'ManageProducts' ? (
            <ManageProducts products={products} getProducts={getProducts} />
          ) : navigationPage === 'ManageUsers' ? (
            <ManageUsers />
          ) : (
            'err'
          )}
        </Col>
      </Row>
    </div>
  )
}

export default AdminDashboard
