import React from 'react';
import {
  Linkedin, GitHub
} from 'react-feather';

import './team.scss';

const Team = () => (
  <div className="team">
    <h2>Présentation de l'équipe</h2>
    <div className="team-details">
      Ce projet a pu voir le jour dans le cadre d'une Apothéose chez l'école O'clock.
      Le groupe était composé de ces 5 élèves :
      <div className="cards">
        <div className="card">
          <img className="card-img-top" alt="" />
          <div className="card-body">
            <h5 className="card-title"><span>Céline</span><span className="card-tag tag-back">Back</span></h5>
            <p className="card-role">Product Owner / Lead Back</p>
            <p className="card-text">Après une carrière dans l'enseignement, j'ai effectué une reconversion dans le développement web pour suivre mes rêves.</p>
            <div className="card-link">
              <a className="btn btn-primary mx-3" href="https://www.linkedin.com/in/celinecetre"><Linkedin /></a>
              <a className="btn btn-dark mx-3" href="https://github.com/Celine68"><GitHub /></a>
            </div>
          </div>
        </div>
        <div className="card">
          <img className="card-img-top" alt="" />
          <div className="card-body">
            <h5 className="card-title"><span>Clément</span><span className="card-tag tag-front">Front</span></h5>
            <p className="card-role">Scrum Master</p>
            <p className="card-text">Après plusieurs années dans le secteur assurantiel, j'ai débuté ma reconversion professionnelle en suivant la formation proposée par O'Clock.</p>
            <div className="card-link">
              <a className="btn btn-primary mx-3" href="https://www.linkedin.com/in/clementgaxotte"><Linkedin /></a>
              <a className="btn btn-dark mx-3" href="https://github.com/ClementGax"><GitHub /></a>
            </div>
          </div>
        </div>
        <div className="card">
          <img className="card-img-top" alt="" />
          <div className="card-body">
            <h5 className="card-title"><span>Gaëtan</span><span className="card-tag tag-back">Back</span></h5>
            <p className="card-role">Git Master</p>
            <p className="card-text">Débuté en autodidacte, le monde du développement web me captive toujours et pour parfaire mes acquis j'ai intégré une formation en ligne chez O'Clock. </p>
            <div className="card-link">
              <a className="btn btn-primary mx-3" href="https://www.linkedin.com/in/ga%C3%ABtan-jerphagnon-461244b8"><Linkedin /></a>
              <a className="btn btn-dark mx-3" href="https://github.com/GaetanJerphagnon"><GitHub /></a>
            </div>
          </div>
        </div>
        <div className="card">
          <img className="card-img-top" alt="" />
          <div className="card-body">
            <h5 className="card-title"><span>Pierre-Axel</span><span className="card-tag tag-front">Front</span></h5>
            <p className="card-role">Réferent technique React</p>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a className="btn btn-dark">Lien portfolio?</a>
          </div>
        </div>
        <div className="card">
          <img className="card-img-top" alt="" />
          <div className="card-body">
            <h5 className="card-title"><span>Yacine</span><span className="card-tag tag-front">Front</span></h5>
            <p className="card-role">Lead Front</p>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a className="btn btn-dark">Lien portfolio?</a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Team;
