import React from 'react';
import {
  Button, Form,
} from 'react-bootstrap';
import './friendList.scss';
import gift from './gift.png';
import coeur from './coeur.png';
import WishCard from './Wishcard';

const CreatorList = () => (

  <div className="creatorList">

    <h1> Titre de la liste </h1>

    <div className="creatorList_buttons">
      <Button className="creatorList_button m-3 p-2" variant="info" type="submit">
        Nouveau KDO
      </Button>

      <Button className="m-3 p-2" variant="info" type="submit">
        J'ai acheté un autre cadeau
      </Button>
    </div>

    <Form className="creatorList_select">
      <Form.Group controlId="exampleForm.SelectCustom">
        <Form.Label>Selection des wish</Form.Label>
        <Form.Control as="select" custom bg="warning">
          <option>Toute ma wish liste</option>
          <option>les favoris</option>
          <option>wish déjà acheté</option>
          <option>les idées de wish</option>

        </Form.Control>
      </Form.Group>
    </Form>

    <cardDeck className="creatorList_list">
      <WishCard />
      <WishCard />
      <WishCard />
    </cardDeck>

  </div>

);

export default CreatorList;
