import React, { Component } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Container,
  Row,
  Col,
  Card,
  ListGroup,
} from "react-bootstrap";
import "./sb-admin-2.css"


class Header extends Component {
  render() {
    return (
      <Navbar bg="black" variant="dark">
        <Navbar.Brand href="#home">EDU Attention</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form>
          <FormControl inline type="text" placeholder="Search" className="mr-sm-2" />
          <Button inline variant="outline-info">Search</Button>
        </Form>
      </Navbar>
    );
  }
}

class Sidebar extends Component {
  render() {
    return (
      <ListGroup className="bg-dark list-group-flush">
        <ListGroup.Item className="bg-dark">
          <Nav.Link href="#home">Home</Nav.Link>
        </ListGroup.Item>
        <ListGroup.Item className="bg-dark">
          <Nav.Link href="#features">Features</Nav.Link>
        </ListGroup.Item>
        <ListGroup.Item className="bg-dark">
          <Nav.Link href="#actions">Actions</Nav.Link>
        </ListGroup.Item>
      </ListGroup>
    );
  }
}

class MainContent extends Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Col xs={12} md={6}>
            <Card>
              <Card.Header>Featured</Card.Header>
              <Card.Body>
                <Card.Title>Special title treatment</Card.Title>
                <Card.Text>
                  With supporting text below as a natural lead-in to additional
                  content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card>
              <Card.Header>Featured</Card.Header>
              <Card.Body>
                <Card.Title>Special title treatment</Card.Title>
                <Card.Text>
                  With supporting text below as a natural lead-in to additional
                  content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

class SbAdmin2 extends Component {
  render() {
    return (
      <div id="wrapper">
        {/* <Sidebar /> */}
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Header />
            <MainContent />
          </div>
        </div>
      </div>
    );
  }
}

export default SbAdmin2;
