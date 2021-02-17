import React from 'react';
import {
  Card, Button,
} from 'react-bootstrap';

import './friendList.scss';
import gift from './gift.png';

const WishCard = (variant, idx) => (

  <div className="wishCard">
    [

    <Card
      style={{ width: '20rem' }}
      bg={variant.toLowerCase()}
      key={idx}
      text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
    >
      <Card.Img variant="left" src={gift} className="cardImg" />
      <Card.Body>
        <Card.Title>titre du souhait</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the bulk of
          the card's content.
          <Card.Link href="#">...Plus de détails</Card.Link>
        </Card.Text>

        <Button variant="success">Go somewhere</Button>
        <Button variant="danger">Go somewhere</Button>
      </Card.Body>
    </Card>

  </div>
);
export default WishCard;
