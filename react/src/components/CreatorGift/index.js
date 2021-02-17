import PropTypes from 'prop-types';
import React from 'react';
import {
  Form, Button, Col, InputGroup, Container,
} from 'react-bootstrap';

import './creatorGift.scss';
// wishlist= id
const CreatorGift = ({
  validated, setValidated, wishlist, name, details, link, changeField, isHighlight, handleAddWish,
}) => {
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      handleAddWish();
    }
    setValidated(true);
  };
  
  // l'encodage de cette methode n'est pas bon
  // const fileSelectedHandler = (event) => {
  //   event.preventDefault();
  //   console.log(Buffer.from(event.target.files[0].name).toString('base64'));
  //   changeField(Buffer.from(event.target.files[0].name).toString('base64'), 'picture');
  // };


  const fileUpload = require('fuctbase64');
  const fileSelectedHandler = (event) => {
    event.preventDefault();
    console.log(event.target.files[0].type);
    fileUpload(event)
      .then((data) => {
        changeField(`data:${data.type};base64,${data.base64}`, 'picture');
      });
  };

  return (
    <div className="creatorGift container ">
      <h1>Ajouter un souhait</h1>
      <Container className>
        <Form fluid noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Row>
            <Col className="mx-5 text-center creatorGift_name">
              <Form.Group className="creatorGift_name" as={Col} controlId="validationCustom01">
                <Form.Label>Nom du souhaity</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Nom du souhait"
                  value={name}
                  id={wishlist}
                />

                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

              </Form.Group>
            </Col>
          </Form.Row>

          <Form.Row>
            <Col className="mx-5 text-center creatorGift_detail">
              <Form.Group as={Col} controlId="validationCustom02">
                <Form.Label>Informations supplémentaires</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={12}
                  required
                  type="texte"
                  placeholder="Description du souhait"
                  value={details}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Form.Row>

          <Form.Row>
            <Col className="mx-5 text-center creatorGift_link">
              <Form.Group as={Col} controlId="validationCustomUsername">
                <Form.Label>Lien (optionnel):  Vous pouvez indiquer ici le lien vers
                  l'adresse d'un produit
                  qui correspond à votre souhait. Vos connaissances pourront alors aller
                  l'acheter directement.
                </Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="text"
                    placeholder="Wish@example.com"
                    aria-describedby="inputGroupPrepend"
                    required
                    value={link}
                  />
                  <Form.Control.Feedback type="invalid">
                    Merci de choisir un lien vers votre souhait
                  </Form.Control.Feedback>
                </InputGroup>

              </Form.Group>
            </Col>
          </Form.Row>

          <Form.Row>
            <Col className="mx-5 text-center creatorGift_picture">

              <Form.Group as={Col}>
                <Form.Group>
                  <Form.File
                    id="picture"
                    label="Vous pouvez charger une image d'illustration qui remplcera l'image par défaut."
                  />
                  <Col>
                    <input name="avatar" type="file" onChange={fileSelectedHandler} />
                  </Col>
                </Form.Group>

                <Form.Check
                  onChange={fileSelectedHandler}
                  required
                  className="creatorGift_check"
                  value={isHighlight}
                  label="en cochant cette case votre souhait apparaitra tout
             en haut de votre liste et sera mis en évidence par
             rapport aux autres."

                />
                <p>Favoris (optionnel)</p>
              </Form.Group>
              <Button className="creatorGift_button" type="submit">Ajouter</Button>
            </Col>

          </Form.Row>
        </Form>
      </Container>
    </div>
  );
};

CreatorGift.propTypes = {
  name: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired,
  link: PropTypes.string.isRequired,
  isHighlight: PropTypes.bool.isRequired,
  validated: PropTypes.bool.isRequired,
  setValidated: PropTypes.func.isRequired,
  wishlist: PropTypes.number.isRequired,
  handleAddWish: PropTypes.func.isRequired,
};

export default CreatorGift;
