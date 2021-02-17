// TODO gérer le toggle sur la version mobile pour afficher soit mes listes soit listes suivies
// TODO gérer la position de la card.img en top pour la version mobile
// TODO gérer la position de l'Alert sans augmenter la taille de la div pour pas modifier l'image
// == Import npm
import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import {
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import getUserOwnWishlist from 'src/utils';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import logo from '../../assets/images/miniBlackLogo.png';
// user4@k.s

// == Import
import './tableauDeBord.scss';

// == Composant
const TableauDeBord = ({
  ownLists, friendsLists, isLogged, launchFetchLists,
}) => {
  console.log('props ownlists dans composant TableauDeBord:', ownLists);
  console.log('props friendsLists dans composant TableauDeBord:', friendsLists);

  useEffect(() => {
    console.log('useEffect TableauDeBord');
    launchFetchLists();
  }, []);

  // useMediaQuery pour gérer le responsive
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 801 });
  const isTabletOrMobile = useMediaQuery({ maxWidth: 800 });

  // TODO a un certaine largeure de fenetre, les 2 affichages mobile et desktop
  // TODO s'affichent si je reduit la fenetre du navigateur,
  // TODO  mais sur la fenetre du devTools pas de probleme

  // partie de code pour gérer la modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // récupérer les listes créés par le user connecté

  // const createdWishlists = getUserOwnWishlist(lists, slug);

  const getDifferencewithNowInDays = (dateString) => {
    const now = new Date();
    const dateToCompare = new Date(dateString);
    let diff = dateToCompare.getTime() - now.getTime();
    diff = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
    return diff;
  };

  return (

    <main className="tableauDeBord">
      {isLogged === false && <Redirect to="/connexion" /> }
      
      <h1 className="tableauDeBord_title"> Mon tableau de bord </h1>

      {isTabletOrMobile && (
        <div className="buttons">
          <Button className="m-2" variant="dark" size="lg">Mes listes</Button>{' '}
          <Button className="m-2" variant="dark" size="lg">Listes suivies</Button>{' '}
        </div>
      )}

      <section className="tableauDeBord_myLists">
        <h2 className="tableauDeBord_myLists_title">Mes listes</h2>
        <Button href="/liste/edition" className="my-2 tableauDeBord_myLists_newList" variant="dark">Créez une nouvelle liste</Button>{' '}

        {ownLists.map((ownList) => (
          <>
            <div className="tableauDeBord_myLists_card">
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Copiez ce lien et partagez le à vos proches</Modal.Title>
                </Modal.Header>
                <Modal.Body><a href={`http://localhost:8080/listes/${ownList.slug}`}>http://localhost:8080/listes/{ownList.slug}</a></Modal.Body>
                <Modal.Body>Note: Vos connaissances devront d'abord créer un compte avant
                  de pouvoir accéder à la liste
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="warning" onClick={handleClose}>
                    C'est fait !
                  </Button>
                </Modal.Footer>
              </Modal>
              <div className="tableauDeBord_myLists_card_head">
                <h3 className="tableauDeBord_myLists_card_head_title">{ownList.name}</h3>
                <Button className="tableauDeBord_myLists_card_head_share" variant="dark" onClick={handleShow}>Partager ma liste</Button>
              </div>
              <p className="tableauDeBord_myLists_card_text">
                {ownList.description}
              </p>
              <div className="tableauDeBord_myLists_card_foot">
                <Button className="tableauDeBord_myLists_card_foot_link" href={`/listes/${ownList.slug}`} variant="dark">Accéder à ma liste</Button>
                <Button className="tableauDeBord_myLists_card_foot_share" variant="dark" onClick={handleShow}>Partager ma liste</Button>
              </div>
            </div>
          </>
        ))}

      </section>

      <section className="tableauDeBord_followedLists">

        <h2 className="tableauDeBord_followedLists_title"> Listes suivies </h2>

        {friendsLists.map((friendsList) => (
          <a href={`/listes/${friendsList.slug}`} className="mt-4 tableauDeBord_followedLists_cardLink">
            <div key={friendsList.id} className="mt-4 tableauDeBord_followedLists_card">
              <div className="tableauDeBord_followedLists_card_imageDiv">
                <img alt="avatar" className="avatar_friends_image" src={`http://54.208.46.110/data/uploads/pictures/avatars/${friendsList.creator.avatar}`} />
                <div className="avatar_friends_div" style={{ backgroundImage: `url(http://54.208.46.110/data/uploads/pictures/avatars/${friendsList.creator.avatar})` }} />
              </div>
              <div className="tableauDeBord_followedLists_card_infos">
                <h3 className="tableauDeBord_followedLists_card_infos_title">{friendsList.name}</h3>
                <p className="tableauDeBord_followedLists_card_infos_creator">Créé par <strong>{`${friendsList.creator.firstname} ${friendsList.creator.lastname}`}</strong></p>
                <p className="tableauDeBord_followedLists_card_infos_description">
                  {friendsList.description}
                </p>
              </div>
              <Button href={`/listes/${friendsList.slug}`} className="tableauDeBord_followedLists_card_button" variant="dark">Accèder à la liste</Button>
              {/* // TODO le nom de classe "alert" du paragraphe suivant doit devenir dynamique
                en fonction de l'urgence :
              10 jours ou moins : alerte
              entre 20 et 11 jours : warning
              au dela : none
              */}
              { getDifferencewithNowInDays(friendsList.eventDate) > 1
              && (
              <p className={classNames('tableauDeBord_followedLists_card_mobileAlert',
                { urgent: getDifferencewithNowInDays(friendsList.eventDate) <= 10 },
                {
                  warning: getDifferencewithNowInDays(friendsList.eventDate) > 10
                  && getDifferencewithNowInDays(friendsList.eventDate) <= 20
                },
                { notUrgent: getDifferencewithNowInDays(friendsList.eventDate) > 20 })}
              >
                Il vous reste {Math.floor(getDifferencewithNowInDays(friendsList.eventDate))} jours pour participer à cette liste !
              </p>
              )}
              { getDifferencewithNowInDays(friendsList.eventDate) === 1
              && (
              <p className="tableauDeBord_followedLists_card_mobileAlert urgent">
                Il vous reste {Math.floor(getDifferencewithNowInDays(friendsList.eventDate))} jour pour participer à cette liste !
              </p>
              )}
              { getDifferencewithNowInDays(friendsList.eventDate) === 0
              && (
              <p className="tableauDeBord_followedLists_card_mobileAlert urgent">
                L'évènement pour cette liste a lieu aujourd'hui !
              </p>
              )}
              { getDifferencewithNowInDays(friendsList.eventDate) < 0
              && (
              <p className="tableauDeBord_followedLists_card_mobileAlert past">
                Cet évènement a déjà eu lieu.
              </p>
              )}
            </div>
          </a>
        ))}

      </section>

    </main>
  );
};

TableauDeBord.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  ownLists: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  friendsLists: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      // description: PropTypes.string.isRequired,
      firstname: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  launchFetchLists: PropTypes.func.isRequired,
};

// == Export
export default TableauDeBord;
