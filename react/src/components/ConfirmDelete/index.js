import React, { useState } from 'react';
import {
  Card, Button, Modal,
} from 'react-bootstrap';

const ConfirmDelete = () => {
  const [showListModal, setShowListModal] = useState(false);

  const handleCloseListModal = () => setShowListModal(false);
  const handleShowListModal = () => setShowListModal(true);
  return (
    <div>

      <Button variant="primary" onClick={handleShowListModal}>
        Supprimer la liste
      </Button>

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
            variant="primary"
            onClick={() => {
              handleDeleteList(nomDeLaListe);
              handleCloseListModal();
            }}
          >
            Je suis sûr
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default ConfirmDelete;
