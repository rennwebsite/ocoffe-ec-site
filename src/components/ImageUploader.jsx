// src/components/ImageUploader.js
import React, { useState } from 'react'
import axios from 'axios'
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Image,
  Alert,
} from 'react-bootstrap'

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [imageUrl, setImageUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [url, setUrl] = useState('(link unavailable)')
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const imgbbAPIKey = '455b71ea7e009a552a7b5d55dac1dcfb'

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0])
    setImageUrl('')
    setError('')
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select an image first.')
      return
    }

    setIsLoading(true)
    setError('')

    const formData = new FormData()
    formData.append('key', imgbbAPIKey)
    formData.append('image', selectedFile)

    try {
      const response = await axios.post(
        'https://api.imgbb.com/1/upload',
        formData,
      )
      setUrl(response.data.data.url)
      setImageUrl(response.data.data.url)
    } catch (err) {
      setError('Failed to upload image. Please try again.')
    } finally {
      setIsLoading(false)
      console.log('done upload')
    }
  }

  return (
    <>
      <Row className='justify-content-center'>
        <Col md={5}>
          <h4 className='text-center'>Upload Image to imgbb (img to url)</h4>
          <Form>
            <Form.Group controlId='formFile' className='mb-3'>
              <Form.Label>Select an Image</Form.Label>
              <Form.Control type='file' onChange={handleFileChange} />
            </Form.Group>
            <Button
              onClick={handleUpload}
              disabled={isLoading}
              className='w-100 bg-pink'
            >
              {isLoading ? <Spinner animation='border' size='sm' /> : 'Upload'}
            </Button>
          </Form>
          {error && (
            <Alert variant='danger' className='mt-3'>
              {error}
            </Alert>
          )}
          {imageUrl && (
            <div className='mt-3 text-center'>
              <p>Uploaded Image:</p>
              <Image src={imageUrl && imageUrl} alt='Uploaded' />
              <Alert variant='success' className='mt-3'>
                <strong>Image URL:</strong>{' '}
                <a href={imageUrl} target='_blank' rel='noreferrer'>
                  {imageUrl}
                </a>
                <input type='text' value={imageUrl} readOnly />
                <button onClick={handleCopy}>
                  {copied ? 'Tercopy!' : 'Copy URL'}
                </button>
              </Alert>
            </div>
          )}
        </Col>
      </Row>
    </>
  )
}

export default ImageUploader
