import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
  if (nama === 'ManageOrders') return <FontAwesomeIcon icon={faListAlt} />
  if (nama === 'ManageProducts') return <FontAwesomeIcon icon={faStore} />
  if (nama === 'UserOrder') return <FontAwesomeIcon icon={faStore} />
  if (nama === 'ManageUsers') return <FontAwesomeIcon icon={faUsers} />
  if (nama === 'logout') return <FontAwesomeIcon icon={faSignOut} />
  return null
}

const DashboardNavbar = ({ page, handlePutPage }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('role')
    localStorage.removeItem('username')
    navigate('/')
  }
  return (
    <div
      className='d-md-block pt-4 my-2 ms-2 text-center bg-dark rounded-4'
      style={{ height: '85vh', color: 'white', display: 'none' }}
    >
      <h6>role</h6>
      <ListGroup variant='flush' className='mt-3'>
        {page &&
          page.map((item) => (
            <ListGroup.Item
              key={item.id}
              onClick={() => handlePutPage(item.page)}
              className='text-white bg-dark'
            >
              <Icon nama={item.page} />
            </ListGroup.Item>
          ))}
        <ListGroup.Item
          onClick={() => handleLogout()}
          className='text-white bg-dark'
          style={{ rotate: '180deg' }}
        >
          <Icon nama='logout' />
        </ListGroup.Item>
      </ListGroup>
    </div>
  )
}

export default DashboardNavbar
