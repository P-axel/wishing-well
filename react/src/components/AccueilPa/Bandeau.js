import React from 'react';
import { Carousel } from 'react-bootstrap';
import bandeau1 from './bandeau1.png';
import bandeau2 from './bandeau2.png';
import bandeau3 from './bandeau3.png';
import './accueil.scss';

const Bandeau = () => (
  <div>
    <Carousel>
      <Carousel.Item interval={4000}>
        <img
          src={bandeau1}
          alt="bandeau"
          className="bandeau1"
        />

        <Carousel.Caption>
          <p>wishing Well</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={4000}>
        <img
          src={bandeau2}
          alt="bandeau"
          className="bandeau2"
        />
        <Carousel.Caption>

          <p>wishing Well</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={4000}>
        <img
          src={bandeau3}
          alt="bandeau"
          className="bandeau3"
        />
        <Carousel.Caption>
          <p>Wishing Well</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

  </div>

);
export default Bandeau;
