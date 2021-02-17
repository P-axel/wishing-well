import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import logo from './logo.png';
import './navi.scss';

const Navi = () => (
  <div className="navi">
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed=" top ">
      <Navbar.Brand href="#home">
        <Nav.Link href="/"><img className="navi_logo" src={logo} alt="logo" height="70" /></Nav.Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Text>
        <h1 className="navi_titre">wishing well</h1>
      </Navbar.Text>

      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="#deets ">Profil</Nav.Link>
          <Nav.Link eventKey={2} href="#memes">
            Connexion
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </div>
);

export default Navi;
