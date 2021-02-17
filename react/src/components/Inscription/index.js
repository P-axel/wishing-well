import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// == Import : local
import './inscription.scss';

import {
  Form, Col, Container, Row, Button,
} from 'react-bootstrap';
// == impot sous Composant
import PropTypes from 'prop-types';

import Field from './Field';

const Inscription = ({
  firstname, lastname, birthday, email,
  password,
  confirmPassword,
  changeField,
  handleRegister,
  isRegistered,
  isLogged,
}) => {
  console.log('isRegistered dans page inscription', isRegistered);
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (password !== confirmPassword) {
      alert('probleme de mdp');
    }
    handleRegister();
  };

  const fileUpload = require('fuctbase64');
  const fileSelectedHandler = (event) => {
    event.preventDefault();
    console.log(event.target.files[0].type);
    fileUpload(event)
      .then((data) => {
        changeField(`data:${data.type};base64,${data.base64}`, 'avatar');
      });
  };

  return (
    <Route path="/inscription" exact>
      {isRegistered === true && <Redirect to="/connexion" />}
      {isLogged === true && <Redirect to="/listes" />}
      <div className="inscription">
        <h1 className="login_title">Formulaire d'inscription</h1>
        <Container className="form">

          <Form autoComplete="off" className="login-form-element" onSubmit={handleSubmit}>

            <Row className="form_identite">
              <Col xs={12}>
                <h2 className="login_form_subtitle">Identité</h2>
              </Col>
              <Col xs={12} sm={6}>
                <Field
                  name="firstname"
                  placeholder="Prénom"
                  onChange={changeField}
                  // TODO Il ne faut pas de valeur dans le cas d'une inscription
                  value={firstname}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Field
                  name="lastname"
                  placeholder="Nom"
                  onChange={changeField}
                  // TODO Il ne faut pas de valeur dans le cas d'une inscription
                  value={lastname}
                />
              </Col>

              {/* TODO Mettre l'input date comme les autres */}
              <Col xs={12} className="form_born">
                <label htmlFor="date" className="createEditList__form__label">
                  Date de naissance
                  <input name="birthday" type="date" id="date" className="createEditList__form__label__input" value={birthday} onChange={(event) => changeField(event.target.value, 'birthday')} />
                </label>
              </Col>

              <Col xs={12} className="form_mail">
                <Field
                  type="email"
                  name="email"
                  placeholder="Adresse Email"
                  onChange={changeField}
                  value={email}
                />
              </Col>
            </Row>

            <Row className="form_connexion">
              <Col xs={12}>
                <h2 className="login_form_subtitle">Mot de passe</h2>
              </Col>

              <Col xs={12} form="form_password">
                <Field
                  name="password"
                  type="password"
                  placeholder="Mot de passe"
                  onChange={changeField}
                  value={password}
                />

                <Field
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirmez Mot de passe"
                  onChange={changeField}
                  value={confirmPassword}
                />

              </Col>
            </Row>

            <Row className="form_avatar">
              <Col xs={12}>
                <h2 className="login_form_subtitle">Photo de profil (optionnelle)</h2>
              </Col>
              <Col xs={12} className="form_file">
                <input name="avatar" type="file" onChange={fileSelectedHandler} />
              </Col>
            </Row>

            <Button variant="dark" type="submit" className="createEditList__form__button">
              Valider
            </Button>

          </Form>
        </Container>
      </div>

    </Route>

  );
};

Inscription.propTypes = {
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  birthday: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired,
  handleRegister: PropTypes.func.isRequired,
  isRegistered: PropTypes.bool.isRequired,
  isLogged: PropTypes.bool.isRequired,

};

// == Export
export default Inscription;
