import '../App.css'
import React, { Component } from 'react'
import axios from 'axios'
import { Container, Row } from 'react-bootstrap'
import { API_URL } from '../utils/constans'
import { NavigationBar, Menus } from '../components'

export default class Home extends Component {
  constructor(props) {
    super(props)
    
  }

  render() {
    return (
      <>
        <NavigationBar />
        <Container>
          <Row className='mt-4'>
            {this.props.menus &&
              this.props.menus
                .filter((product) => product !== null)
                .map((menu) => {
                  return <Menus key={menu.id} menu={menu} />
                })}
          </Row>
        </Container>
      </>
    )
  }
}
