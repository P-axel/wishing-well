import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './gift.scss';

const Gift = ({
  getGiftDetailsSlug,
  fetchGiftDetails,
  details,
  buyer,
  userSlug,
  handleClickBought,
}) => {
  const { nomDuGift, nomDeLaListe } = useParams();

  useEffect(() => {
    getGiftDetailsSlug(nomDuGift, nomDeLaListe);
    fetchGiftDetails();
  }, []);

  // Si un lien est présent dans les données on passe linkIsNull à false
  let linkIsNull = true;
  if (details.link !== null) {
    linkIsNull = false;
  }

  // Vérifier si l'utilisateur est le créateur du cadeau
  let userIsGiftCreator = false;
  if (details.creator !== undefined && userSlug === details.creator.slug) {
    userIsGiftCreator = true;
  }

  // Vérifier si l'utilisateur est le créateur de la liste
  let userIsListCreator = false;
  if (details.wishlist !== undefined && userSlug === details.wishlist.creator.slug) {
    userIsListCreator = true;
  }

  // Vérifier si le cadeau a été acheté
  let giftIsBought = false;
  if (details.status === 1) {
    giftIsBought = true;
  }

  // Vérifier si l'utilisateur est l'acheteur
  let userIsBuyer = false;
  if (buyer !== null && buyer !== undefined && userSlug === buyer.slug) {
    userIsBuyer = true;
  }

  // Vérifier si le cadeau est un souhait
  let giftIsAWish = false;
  if (details.type === 1) {
    giftIsAWish = true;
  }

  return (
    <>
      {details !== undefined && details.creator !== undefined && (
          <div className="gift">
            <img className="gift__image" src={`http://54.208.46.110/data/uploads/pictures/gifts/${details.picture}`} alt="" />
            <div className="gift__image-div" style={{ backgroundImage: `url(http://54.208.46.110/data/uploads/pictures/gifts/${details.picture})` }}/>

            <div className="gift__container">
              <div className="gift__comments">
                {userIsListCreator && !details.isHighlighted && <p className="gift__comments__comment"><span className="heart not-essential">&#10084;</span><span>Ce cadeau ne vous est pas essentiel</span></p>}
                {giftIsAWish && details.isHighlighted && <p className="gift__comments__comment"><span className="heart essential">&#10084;</span><span>{details.wishlist.creator.firstname} souhaite vraiment avoir ce cadeau</span></p>}
                {!giftIsAWish && !userIsListCreator && <p className="gift__comments__comment"><img className="gift__comments__comment__icon" src="https://www.flaticon.com/svg/static/icons/svg/3616/3616783.svg" alt="" />Ce cadeau est une idée de {details.creator.firstname}</p>}
                {!userIsListCreator && !userIsBuyer && giftIsBought && <p className="gift__comments__comment"><img className="gift__comments__comment__icon" src="https://www.flaticon.com/svg/static/icons/svg/833/833593.svg" alt="" />{buyer.firstname} s'occupe déjà de ce cadeau</p>}
                {!userIsListCreator && userIsBuyer && <p className="gift__comments__comment"><img className="gift__comments__comment__icon" src="https://www.flaticon.com/svg/static/icons/svg/833/833593.svg" alt="" />Vous vous occupez déjà de ce cadeau</p>}
                {!userIsListCreator && !giftIsBought && <p className="gift__comments__comment"><img className="gift__comments__comment__icon" src="https://www.flaticon.com/svg/static/icons/svg/159/159469.svg" alt="" />Personne ne s'occupe de ce cadeau</p>}
              </div>

              <div className="gift__buttons gift__buttons--centered">
                {!userIsListCreator && !giftIsBought && <button className="gift__buttons__button--lock" type="button" onClick={() => handleClickBought()}>Je m'en occupe</button>}
                {!userIsListCreator && giftIsBought && userIsBuyer && <button className="gift__buttons__button--unlock" type="button" onClick={() => handleClickBought()}>Ne plus s'en occuper</button>}
              </div>
            </div>

            <div className="gift__details">
              <h2 className="gift__details__title">{details.name}</h2>
              {!linkIsNull && <a className="gift__details__link" href={details.link}>Lien vers un produit similaire</a>}
              <p className="gift__details__text">{details.details}</p>
            </div>

            <div className="gift__buttons">
              {userIsGiftCreator && <button className="gift__buttons__button--edit" type="button">Modifier ce cadeau</button>}
            </div>

            <button className="gift__buttons__button btn btn-dark return-btn" type="button" onClick={() => { window.location.href = `/listes/${nomDeLaListe}`; }}><img className="gift__comments__comment__icon" src="https://www.flaticon.com/svg/static/icons/svg/724/724893.svg" alt="" />Retourner sur la liste</button>
          </div>
      )}
    </>
  );
};

export default Gift;
