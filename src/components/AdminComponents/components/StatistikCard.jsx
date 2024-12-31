import { Col, Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEye,
  faClock,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons'
import Runtime from './Runtime'

const Icon = ({ nama }) => {
  const defaultStyle = {
    height: '20px',
    width: '20px',
    marginBottom: '1px',
    color: '#333333',
  }

  if (nama === 'visitor')
    return <FontAwesomeIcon icon={faEye} style={{ ...defaultStyle }} />
  if (nama === 'runtime')
    return <FontAwesomeIcon icon={faClock} style={{ ...defaultStyle }} />
  if (nama === 'ordered')
    return <FontAwesomeIcon icon={faCheckCircle} style={{ ...defaultStyle }} />
  return null
}

const StatistikCard = () => {
  const iconWrapper = {
    height: '50px !important',
    width: '50px !important',
    display: 'flex',
    borderRadius: '50%',
    border: '1px solid #666666',
  }
  const styleCenter = { alignItems: 'center', justifyContent: 'center' }

  return (
    <>
      {/*visitor*/}
      <Col xs={4}>
        <Card className='bg-dark-blue p-2 text-center border-0'>
          <Card.Body
            style={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div
              className='p-2 m-0'
              style={{
                ...iconWrapper,
                ...styleCenter,
              }}
            >
              <Icon nama='visitor' />
            </div>
            <div>
              <Card.Title>Title Here</Card.Title>
              <Card.Text>Description</Card.Text>
            </div>
          </Card.Body>
        </Card>
      </Col>
      {/*runtime*/}
      <Col xs={4}>
        <Card className='bg-dark-blue p-2 text-center border-0'>
          <Card.Body
            style={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div
              className='p-2 m-0'
              style={{
                ...iconWrapper,
                ...styleCenter,
              }}
            >
              <Icon nama='runtime' />
            </div>
            <div>
              <Card.Title>
                <Runtime />
              </Card.Title>
              <Card.Text>Runtime</Card.Text>
            </div>
          </Card.Body>
        </Card>
      </Col>
      {/*ordered*/}
      <Col xs={4}>
        <Card className='bg-dark-blue p-2 text-center border-0'>
          <Card.Body
            style={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div
              className='p-2 m-0'
              style={{
                ...iconWrapper,
                ...styleCenter,
              }}
            >
              <Icon nama='ordered' />
            </div>
            <div>
              <Card.Title>Title Here</Card.Title>
              <Card.Text>Ordered</Card.Text>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </>
  )
}

export default StatistikCard
