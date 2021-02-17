import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import './headerClement.scss';

const HeaderClement = () => (
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="fixed='top' d-flex justify-content-between">
    <Navbar.Brand href="#home" className="">Wishing Well</Navbar.Brand>
    <div>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="">
          <Nav.Link href="#features">Inscription</Nav.Link>
          <Nav.Link href="#pricing">Connexion</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </div>
  </Navbar>
);

export default HeaderClement;
