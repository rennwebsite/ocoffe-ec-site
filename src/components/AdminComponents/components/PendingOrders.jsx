import React from 'react'
import { Card, Button } from 'react-bootstrap'

const PendingOrders = ({ order }) => {
  return (
    <>
      <Card className='bg-dark-blue px-2 p-0 border-0 mb-3'>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto auto auto auto auto auto', // Kolom untuk setiap elemen
            alignItems: 'center', // Vertikal tengah
            justifyContent: 'space-between', // Atur spasi antar elemen
          }}
          className='p-2 text-dark' // Tambahkan padding dan warna teks
        >
          <img
            src='https://via.placeholder.com/150' // Ganti dengan foto pengguna
            alt='User'
            className='rounded-circle'
            style={{
              width: '40px',
              height: '40px',
              border: '2px solid #fff', // Border putih untuk kontras
            }}
          />
          <p className='m-0 text-center'>{order.name}</p>
          <p className='m-0 text-center'>{order.phone}</p>
          <p className='m-0 text-center'>{order.id}</p>
          <p className='m-0 text-center'>{order.date}</p>
          <div
            className='text-center
          '
          >
            <Button
              size='sm'
              className='m-0 text-white bg-pink'
              
              
              
            >
              Order detail
            </Button>
          </div>
        </div>
      </Card>
    </>
  )
}

export default PendingOrders
