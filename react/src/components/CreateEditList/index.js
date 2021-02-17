import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import './createEditList.scss';

const CreateEditList = ({
  name,
  eventDate,
  description,
  changeName,
  changeEventDate,
  changeDescription,
  createList,
  isLogged,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    createList();
  };
  return (

    <div className="createEditList">
      { isLogged === false && <Redirect to="/connexion" /> }
      <h1 className="createEditList__title">Créer une liste</h1>
      <form className="createEditList__form" onSubmit={handleSubmit}>
        <label htmlFor="name" className="createEditList__form__label">
          Nom de la liste *
          <input required type="text" id="name" placeholder="Nom" className="createEditList__form__label__input" value={name} onChange={(event) => changeName(event.target.value)} />
        </label>

        <label htmlFor="date" className="createEditList__form__label">
          Date de l'événement *
          <input required type="date" id="date" className="createEditList__form__label__input" value={eventDate} onChange={(event) => changeEventDate(event.target.value)} />
        </label>

        <label htmlFor="description" className="createEditList__form__label">
          Description
          <textarea id="description" placeholder="Description" rows="4" className="createEditList__form__label__input" value={description} onChange={(event) => changeDescription(event.target.value)} />
        </label>

        <div className="createEditList__form__buttons">
          <input type="submit" value="Créer" className="createEditList__form__buttons--create" />
          <input type="button" value="Annuler" className="createEditList__form__buttons--cancel" onClick={() => { window.location.href = '/listes/'; }} />
        </div>
      </form>
    </div>
  );
};

CreateEditList.propTypes = {
  name: PropTypes.string.isRequired,
  eventDate: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  changeName: PropTypes.func.isRequired,
  changeEventDate: PropTypes.func.isRequired,
  changeDescription: PropTypes.func.isRequired,
  createList: PropTypes.func.isRequired,
  isLogged: PropTypes.bool.isRequired,
};

export default CreateEditList;
