import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import DashboardNavbar from '../DashboardNavbar'
import BottomBar from '../BottomBar'
import GreetingBar from '../GreetingBar'
import { UserDashHome, UserOrder } from '../UserComponents'

const UserDashboard = () => {
  const [navigationPage, setNavigationPage] = useState('UserDashHome')

  const db = {
    componentsName: [
      { 'id': 1, 'name': 'Home', 'page': 'UserDashHome' },
      { 'id': 2, 'name': 'Orders', 'page': 'UserOrder' },
    ],
  }
  const handlePutPage = (page) => {
    setNavigationPage(page)
  }

  return (
    <div style={{ minHeight: '100vh' }}>
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
          {navigationPage === 'UserDashHome' ? (
            <UserDashHome />
          ) : navigationPage === 'UserOrder' ? (
            <UserOrder />
          ) : (
            'err'
          )}
        </Col>
      </Row>
    </div>
  )
}

export default UserDashboard
