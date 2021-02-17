import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
} from 'react-bootstrap';
import { Route, Redirect } from 'react-router-dom';

import Field from './Field';

import './loginForm.scss';

const LoginForm = ({
  email,
  password,
  changeField,
  handleLogin,
  handleLogout,
  isLogged,
  loggedMessage,
  isRegistered,
  slug,
}) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleLogin();
  };
  console.log(slug);

  return (
    <Route path="/connexion" exact>

      <div className="login-form">

        { isRegistered === true && (
        <div> Bienvenue parmis nous {slug}! Connectez vous pour profiter de toutes
          nos fonctionnalités
        </div>
        )}

        {isLogged && <Redirect to="/listes/" /> }
        {isLogged && (
        <div className="login-form-logged">
          <p className="login-form-message">
            {loggedMessage}
          </p>
          <button
            type="button"
            className="login-form-button"
            onClick={handleLogout}
          >
            Déconnexion
          </button>
        </div>
        )}

        {!isLogged && (

        <form autoComplete="off" className="login-form-element" onSubmit={handleSubmit}>
          <p className="form-message">Pour exaucer un voeu, veuillez-vous connecter.</p>
          <Field
            name="email"
            placeholder="Adresse Email"
            onChange={changeField}
            value={email}
          />
          <Field
            name="password"
            type="password"
            placeholder="Mot de passe"
            onChange={changeField}
            value={password}
          />
          <Button variant="dark" type="submit">
            Connexion
          </Button>

        </form>
        )}
      </div>

    </Route>
  );
};

LoginForm.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  isLogged: PropTypes.bool,
  loggedMessage: PropTypes.string,
  isRegistered: PropTypes.bool.isRequired,
  slug: PropTypes.string.isRequired,
};

LoginForm.defaultProps = {
  isLogged: false,
  loggedMessage: 'Connecté',
};

export default LoginForm;
