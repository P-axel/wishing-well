import React from 'react';
import {
  Container, Row, Col, Image,
} from 'react-bootstrap';
import './footer.scss';
import copyright from './copyright.png';

const Footer = () => (
  <div className="footer-container">
    <Container fluid className="footer">
      <Row className="py-2">
        <Col>
          <a href="en-construction"> Mention légales</a>
        </Col>
        {/* <Col>
          <a href="#login"> Kraken Copyright &copy;</a>
        </Col> */}
        <Col>
          <a href="/equipe">L'équipe</a>
        </Col>
      </Row>
    </Container>
  </div>
);

export default Footer;
