// src/pages/Home
import '../App.css'
import React, { Component } from 'react'
import axios from 'axios'
import { Container, Row } from 'react-bootstrap'
import { API_URL } from '../utils/constans'
import { NavigationBar, Menus } from '../components'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menus: [],
    }
  }
  componentDidMount() {
    axios
      .get(API_URL + 'products')
      .then((res) => {
        const menus = res.data
        this.setState({ menus })
      })
      .catch((err) => {
        console.log('eror get menus\n' + err)
      })
  }
  render() {
    return (
      <>
        <NavigationBar />
        <Container>
          <Row className='mt-4'>
            {this.state.menus &&
              this.state.menus.map((menu) => {
                return <Menus key={menu.id} menu={menu} />
              })}
          </Row>
        </Container>
      </>
    )
  }
}
