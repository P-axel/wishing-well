import React from 'react';

import './accueilClement.scss';

const AccueilClement = () => (
  <div className="accueil">
    <div className="accueil__header">
      <div className="accueil__header__content">
        <p className="accueil__header__content__text">La wishlist réinventée</p>
        <div className="accueil__header__content__buttons">
          <button className="accueil__header__content__buttons__button" type="button">Exemple de liste</button>
          <button className="accueil__header__content__buttons__button" type="button">Créer ma liste</button>
        </div>
      </div>
    </div>
    <div className="accueil__section1">
      <p className="accueil__section1__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id gravida arcu. Maecenas et ex at ante egestas efficitur sed id lorem. Sed ac lacinia nunc. Sed rhoncus et libero at blandit. Pellentesque eu scelerisque velit. Donec sit amet mi non nibh accumsan feugiat a sit amet urna.</p>
      <img className="accueil__section1__image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCt--mBl75cYrazmcBZi_lk4cis2I1CvRK4A&usqp=CAU" alt="" />
    </div>
    <div className="accueil__section2">
      <p className="accueil__section2__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id gravida arcu. Maecenas et ex at ante egestas efficitur sed id lorem. Sed ac lacinia nunc. Sed rhoncus et libero at blandit. Pellentesque eu scelerisque velit. Donec sit amet mi non nibh accumsan feugiat a sit amet urna.</p>
      <img className="accueil__section2__image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCt--mBl75cYrazmcBZi_lk4cis2I1CvRK4A&usqp=CAU" alt="" />
    </div>
    <div className="accueil__section3">
      <p className="accueil__section3__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id gravida arcu. Maecenas et ex at ante egestas efficitur sed id lorem. Sed ac lacinia nunc. Sed rhoncus et libero at blandit. Pellentesque eu scelerisque velit. Donec sit amet mi non nibh accumsan feugiat a sit amet urna.</p>
      <img className="accueil__section3__image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCt--mBl75cYrazmcBZi_lk4cis2I1CvRK4A&usqp=CAU" alt="" />
    </div>

    <div className="accueil__sectionbuttons">
      <p className="accueil__sectionbuttons__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <div className="accueil__sectionbuttons__buttons">
        <button className="accueil__sectionbuttons__buttons__button" type="button">Exemple de liste</button>
        <button className="accueil__sectionbuttons__buttons__button" type="button">Créer ma liste</button>
      </div>
    </div>
  </div>
);

export default AccueilClement;
