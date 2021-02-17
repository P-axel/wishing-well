// == Import npm
import React from 'react';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
  Heart, Smile, Copy, Gift
} from 'react-feather';
import { Route } from 'react-router-dom';

import Header from 'src/components/Header';
// == Import
// import reactLogo from './react-logo.svg';
import familyCover from 'src/assets/images/family.jpg';
import logo from 'src/assets/images/blackLogo.png';
import './accueil.scss';

// == Composant
const Accueil = () => (
  <Route path="/" exact>
    <Header />
    <main>
      <Container fluid>
        <Row className="description">
          <Col>
            <h2 className="description_title">Simplifiez vous la vie, offrez des cadeaux en toute sérénité</h2>
            <p className="description_text">
              Qui ne s’est encore jamais arraché les cheveux au moment des anniversaires et des fêtes de Noël pour trouver un cadeau approprié à chaque personne ? Qui n’a jamais eu de déception au moment de déballer des cadeaux en constatant que quelqu’un d’autre avait déjà eu la même idée ? S’il est possible de se concerter avec les membres de son foyer, cela devient de plus en plus compliqué quand il s’agit de coordonner plusieurs familles ainsi que différents cercles d’amis. La solution ? Wishing Well !
            </p>
            <p className="description_text">
              Chez Wishing Well, nous avons essayé de repenser le principe des listes de vœux pour l’adapter au plus possible à la réalité. Vous faites vos vœux, vous partagez la liste à vos contacts et WhisingWell se charge de coordonner tout le monde en évitant les doublons et les déceptions. Vous pouvez tout souhaiter : des produits issus du e-commerce, des objets achetés directement par vos proches dans des commerces de proximité, des produits d’occasion ou encore du fait maison ! Rien n’est impossible. Les limites sont celles de votre imagination.
            </p>
            <p className="description_text">
              Mais, avec ce système, c’est la fin des surprises ? Pas forcément ! En effet, vos proches pourront également indiquer plein de bonnes idées cadeaux qu’ils ont pour vous et que d’autres pourront ensuite s’approprier. Et s’ils achètent autre chose, ils pourront également l’indiquer à la communauté pour être sûr que personne d’autre ne l’offrira en double.
            </p>
            <p className="description_text">
              Avec Wishing Well, fini le casse-tête et les déceptions !
            </p>
          </Col>
        </Row>
        <Row className="features_announcer">
          <Col>
            <h2>Pourquoi utiliser ce site</h2>
          </Col>
        </Row>
        <Row className="features">
          <div className="features_feature col-md-3 col-sm-6">
            <Gift color="black" size={70} />
            <h4 className="features_title">Liste de voeux personalisée</h4>
            <p className="features_description">
              Crééz une liste de voeux qui corresponde exactement à vos besoins. Décrivez avec précision ce que vous désirez. <strong>Vous pouvez tout souhaiter</strong> : un objet issu du commerce (en ligne ou pas), un objet fait maison, une place pour un évènement culturel, une activité à sensations fortes, une repas dans un restaurant gastronomique, ...
             </p> 
          </div>
          <div className="features_feature col-md-3 col-sm-6">
            <Smile color="black" size={70} />
            <h4 className="features_title">Des surprises</h4>
            <p className="features_description">
              Vos proches peuvent <strong>ajouter des idées de surprises</strong> sur votre liste que vous ne verrez pas. Ainsi, ils peuvent s'échanger de bonnes idées pour garder la magie d'un cadeau surprise.
            </p>
          </div>
          <div className="features_feature col-md-3 col-sm-6">
            <Copy color="black" size={70} />
            <h4 className="features_title">Pas de doublons</h4>
            <p className="features_description">
              Chacun de vos proche peut indiquer en direct de quel(s) cadeau(x) il s'occupe, informant ainsi toute la communauté (sauf vous bien sûr !). De cette manière, <strong>personne n'achètera deux fois le même cadeau</strong>. Et s'ils achètent un cadeau qui n'est pas dans la liste ? Ils n'ont plus qu'à le rajouter comme surpise et indiquer qu'ils s'en occupent.
            </p>
          </div>
          <div className="features_feature col-md-3 col-sm-6">
            <Heart color="black" size={70} />
            <h4 className="features_title">Des cadeaux appréciés</h4>
            <p className="features_description">
              Si vous voulez acheter un cadeau à un proche, il vous suffit de visiter sa liste (que vous pouvez suivre pour la retrouver plus facilement) au lien qu'il vous aura communiqué. Il n'y a ensuite plus qu'à piocher parmis les idées proposées. <strong>Vous serez sûr de taper dans le mille</strong>. Les voeux les plus importants pour votre proche seront indiqués par un coeur. Les cadeaux déjà achetés seront grisés. Quand vous choissez un cadeau, n'oubliez pas d'indiquer que vous vous en occupez pour que personne d'autre ne l'achète.
            </p>
          </div>
        </Row>
      </Container>
    </main>
  </Route>
);

// == Export
export default Accueil;

// <img src={familyCover} alt="cover" className="coverImage" />
