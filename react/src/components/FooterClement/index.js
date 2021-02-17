import React from 'react';
import './footerClement.scss';

const FooterClement = () => (
  <div className="footer">
    <nav className="footer__social">
      <a href="#"><img className="footer__social__item" src="https://www.flaticon.com/svg/static/icons/svg/49/49354.svg" alt="logo facebook" /></a>
      <a href="#"><img className="footer__social__item" src="https://www.flaticon.com/svg/static/icons/svg/1384/1384017.svg" alt="logo twitter" /></a>
      <a href="#"><img className="footer__social__item" src="https://www.flaticon.com/svg/static/icons/svg/1384/1384015.svg" alt="logo instagram" /></a>
    </nav>
    <nav className="footer__link">
      <a className="footer__link__item" href="#">L'équipe</a>
      <a className="footer__link__item" href="#">Contact</a>
      <a className="footer__link__item" href="#">Mentions légales</a>
    </nav>
  </div>
);

export default FooterClement;
