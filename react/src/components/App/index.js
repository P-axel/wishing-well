// == Import npm
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
// import PropTypes from 'prop-types';

// == Import
import './styles.scss';
import TopBar from 'src/containers/TopBar';
import Footer from 'src/components/Footer';
import Accueil from 'src/components/Accueil';
import LoginForm from 'src/containers/LoginForm';
import TableauDeBord from 'src/containers/TableauDeBord';
import CreateEditList from 'src/containers/CreateEditList';
import EditList from 'src/containers/EditList';
import CreatorList from 'src/containers/CreatorList';
import EditGift from 'src/containers/EditGift';
import Inscription from 'src/containers/Inscription';
import Team from 'src/components/Team';
import Profil from 'src/containers/Profil';
import Gift from 'src/containers/Gift';
import Construction from 'src/components/Construction';

// == Composant
const App = () => (
  <div className="app">
    <TopBar />
    <Router>
      <Switch>
        <Route exact path="/">
          <Accueil />
        </Route>
        <Route exact path="/inscription">
          <Inscription />
        </Route>
        <Route exact path="/connexion">
          <LoginForm />
        </Route>
        <Route exact path="/en-construction">
          <Construction />
        </Route>
        <Route exact path="/listes/:nomDeLaListe/ajout-souhait">
          <EditGift addWish="true" />
        </Route>
        <Route exact path="/listes/:nomDeLaListe/ajout-surprise">
          <EditGift addSurprise="true" />
        </Route>
        <Route exact path="/listes/:slug/edition">
          <EditList />
        </Route>
        <Route exact path="/listes/:nomDeLaListe/:nomDuGift">
          <Gift />
        </Route>
        <Route exact path="/listes/:nomDeLaListe">
          <CreatorList />
        </Route>
        <Route exact path="/listes">
          <TableauDeBord />
        </Route>
        <Route exact path="/liste/edition">
          <CreateEditList />
        </Route>
        <Route exact path="/listes/:nomDeLaListe/:nomDuWish/edition-souhait">
          <EditGift creatorModify="true" />
        </Route>
        <Route exact path="/listes/:nomDeLaListe/:nomDeLaSurprise/edition-surprise">
          <EditGift surpriseModify="true" />
        </Route>
        <Route exact path="/Equipe">
          <Team />
        </Route>
        <Route exact path="/Profil">
          <Profil />
        </Route>
      </Switch>
      <Footer />
    </Router>
  </div>
);

// == Export

export default App;

// user4@k.s

// impedit-facilis-excepturi-provident-ducimus-assumenda-et
