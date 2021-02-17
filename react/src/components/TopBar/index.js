import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import miniBlackLogo from 'src/assets/images/miniBlackLogo.png';
import PropTypes from 'prop-types';

import './topbar.scss';

const TopBar = ({ isLogged, slug, avatar, handleLogout }) => (

  console.log(avatar),

  <div className="header">
    <Navbar className="navbar-custom" expand="sm">
      <Navbar.Brand className="brandName" href="/">
        <img
          alt=""
          src={miniBlackLogo}
          width="50"
          height="50"
          className="d-block-inline align-top miniLogo"
        />{' '}
        WISHING WELL
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">

        {isLogged && (
        <Nav className="ml-auto panel-right">
          <Nav.Link href="/listes">Mes listes</Nav.Link>

          <Nav.Link href="/profil">Profil</Nav.Link>
          <Nav.Link href="/profil">
            <img alt="avatar" className="avatar_image" src={`http://54.208.46.110/data/uploads/pictures/avatars/${avatar}`} />
            <div className="avatar_div" style={{ backgroundImage: `url(http://54.208.46.110/data/uploads/pictures/avatars/${avatar})` }} />
            </Nav.Link>
          <Nav.Link href="/" onClick={handleLogout}>Déconnexion</Nav.Link>
        </Nav>
        )}
        {!isLogged && (
        <Nav className="ml-auto">
          <Nav.Link href="/inscription">Inscription</Nav.Link>
          <Nav.Link href="/connexion">Connexion</Nav.Link>
        </Nav>
        )}

      </Navbar.Collapse>
    </Navbar>

    {
      /* NavBar codée moi meme:
      <div className="navDur">
      <div className="brandItems">
        <img
          alt=""
          src={miniBlackLogo}
          width="50"
          height="50"
          className="d-inline-block align-top miniLogo"
        />
        <div className="brandName">
          <a> Wishing Well</a>
        </div>
      </div>

      <div className="navRight">
        <ul className="menu">
          <li><a className="menu-Item">Mes listes</a></li>
          <li><a className="menu-Item">Profil</a></li>
          <li><a className="menu-Item">Déconnexion</a></li>
        </ul>
      </div>
    </div> */}

  </div>

);

TopBar.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  slug: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default TopBar;
