import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const DevelopmentPage = () => {
  return (
    <Container className='d-flex justify-content-center vh-100 bg-transparent'>
      <Row className='text-center pt-4'>
        <Col>
          <h1 className='text-warning mb-3'>
            Website Sedang Dalam Pengembangan
          </h1>
          <img
            src='https://via.placeholder.com/400x300?text=Under+Development'
            alt='Under Development'
            className='img-fluid mb-4'
          />
          <p className='lead mb-4'>
            Halaman ini sedang dalam tahap pengembangan. Kami sedang bekerja
            keras untuk menyelesaikan situs ini. Harap tunggu beberapa saat
            hingga kami siap meluncurkannya.
          </p>
          <Button
            variant='primary'
            size='lg'
            onClick={() => window.location.href = '/'}
          >
            back to home
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default DevelopmentPage
