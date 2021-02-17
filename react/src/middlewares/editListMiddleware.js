import axios from 'axios';

import {
  FETCH_LIST, saveList, EDIT_LIST, clearEditList,

} from 'src/actions/editList';

const editListMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_LIST: {
      const { slug } = store.getState().editList;
      const { token } = store.getState().user;

      axios.get(`http://54.208.46.110/data/api/v1/wishlists/${slug}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log(response);
          store.dispatch(saveList(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      next(action);
      break;
    }
    case EDIT_LIST: {
      const { slug } = store.getState().editList;
      const { name, eventDate, description } = store.getState().editList;
      const { token } = store.getState().user;

      axios.put(`http://54.208.46.110/data/api/v1/wishlists/${slug}`, {
        name,
        eventDate,
        description,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log(response);
          store.dispatch(clearEditList());
          window.location.href = `/listes/${slug}`;
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
export default editListMiddleware;
