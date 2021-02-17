import axios from 'axios';

import {
  // FETCH_OWN_LISTS,
  saveOwnLists,
  FETCH_LISTS,
  // FETCH_FRIENDS_LISTS,
  saveFriendsLists,
  FETCH_LIST_INFOS,
  saveListInfos,
  HANDLE_CLICK_FOLLOW,
  HANDLE_CLICK_UNFOLLOW,
  DELETE_LISTS,
} from 'src/actions/lists';

const listsMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_LISTS: {
      console.log('je suis dans listsmiddleware, action FETCH_LISTS');

      const { token } = store.getState().user;

      console.log('valeur du token en destructurant le store', token);

      axios.get('http://54.208.46.110/data/api/v1/wishlists', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          // traitement si réponse est un succès
          console.log('reponse de la requete get pour avoir les wishlists créés', response);

          // je veux stocker response.data dans le state => seule possibilité,
          // dispatch une action au store
          store.dispatch(saveOwnLists(response.data.created));
          store.dispatch(saveFriendsLists(response.data.followed));
        })
        .catch((error) => {
          console.log('la requete http://18.206.251.177/api/v1/wishlists a été lancé et a échoué', error);
        });

      next(action);
      break;
    }

    case DELETE_LISTS: {
      const { token } = store.getState().user;

      axios.delete(`http://54.208.46.110/data/api/v1/wishlists/${action.nomDeLaListe}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log('reponse de la requete get pour supprimer une wishlist', response);
          window.location = '/listes';
        })
        .catch((error) => {
          console.log('erreur requete:', error);
        });

      next(action);
      break;
    }

    case FETCH_LIST_INFOS: {
      console.log('je suis dans listsmiddleware, action FETCH_LIST_INFOS');

      const { token } = store.getState().user;

      const { currentListSlug } = store.getState().lists;
      console.log('currentListSlug', currentListSlug);

      axios.get(`http://54.208.46.110/data/api/v1/wishlists/${currentListSlug}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          // traitement si réponse est un succès
          store.dispatch(saveListInfos(response.data));
          console.log('reponse de la requete get pour avoir les infos de la liste en question', response);
        })
        .catch((error) => {
          console.log('la requete http://18.206.251.177/api/v1/wishlists a été lancé et a échoué', error);
        });

      next(action);
      break;
    }

    case HANDLE_CLICK_UNFOLLOW: {
      const { currentListSlug } = store.getState().lists;
      const { token } = store.getState().user;

      axios.patch(`http://54.208.46.110/data/api/v1/wishlists/${currentListSlug}`, {
        follower: 'remove',
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log(response);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });

      next(action);
      break;
    }

    case HANDLE_CLICK_FOLLOW: {
      const { currentListSlug } = store.getState().lists;
      const { token } = store.getState().user;

      axios.patch(`http://54.208.46.110/data/api/v1/wishlists/${currentListSlug}`, {
        follower: 'add',
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log(response);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });

      next(action);
      break;
    }

    default:
      // on passe l'action au suivant (middleware suivant ou reducer)
      next(action);
  }
};
export default listsMiddleware;
