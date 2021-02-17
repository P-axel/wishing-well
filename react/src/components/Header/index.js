// == Import npm
import React from 'react';
import Button from 'react-bootstrap/Button';

// == Import
// import reactLogo from './react-logo.svg';
import logo from 'src/assets/images/blackLogo.png';
import './header.scss';

// == Composant
const Header = () => (
  <div className="header">
    <img src={logo} alt="wishingwell logo" className="logoHeader" />
    <div className="buttons">
      <Button href="/liste/edition" className="m-2" variant="warning" size="lg">Créez votre liste de cadeaux</Button>{' '}
      <Button className="m-2" variant="outline-warning" size="lg" href="/en-construction">Exemple de liste de cadeaux</Button>{' '}
    </div>

  </div>
);

// == Export
export default Header;
