import axios from 'axios';

import {
  DELETE_PROFIL,
  LOG_IN,
  saveTokenAndUserInfos,
  ADD_USER,
  redirectUser, deleteUserFromState,
  FETCH_USER_DETAILS,
} from 'src/actions/user';

const userMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case LOG_IN: {
      console.log('je suis dans userMiddleware, action LOG_IN');

      const { email, password } = store.getState().user;

      console.log('valeur du store.getState', store.getState().user);
      // je test le login en dur ici en attendant d'avoir mon composant Login
      axios.post('http://54.208.46.110/data/api/login_check', {
        username: email,
        password,
      }, {
        /* options supplémentaires : ici on veut autoriser l'envoi des informations
        d'authentification, donc le cookie */
        withCredentials: true,
      })
        .then((response) => {
          console.log('response du post login:', response);
          store.dispatch(saveTokenAndUserInfos(
            response.data.firstname,
            response.data.lastname,
            response.data.slug,
            response.data.token,
            response.data.avatar,
            response.data.birthday,
            response.data.email,
          ));
        })
        // .then(() => {
        //   store.dispatch(fetchOwnLists());
        // })
        // .then(() => {
        //   store.dispatch(fetchFriendsLists());
        // })
        .catch((error) => {
          console.log('erreur de requete http://54.208.46.110/data/api/login_check:', error);
        });

      next(action);
      break;
    }

    case ADD_USER: {
      console.log('je suis dans userMiddleware, action ADD_USER');

      const {
        firstname, lastname, email, birthday, password, avatar,
      } = store.getState().user;

      console.log('valeur du store.getState', store.getState().user);
      // je test le login en dur ici en attendant d'avoir mon composant Login
      axios.post('http://54.208.46.110/data/api/v1/users', {
        firstname,
        lastname,
        email,
        birthday,
        password,
        avatar,
      }, {
        /* options supplémentaires : ici on veut autoriser l'envoi des informations
        d'authentification, donc le cookie */
        withCredentials: true,
      })
        .then((response) => {
          console.log('response du post login:', response);
          store.dispatch(redirectUser(
            response.data.slug,
          ));
        })

        .catch((error) => {
          console.log('erreur de requete http://54.208.46.110/data/api/login_check:', error);
        });

      next(action);
      break;
    }

    case FETCH_USER_DETAILS: {
      const { token } = store.getState().user;
      console.log('je suis dans le middleware FETCH_USER_DETAILS');
      console.log('token', token);

      axios.get('http://54.208.46.110/data/api/v1/users/current', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log(response);

          store.dispatch(saveTokenAndUserInfos(
            response.data.firstname,
            response.data.lastname,
            response.data.slug,
            token,
            response.data.avatar,
            response.data.birthday,
            response.data.email,
          ));
        })
        .catch((error) => {
          console.log(error);
        });
      next(action);
      break;
    }

    case DELETE_PROFIL: {
      console.log('gift middleware case delete profil:', action.deleteProfil);
      // recupération du profil

      const { token } = store.getState().user;
      console.log('valeur du store.getState', store.getState().user);
      // je test le login en dur ici en attendant d'avoir mon composant Login
      axios.delete(`http://54.208.46.110/data/api/v1/users/${action.deleteProfil}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log('reponse de la requete get pour supprimer un user', response);
          store.dispatch(deleteUserFromState(
            action.slugDuUser,
          ));
        })
        .catch((error) => {
          console.log('erreur requete:', error);
        });

      next(action);
      break;
    }
    // case LOG_OUT: {
    //   store.dispatch(redirectUser(
    //     store.getState().user.slug,
    //   ));

    //   next(action);
    //   break;
    // }
    default:
      // on passe l'action au suivant (middleware suivant ou reducer)
      next(action);
  }
};
export default userMiddleware;
// user4@k.s
