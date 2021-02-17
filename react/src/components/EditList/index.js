import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './editList.scss';

const EditList = ({
  getSlug,
  fetchList,
  name,
  eventDate,
  description,
  changeNameEditList,
  changeEventDateEditList,
  changeDescriptionEditList,
  editList,
}) => {
  const { slug } = useParams();

  useEffect(() => {
    getSlug(slug);
    fetchList();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    editList();
  };
  return (
    <div className="editList">
      <h1 className="editList__title">Modifier la liste</h1>
      <form className="editList__form" onSubmit={handleSubmit}>
        <label htmlFor="name" className="editList__form__label">
          Nom de la liste *
          <input required type="text" id="name" placeholder="Nom" className="editList__form__label__input" value={name} onChange={(event) => changeNameEditList(event.target.value)} />
        </label>

        <label htmlFor="date" className="editList__form__label">
          Date de l'événement *
          <input required type="date" id="date" className="editList__form__label__input" value={eventDate} onChange={(event) => changeEventDateEditList(event.target.value)} />
        </label>

        <label htmlFor="description" className="editList__form__label">
          Description
          <textarea id="description" placeholder="Description" rows="4" className="editList__form__label__input" value={description} onChange={(event) => changeDescriptionEditList(event.target.value)} />
        </label>

        <div className="editList__form__buttons">
          <input type="submit" value="Modifier" className="editList__form__buttons--edit" />
          <input type="button" value="Annuler" className="editList__form__buttons--cancel" onClick={() => { window.location.href = `/listes/${slug}`; }} />
        </div>
      </form>
    </div>
  );
};

export default EditList;
