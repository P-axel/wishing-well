import React from 'react';
import {
  Container, Row, Col, Image,
} from 'react-bootstrap';
import { Route } from 'react-router-dom';
import cadeau from './cadeau.png';
import famille from './famille.png';
import pc from './pc.png';
import Bandeau from './Bandeau';

import './accueil.scss';

const Accueil = () => (
  <Route path="/" exact>
    <div className="accueil">
      <Bandeau />
      <Container fluid className="accueil_background" />
      <Row className="background">
        <Col>
          <Image src={famille} alt="famille" className="accueil_famille" />
        </Col>

        <Col className="text">

          Qui ne s’est encore jamais arraché les cheveux au moment
          des anniversaires et des fêtes de Noël pour trouver un cadeau
          approprié à chaque personne ? Qui n’a jamais eu de déception au moment
          de déballer des cadeaux en constatant que quelqu’un d’autre avait déjà
          eu la même idée ? S’il est possible de se concerter avec les membres de
          son foyer, cela devient de plus en plus compliqué quand il s’agit de coordonner
          plusieurs familles ainsi que différents cercles d’amis. La solution ? Wishing Well !

          Avec Wishing Well, fini le casse-tête et les déceptions !
        </Col>
      </Row>

      <Row className="background">

        <Col className="text">Avec Wishing Well, nous avons essayé de repenser
          le principe des listes de vœux pour l’adapter au plus
          possible à la réalité. Vous faites vos vœux, vous partagez l
          a liste à vos contacts et WhisingWell se charge
          de coordonner tout le monde en évitant les doublons et les
          déceptions. Vous pouvez tout souhaiter : des produits
          issus du e-commerce, des objets achetés directement par vos
          proches dans des commerces de proximité, des produits
          d’occasion ou encore du fait maison ! Rien n’est impossible.
          Les limites sont celles de votre imagination.
        </Col>

        <Col>
          <Image src={cadeau} alt="cadeau" className="accueil_cadeau" />
        </Col>

      </Row>

      <Row className="background">
        <Col>
          <Image src={pc} alt="cadeau" className="accueil_pc" />
        </Col>

        <Col className="text">
          Mais, avec ce système, c’est la fin des surprises ?
          Pas forcément ! En effet, vos proches pourront également indiquer plein
          de bonnes idées cadeaux qu’ils ont pour vous et que d’autres pourront
          ensuite s’approprier. Et s’ils achètent autre chose,
          ils pourront également l’indiquer à la communauté pour
          être sûr que personne d’autre ne l’offrira en double.

          Avec Wishing Well, fini le casse-tête et les déceptions !
        </Col>
      </Row>

    </div>
  </Route>
);

export default Accueil;

/* <div className="Accueil">
    <img src={bandeau} alt="bandeau" className="Accueil_bandeau" />
    <img src={background} alt="background" className="app_background" />
    <article className="Accueil_article">
      <img src={article1} alt="cadeau" className="Accueil_article_1" />
      <p className="text">
        loremjkbhj  hjhyyy   yyyyyyyy       yyyyyyyy
      </p>
    </article>
  </div> */
