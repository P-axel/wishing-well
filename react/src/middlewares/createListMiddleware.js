import axios from 'axios';

import { CREATE_LIST, clearCreateList } from 'src/actions/createList';

const createListeMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case CREATE_LIST: {
      const { name, eventDate, description } = store.getState().createList;
      const { token } = store.getState().user;

      axios.post('http://54.208.46.110/data/api/v1/wishlists', {
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
          store.dispatch(clearCreateList());
          window.location.href = '/listes';
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
export default createListeMiddleware;
