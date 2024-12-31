import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Row, Col } from 'react-bootstrap'
import {
  faChartBar,
  faListAlt,
  faStore,
  faUsers,
  faSignOut,
} from '@fortawesome/free-solid-svg-icons'

const Icon = ({ nama }) => {
  if (nama === 'ManageDashboard') return <FontAwesomeIcon icon={faChartBar} />
  if (nama === 'UserDashHome') return <FontAwesomeIcon icon={faChartBar} />
  if (nama === 'UserOrder') return <FontAwesomeIcon icon={faListAlt} />
  if (nama === 'ManageOrders') return <FontAwesomeIcon icon={faListAlt} />
  if (nama === 'ManageProducts') return <FontAwesomeIcon icon={faStore} />
  if (nama === 'ManageUsers') return <FontAwesomeIcon icon={faUsers} />
  if (nama === 'logout') return <FontAwesomeIcon icon={faSignOut} />
  return null
}

const BottomBar = ({ page, handlePutPage, navigationPage }) => {
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(0)

  const handleLogout = () => {
    localStorage.removeItem('role')
    localStorage.removeItem('username')
    navigate('/')
  }

  const handleIconClick = (index, page) => {
    setActiveIndex(index) // Simpan index aktif
    handlePutPage(page) // Panggil fungsi handlePutPage
  }

  return (
    <div
      style={{
        display: 'block',
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        backgroundColor: '#333',
      }}
      className='d-md-none p-3 text-white'
    >
      <style>
        {`
        .bottom-bar-wrapper {
          position: relative;
        }

        .bottom-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
        }

        .icon-container {
          flex-grow: 1;
          text-align: center;
          position: relative;
          cursor: pointer;
        }

        .icon-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 20%;
          height: 100%;
          border-radius: 10px;
          transition: transform 0.3s ease;
          z-index: -1;
        }

        .icon-logout:hover {
          background-color: #444;
          transition: background-color 0.3s ease;
        }
        `}
      </style>
      <Container>
        <Row className='bottom-bar-wrapper'>
          <div className='bottom-bar'>
            {/* Background bergerak */}
            <div
              className='bg-pink icon-background'
              style={{
                transform: `translateX(calc(${activeIndex * 100}% + ${
                  activeIndex === 0
                    ? '10px' // Penyesuaian untuk icon pertama
                    : activeIndex === 1
                    ? '5px' // Penyesuaian untuk icon kedua
                    : activeIndex === 2
                    ? '0px' // Icon ketiga (sudah pas)
                    : activeIndex === 3
                    ? '-5px' // Penyesuaian untuk icon keempat
                    : '0px'
                }))`,
              }}
            ></div>

            {/* Render Icon */}
            {page &&
              page.map((item, index) => (
                <Col
                  key={item.id}
                  className='icon-container'
                  onClick={() => handleIconClick(index, item.page)}
                >
                  <div className='text-white p-3'>
                    <Icon nama={item.page} />
                  </div>
                </Col>
              ))}

            {/* Logout */}
            <Col className='text-center' onClick={handleLogout}>
              <div
                className='ms-3 text-white bg-dark p-3 icon-logout'
                style={{ cursor: 'pointer', borderRadius: '10px' }}
              >
                <Icon nama='logout' />
              </div>
            </Col>
          </div>
        </Row>
      </Container>
    </div>
  )
}

export default BottomBar
