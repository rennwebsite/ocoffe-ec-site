import { Navbar, Nav, Container } from "react-bootstrap"

const NavigationBar = () => {
  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand href="#home">
          <strong>e comerce</strong>
        </Navbar.Brand>
        <Nav className="text-white">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/">Menu</Nav.Link>
          <Nav.Link href="/cart">Cart</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavigationBar
