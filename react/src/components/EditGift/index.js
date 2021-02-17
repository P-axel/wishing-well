import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Form, Button, Col, InputGroup, Container,
  OverlayTrigger, Popover, Row,
} from 'react-bootstrap';
import {
  Info, Edit, Gift, PlusCircle,
} from 'react-feather';

import './editGift.scss';
// wishlist= id
const EditGift = ({
  validated,
  setValidated,
  name,
  description,
  link,
  changeField,
  isHighlighted,
  editGift,
  creatorModify,
  surpriseModify,
  addWish,
  addSurprise,
  addGift,
  listInfos,
  fetchCurrentGiftInfos,
  giftDetails,
}) => {
  const { nomDuWish, nomDeLaListe, nomDeLaSurprise } = useParams();
  useEffect(() => {
    console.log('useEffect lancé');
    if (creatorModify) {
      fetchCurrentGiftInfos(nomDuWish);
    }
    if (surpriseModify) {
      fetchCurrentGiftInfos(nomDeLaSurprise);
    }
    console.log('giftDetails', giftDetails);
  }, []);

  if (addWish) {
    changeField(1, 'type');
  }
  if (addSurprise) {
    changeField(2, 'type');
    changeField(false, 'isHighlighted');
  }
  const { id } = listInfos;

  changeField(id, 'wishlistId');

  const linkHelp = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Lien vers votre cadeau</Popover.Title>
      <Popover.Content>
        Vous pouvez indiquer ici le lien vers
        l'adresse d'un produit
        qui correspond à votre souhait. Vos connaissances pourront alors aller
        l'acheter directement.
      </Popover.Content>
    </Popover>
  );

  const imageHelp = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Image</Popover.Title>
      <Popover.Content>
        Vous pouvez charger une image d'illustration qui remplacera l'image par défaut.
      </Popover.Content>
    </Popover>
  );

  const isHighlightedHelp = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Image</Popover.Title>
      <Popover.Content>
        En cochant cette case votre souhait apparaitra tout
        en haut de votre liste et sera mis en évidence par
        rapport aux autres.
      </Popover.Content>
    </Popover>
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('addSurprise', addSurprise);
    console.log('addWish', addWish);
    if (addSurprise || addWish) {
      addGift(nomDeLaListe);
    }
    else {
      if (creatorModify) {
        editGift(nomDuWish, nomDeLaListe);
      }
      if (surpriseModify) {
        editGift(nomDeLaSurprise, nomDeLaListe);
      }
    }
  };

  // yarn add fuctbase64
  const fileUpload = require('fuctbase64');

  const fileSelectedHandler = (event) => {
    event.preventDefault();
    console.log(event.target.files[0].type);
    fileUpload(event)
      .then((data) => {
        changeField(`data:${data.type};base64,${data.base64}`, 'picture');
      });
  };

  console.log('isHighlighted', isHighlighted);

  return (
    <div className="editGift">

      {surpriseModify && (
      <h1>Modification de la surprise</h1>
      )}
      {creatorModify && (
      <h1>Modification du souhait</h1>
      )}
      {addWish && (
      <h1>Ajoutez votre souhait</h1>
      )}
      {addSurprise && (
      <h1>Ajoutez votre surprise</h1>
      )}

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Row>
          <Col className="text-center editGift_name">
            <Form.Group className="editGift_name" as={Col} controlId="validationCustom01">
              <Form.Label>Nom du cadeau</Form.Label>
              <Form.Control
                required
                type="text"
                value={name}
                onChange={(event) => changeField(event.target.value, 'name')}
              />

            </Form.Group>
          </Col>
        </Form.Row>

        <Form.Row>
          <Col className="text-center editGift_detail">
            <Form.Group as={Col} controlId="validationCustom02">
              <Form.Label>Informations supplémentaires</Form.Label>
              { description === null ? (
                <Form.Control
                  as="textarea"
                  rows={6}
                  required
                  type="texte"
                  placeholder="Description du souhait"
                  value={description}
                  onChange={(event) => changeField(event.target.value, 'description')}
                />
              ) : (
                <Form.Control
                  as="textarea"
                  rows={6}
                  required
                  type="texte"
                  // placeholder={giftDetails.details}
                  value={description}
                  onChange={(event) => changeField(event.target.value, 'description')}
                />
              )}

            </Form.Group>
          </Col>
        </Form.Row>

        <Form.Row>
          <Col className="text-center editGift_link">
            <Form.Group as={Col} controlId="validationCustomUsername">
              <Form.Label>Lien (optionnel) </Form.Label>
              <OverlayTrigger trigger="click" placement="right" overlay={linkHelp}>
                <span> <Info color="black" size={25} /> </span>
              </OverlayTrigger>
              <InputGroup>
                {/* <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">ex: https://...</InputGroup.Text>
                </InputGroup.Prepend> */}
                { link === null ? (
                  <Form.Control
                    type="text"
                    placeholder="www.moncadeau.com"
                    aria-describedby="inputGroupPrepend"
                    required
                    value={link}
                    onChange={(event) => changeField(event.target.value, 'link')}
                  />
                ) : (
                  <Form.Control
                    type="text"
                    // placeholder={giftDetails.link}
                    aria-describedby="inputGroupPrepend"
                    placeholder="https://www.moncadeau.com"
                    required
                    value={link}
                    onChange={(event) => changeField(event.target.value, 'link')}
                  />
                )}

              </InputGroup>

            </Form.Group>
          </Col>
        </Form.Row>

        <Form.Row>
          <Col className="text-center editGift_picture">

            <Form.Group as={Col}>
              <Form.Group>
                <Col>
                  <label htmlFor="avatar">
                    {(surpriseModify || creatorModify) && ('Changer')}{(addWish || addSurprise) && ('Ajouter')} la photo du cadeau :
                  </label>
                  <input id="avatar" name="avatar" type="file" onChange={fileSelectedHandler} />
                  <OverlayTrigger trigger="click" placement="right" overlay={imageHelp}>
                    <span> <Info color="black" size={25} /> </span>
                  </OverlayTrigger>
                </Col>
              </Form.Group>

              { (addWish || creatorModify) && (
                <Row>

                    { isHighlighted === true && (
                      <Form.Check
                        onChange={(event) => {
                          if (event.target.checked === true) {
                            changeField(true, 'isHighlighted');
                          }
                          if (event.target.checked === false) {
                            changeField(false, 'isHighlighted');
                          }
                        }}
                        className="editGift_check"
                        value={isHighlighted}
                        checked
                        label="Ce souhait a une grande importance pour moi"
                      />
                    )}

                    { isHighlighted === false && (
                      <Form.Check
                        onChange={(event) => {
                          if (event.target.checked === true) {
                            changeField(true, 'isHighlighted');
                          }
                          if (event.target.checked === false) {
                            changeField(false, 'isHighlighted');
                          }
                        }}
                        className="editGift_check"
                        value={isHighlighted}
                        label="Ce souhait a une grande importance pour moi"
                      />
                    )}

                  {/* <Form.Check
                    onChange={(event) => {
                      if (event.target.checked === true) {
                        changeField(1, 'isHighlighted');
                      }
                      if (event.target.checked === false) {
                        changeField(0, 'isHighlighted');
                      }
                    }}
                    className="editGift_check"
                    value={isHighlighted}
                    label="Ce souhait a une grande importance pour moi"
                  /> */}

                  <OverlayTrigger trigger="click" placement="right" overlay={isHighlightedHelp}>
                    <span> <Info color="black" size={25} /> </span>
                  </OverlayTrigger>

                </Row>
              )}

            </Form.Group>
            { (creatorModify || surpriseModify) && (
            <Button className="editGift_button" type="submit"><Edit className="icon" color="black" />Modifier</Button>
            )}
            { addWish && (
            <Button className="editGift_button" type="submit"><PlusCircle className="icon" color="black" />Ajouter un souhait</Button>
            )}
            { addSurprise && (
            <Button className="editGift_button" type="submit"><Gift className="icon" color="black" />Ajouter une surprise</Button>
            )}
          </Col>

        </Form.Row>
      </Form>

    </div>
  );
};

EditGift.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired,
  link: PropTypes.string.isRequired,
  editGift: PropTypes.func.isRequired,
  isHighlighted: PropTypes.number.isRequired,
  // creatorModify: PropTypes.string,
  // surpriseModify: PropTypes.string,
  // addWish: PropTypes.string,
  // addSurprise: PropTypes.string,
  addGift: PropTypes.func.isRequired,
  listInfos: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  fetchCurrentGiftInfos: PropTypes.func.isRequired,

  // isHighlighted: PropTypes.bool.isRequired,
  // validated: PropTypes.bool.isRequired,
  // setValidated: PropTypes.func.isRequired,

};

EditGift.defaultProps = {
  // creatorModify: '',
  // surpriseModify: '',
  // addWish: '',
  // addSurprise: '',
};

export default EditGift;
