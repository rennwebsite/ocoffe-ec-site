import React from 'react'
import { Navbar, Container } from 'react-bootstrap'

const GreetingBar = () => {
  // Fungsi ucapan waktu
  let today = new Date()
  let hours = today.getHours()
  let minutes = today.getMinutes()

  let waktuucapan = 'Selamat Malam 🌃' // Default
  if (hours < 23 && minutes < 59) waktuucapan = 'Selamat Malam 🌃'
  if (hours < 19) waktuucapan = 'Selamat Petang 🌆'
  if (hours < 18) waktuucapan = 'Selamat Sore 🌅'
  if (hours < 15) waktuucapan = 'Selamat Siang 🏙'
  if (hours < 10) waktuucapan = 'Selamat Pagi 🌄'
  if (hours < 5) waktuucapan = 'Selamat Subuh 🌉'
  if (hours < 3) waktuucapan = 'Tengah Malam 🌌'

  const username = localStorage.getItem('username') || 'Pengguna' // Fallback jika username kosong

  return (
    <Navbar
      style={{
        padding: '10px 20px',
        color: '#000', // Warna teks
        display: 'flex',
        justifyContent: 'space-between', // Mengatur posisi kiri-kanan
        alignItems: 'center',
      }}
      className='mt-1 mb-3'
    >
      <Container fluid>
        {/* Brand atau Nama Aplikasi */}
        <div
          style={{ fontWeight: 'bold', fontSize: '2.5rem', color: '#000' }}
        >
          {waktuucapan}, {username}
        </div>

        {/* Ucapan dan Foto */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '15px' }}>{/*icon*/}</span>
          <img
            src='https://via.placeholder.com/150' // Ganti dengan foto pengguna
            alt='User'
            className='rounded-circle'
            style={{
              width: '40px',
              height: '40px',
              objectFit: 'cover',
              border: '2px solid #fff', // Border putih untuk kontras
            }}
          />
        </div>
      </Container>
    </Navbar>
  )
}

export default GreetingBar
