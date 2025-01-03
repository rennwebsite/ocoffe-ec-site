import React, { useState, useEffect } from 'react'
import {
  AdminDashboard,
  UserDashboard,
  AffiliateDashboard,
  DemoDashboard,
} from '../components/dash'

const Dashboard = ({menus, fetchProducts}) => {
  const [page, setPage] = useState(null)

  useEffect(() => {
    const storedPage = localStorage.getItem('role') || ''
    setPage(storedPage)
  }, [])
  

  return (
    <div style={{ background: '#DFECF2' }}>
      {page === 'admin' ? (
        <AdminDashboard menus={menus} fetchProducts={fetchProducts} />
      ) : page === 'user' ? (
        <UserDashboard />
      ) : page === 'affiliate' ? (
        <AffiliateDashboard />
      ) : page === 'demo' ? (
        <DemoDashboard />
      ) : (
        'you must login'
      )}
    </div>
  )
}

export default Dashboard
