import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Col, Row, Container, Image,
} from 'react-bootstrap';
import moment from 'moment';
import MrBean from './MrBean.png';
import './profil.scss';

const Profil = ({
  fetchUserDetails, firstname, lastname, email, birthday, avatar, handleDeleteProfil,
}) => {
  const handleSubmit = (event) => {
    const profil = event.currentTarget;

    profil.event.preventDefault();
    event.stopPropagation();
    handleDeleteProfil();
  };

  useEffect(() => {
    console.log('useEffect Profil');
    fetchUserDetails();
  }, []);

  moment.locale('fr');

  return (

    <div className="profil">
      <Container onSubmit={handleSubmit}>
        <Row>
          <Col>
            <h1 className="profil_title">Profil</h1>
          </Col>
        </Row>

        <Row>

          <Col xs={12} md={12}>

            <div
              // style={{ backgroundImage: `url(${MrBean})` }}
                // src={`http://54.208.46.110/data/uploads/pictures/avatars/${avatar}`}
              style={{ backgroundImage: `url(http://54.208.46.110/data/uploads/pictures/avatars/${avatar})` }}
              className="profil_picture"
              roundedCircle
            >
              avatar
            </div>

          </Col>

        </Row>

        <Row>
          <Col className="profil_detail">

            <h2 className="profil_detail_title">
              {firstname} {lastname}
            </h2>

            <div className="profil_detail_birth">
              Né(e) le {moment(birthday).format('L')}
            </div>

            <div className="profil_detail_mail">
              {email}
            </div>
          </Col>

        </Row>

        <Row>
          <Col className="profil_button">
            <Button xs={6} className="mr-3 profil_modify" variant="primary" type="submit" active href="/en-construction">
              Modifier
            </Button>

            <Button xs={6} className="profil_delete" variant="danger" type="submit" active href="/en-construction">
              Supprimer
            </Button>
          </Col>
        </Row>
      </Container>

    </div>
  );
};

Profil.propTypes = {
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  birthday: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  handleDeleteProfil: PropTypes.func.isRequired,
  avatar: PropTypes.string.isRequired,
  fetchUserDetails: PropTypes.func.isRequired,
};

export default Profil;
