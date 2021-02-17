import React, { useEffect, useState } from 'react';
import {
  Card, Button, DropdownButton, Dropdown, Modal,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import './creatorList.scss';
import PropTypes from 'prop-types';
import moment from 'moment';

import giftimg from './gift.png';

const CreatorList = ({
  launchFetchGifts,
  launchGetSlug,
  launchFetchListInfos,
  gifts,
  listInfos,
  userSlug,
  handleDeleteGift,
  clearStateGifts,
  handleDeleteList,
  handleClickFollow,
  handleClickUnfollow,
  handleClickBoughtList,
  handleClickStopBoughtList,
}) => {
  const { nomDeLaListe } = useParams();
  const [show, setShow] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  const [showShare, setShowShare] = useState(false);

  
  const handleCloseListModal = () => setShowListModal(false);
  const handleShowListModal = () => setShowListModal(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseShare = () => setShowShare(false);
  const handleShowShare = () => setShowShare(true);

  useEffect(() => {
    console.log('useEffect CreatorList');
    clearStateGifts();
    launchGetSlug(nomDeLaListe);
    launchFetchListInfos();
    launchFetchGifts();
  }, []);

  console.log('userSlug dans page dune liste:', userSlug);
  console.log('gifts dans page dune liste:', gifts);
  console.log('listInfos dans page dune liste:', listInfos);

  moment.locale('fr');

  // Vérifier si l'utilisateur suit cette liste
  let userIsFollower = false;
  if (listInfos.followers !== undefined) {
    const followersArray = listInfos.followers;
    const followerObject = followersArray.find((followerObject) => followerObject.slug === userSlug);
    if (followerObject !== undefined) {
      userIsFollower = true;
    }
  }

  return (
    <>
      { listInfos.creator !== undefined ? (
        <main className="creatorList">

          <Modal show={showListModal} onHide={handleCloseListModal}>
            <Modal.Header closeButton>
              <Modal.Title>Supression de la liste</Modal.Title>
            </Modal.Header>
            <Modal.Body>Etes vous sur de vouloir supprimer cette liste ?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseListModal}>
                Annuler
              </Button>
              <Button
                variant="warning"
                onClick={() => {
                  handleDeleteList(nomDeLaListe);
                  handleCloseListModal();
                }}
              >
                Je suis sûr
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={showShare} onHide={handleCloseShare}>
            <Modal.Header closeButton>
              <Modal.Title>Copiez ce lien</Modal.Title>
            </Modal.Header>
            <Modal.Body>http://localhost:8080/listes/{nomDeLaListe}</Modal.Body>
            <Modal.Body>Note: Vos connaissances devront d'abord créer un compte avant
              de pouvoir accéder à la liste
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseShare}>
                C'est fait!
              </Button>
              <Button
                variant="warning"
                onClick={() => {
                  handleCloseShare();
                }}
              >
                Je suis sûr
              </Button>
            </Modal.Footer>
          </Modal>
          
          <h1 className="creatorList_title"> {listInfos.name} </h1>
          { userSlug !== listInfos.creator.slug && (
          <div className="creatorList_infos-creator">
            <div className="creatorList_infos-creator_image" style={{ backgroundImage: `url(http://54.208.46.110/data/uploads/pictures/avatars/${listInfos.creator.avatar})` }} />
            <p className="creatorList_infos-creator_name">Une liste de <strong>{listInfos.creator.firstname} {listInfos.creator.lastname}</strong></p>
          </div>
          )}
          <p className="creatorList_date">
            Evènement prévu pour le <strong>{moment(listInfos.eventDate).format('LL')}</strong>
          </p>
          <p className="creatorList_description"> {listInfos.description} </p>

          { userSlug === listInfos.creator.slug && (
          <div className="creatorList_button">
            <DropdownButton id="dropdown-manage-button" title="Gérer ma liste">
              { userSlug === listInfos.creator.slug
            && (
            <Dropdown.Item className="creatorList_button_add" href={`/listes/${listInfos.slug}/ajout-souhait`}>Ajouter un souhait</Dropdown.Item>
            )}
              { userSlug === listInfos.creator.slug
            && (
            <Dropdown.Item className="creatorList_button_share" href="#">Partager ma liste</Dropdown.Item>
            )}
              { userSlug === listInfos.creator.slug
            && (
            <Dropdown.Item className="creatorList_button_edit" href={`/listes/${listInfos.slug}/edition`}>Modifier ma liste</Dropdown.Item>
            )}
              { userSlug === listInfos.creator.slug
            && (
            <Dropdown.Item className="creatorList_button_delete" onClick={handleShowListModal}>Supprimer ma liste</Dropdown.Item>
            )}
            </DropdownButton>
          </div>
          )}

          { userSlug !== listInfos.creator.slug
            && (
              <div>
                <Button variant="primary" className="mx-2 " href={`/listes/${listInfos.slug}/ajout-surprise`}>Ajouter une idée de surprise</Button>
                {!userIsFollower && <Button variant="primary" className="m-2 " onClick={() => handleClickFollow()}>Suivre cette liste</Button>}
                {userIsFollower && <Button variant="primary" className="m-2 " onClick={() => handleClickUnfollow()}>Ne plus suivre cette liste</Button>}
              </div>
            )}

          { userSlug === listInfos.creator.slug && (
          <div className="creatorList_button_desktop">
            { userSlug === listInfos.creator.slug
            && (
            <Button variant="warning" className="mx-2 creatorList_button_desktop_add" href={`/listes/${listInfos.slug}/ajout-souhait`}>
              Ajouter un souhait
            </Button>
            )}
            { userSlug === listInfos.creator.slug
            && (
              <>
                <Button variant="warning" className="mx-2 creatorList_button_desktop_share" onClick={handleShowShare}>
                  Partager ma liste
                </Button>
              </>
            )}
            { userSlug === listInfos.creator.slug
            && (
            <Button variant="warning" className="mx-2 creatorList_button_desktop_edit" href={`/listes/${listInfos.slug}/edition`}>
              Modifier ma liste
            </Button>
            )}
            { userSlug === listInfos.creator.slug
            && (
              <>
                <Button variant="dark" onClick={handleShowListModal}>
                  Supprimer la liste
                </Button>
              </>

            )}

          </div>
          )}
          { gifts !== '' ? (
            <div className="creatorList_cards">

              {

              gifts.map((gift) => (
                <Card
                  className={classNames('creatorList_cards_gift',
                    { important: gift.isHighlighted },
                    { bought: gift.status === 1 && listInfos.creator.slug !== userSlug },
                    { notBought: gift.status === 0 },
                    { wish: gift.type === 1 },
                    { surprise: gift.type === 2 })}
                  key={gift.id}
                  style={{ width: '20rem' }}
                >
                  <div className="creatorList_cards_gift_image" style={{ backgroundImage: `url(http://54.208.46.110/data/uploads/pictures/gifts/${gift.picture})` }}>
                    <Card.Img variant="center" src={`http://54.208.46.110/data/uploads/pictures/gifts/${gift.picture}`} className="cardImg" />
                  </div>
                  <Card.Body className="creatorList_cards_gift_body">
                    <Card.Title className="creatorList_cards_gift_title"> {gift.name} </Card.Title>
                    <a className="creatorList_cards_gift_heart">&#10084;</a>
                    { userSlug !== listInfos.creator.slug && gift.type === 2 && (
                      <p className="creatorList_cards_gift_idea">Idée proposée par {gift.creator.firstname}</p>
                    )}
                    <Card.Text>
                      {gift.details}
                      <Card.Link href={`/listes/${listInfos.slug}/${gift.slug}`}>...Plus de détails</Card.Link>
                    </Card.Text>

                    <div className="creatorList_cards_gift_buttons">
                      { userSlug !== listInfos.creator.slug && gift.status === 0 && (
                        <Button variant="primary" onClick={() => handleClickBoughtList(gift.slug)}>
                          Je m'en occupe
                        </Button>
                      )}
                      { gift.status === 1 && userSlug === gift.buyer.slug && (
                        <Button variant="danger" onClick={() => handleClickStopBoughtList(gift.slug)}>
                          Ne plus s'en occuper
                        </Button>
                      )}
                      { userSlug !== listInfos.creator.slug
                        && gift.status === 1
                        && userSlug !== gift.buyer.slug
                        && (
                        <Button className="creatorList_cards_gift_buttons_buyer" variant="dark">
                          {gift.buyer.firstname} s'en occupe
                        </Button>
                        )}

                      <div>
                        { userSlug === gift.creator.slug && gift.type === 1 && (
                          <Button className="m-2" href={`/listes/${listInfos.slug}/${gift.slug}/edition-souhait`} variant="warning">
                            Modifier
                          </Button>
                        )}
                        { userSlug === gift.creator.slug && gift.type === 2 && (
                          <Button className="m-2" href={`/listes/${listInfos.slug}/${gift.slug}/edition-surprise`} variant="warning">
                            Modifier
                          </Button>
                        )}
                        { userSlug === listInfos.creator.slug && userSlug === gift.creator.slug
                        && (

                          <>
                            <Button variant="dark" onClick={handleShow} className="m-2">
                              Supprimer
                            </Button>

                            <Modal show={show} onHide={handleClose}>
                              <Modal.Header closeButton>
                                <Modal.Title>Supression du cadeau</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>Etes vous sur de vouloir supprimer ce cadeau?</Modal.Body>
                              <Modal.Footer>
                                <Button variant="warning" onClick={handleClose}>
                                  Annuler
                                </Button>
                                <Button
                                  variant="dark"
                                  onClick={() => {
                                    handleDeleteGift(gift.slug);
                                    handleClose();
                                  }}
                                >
                                  Je suis sûr
                                </Button>
                              </Modal.Footer>
                            </Modal>
                          </>
                        )}

                        { userSlug !== listInfos.creator.slug
                          && userSlug === gift.creator.slug
                          && gift.status === 0
                          && (
                            <>
                              <Button variant="dark" onClick={handleShow} className="m-2">
                                Supprimer
                              </Button>

                              <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                  <Modal.Title>Supression du cadeau</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  Etes vous sur de vouloir supprimer ce cadeau?
                                </Modal.Body>
                                <Modal.Footer>
                                  <Button variant="warning" onClick={handleClose}>
                                    Annuler
                                  </Button>
                                  <Button
                                    variant="dark"
                                    onClick={() => {
                                      handleDeleteGift(gift.slug);
                                      handleClose();
                                    }}
                                  >
                                    Je suis sûr
                                  </Button>
                                </Modal.Footer>
                              </Modal>
                            </>
                          )}
                      </div>
                    </div>

                  </Card.Body>
                </Card>
              ))
              }
            </div>
          ) : (<p className="creatorList_no-gifts"> Il n'y a pas encore de cadeaux sur cette liste, à vous de jouer ! </p>)}
        </main>
      ) : (<div> loading </div>)}
    </>

  );
};

export default CreatorList;

CreatorList.propTypes = {
  launchFetchGifts: PropTypes.func.isRequired,
  launchGetSlug: PropTypes.func.isRequired,
  launchFetchListInfos: PropTypes.func.isRequired,
  gifts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      details: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      type: PropTypes.number.isRequired,
      isHighlighted: PropTypes.bool.isRequired,
      status: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  listInfos: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    creator: PropTypes.shape({
      slug: PropTypes.string,
    }),
  }).isRequired,
  userSlug: PropTypes.string.isRequired,
  // clearStateGifts: PropTypes.func.isRequired,
  handleDeleteGift: PropTypes.func.isRequired,
};
