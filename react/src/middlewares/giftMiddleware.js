import axios from 'axios';

import {

  saveGifts,
  FETCH_GIFTS,
  FETCH_GIFT_DETAILS,
  saveGiftDetails,
  HANDLE_CLICK_BOUGHT,
  deleteGiftFromState,
  DELETE_GIFT,
  clearStateGifts,
  EDIT_GIFT,
  ADD_GIFT,
  FETCH_CURRENT_GIFT_INFOS,
  saveCurrentGiftInfos,
  HANDLE_CLICK_BOUGHT_LIST,
  HANDLE_CLICK_STOP_BOUGHT_LIST,
} from 'src/actions/gift';

const giftMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_GIFTS: {
      console.log('middleware fetch gifts');
      const { currentListSlug } = store.getState().lists;
      const { token } = store.getState().user;
      console.log(currentListSlug);

      axios.get(`http://54.208.46.110/data/api/v1/gifts?wishlist=${currentListSlug}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log('reponse de la requete get pour avoir un gift', response);
          // TODO Trouver une autre méthode avec map()
          for (const gift of response.data) {
            if (gift.details !== null) {
              gift.details = gift.details.slice(0, 80);
              console.log(gift.details);
            }
          }
          store.dispatch(saveGifts(response.data));
        })
        .catch((error) => {
          console.log('erreur requete:', error);
        });

      next(action);
      break;
    }

    case EDIT_GIFT: {
      console.log('middleware EDIT_GIFT ');
      const { token } = store.getState().user;
      const {
        name, description, link, picture, isHighlighted,
      } = store.getState().gift;
      console.log('name', name);
      console.log(action.nomDeLaListe);
      let isHighlightedNumber = 0;
      if (isHighlighted === true) {
        isHighlightedNumber = 1;
      }

      axios.patch(`http://54.208.46.110/data/api/v1/gifts/${action.slugDuGift}`, {
        name,
        details: description,
        link,
        picture,
        isHighlighted: isHighlightedNumber,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log('reponse de la requete get pour avoir un gift', response);
          store.dispatch(clearStateGifts());
        })
        .then(() => {
          window.location = `/listes/${action.nomDeLaListe}`;
        })
        .catch((error) => {
          console.log('erreur requete:', error);
        });

      next(action);
      break;
    }

    case DELETE_GIFT: {
      console.log('gift middleware case delete gift valeur de slugDuGift:', action.slugDuGift);
      // recupération du slug du gift sans passer par le state
      const { token } = store.getState().user;

      axios.delete(`http://54.208.46.110/data/api/v1/gifts/${action.slugDuGift}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log('reponse de la requete get pour supprimer un gift', response);
          store.dispatch(deleteGiftFromState(action.slugDuGift));
        })
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.log('erreur requete:', error);
        });

      next(action);
      break;
    }
    case FETCH_GIFT_DETAILS: {
      const { nomDuGift } = store.getState().gift;
      const { token } = store.getState().user;

      axios.get(`http://54.208.46.110/data/api/v1/gifts/${nomDuGift}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log(response);
          store.dispatch(saveGiftDetails(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      next(action);
      break;
    }

    case FETCH_CURRENT_GIFT_INFOS: {
      const nomDuGift = action.nomDuWish;
      const { token } = store.getState().user;

      axios.get(`http://54.208.46.110/data/api/v1/gifts/${nomDuGift}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log(response.data.isHighlighted);
          store.dispatch(saveCurrentGiftInfos(
            response.data.name,
            response.data.details,
            response.data.link,
            response.data.picture,
            response.data.isHighlighted,
          ));
        })
        .catch((error) => {
          console.log(error);
        });
      next(action);
      break;
    }

    case HANDLE_CLICK_BOUGHT: {
      const { nomDuGift } = store.getState().gift;
      const { status } = store.getState().gift.details;
      const { token } = store.getState().user;

      axios.patch(`http://54.208.46.110/data/api/v1/gifts/${nomDuGift}`, {
        status: !status,
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

    case ADD_GIFT: {
      console.log('je suis dans giftMiddleWare, action ADD_GIFT');
      
      const {
        wishlistId, name, status, description, link, picture, type, isHighlighted,
      } = store.getState().gift;
      const { token } = store.getState().user;
      const { currentListSlug } = store.getState().lists;
      let isHighlightedNumber = 0;
      if (isHighlighted === true) {
        isHighlightedNumber = 1;
      }
      console.log('console.log(isHighlighted) dans add gift middleware:', isHighlighted);
      axios.post('http://54.208.46.110/data/api/v1/gifts', {
        wishlist: wishlistId,
        name,
        status,
        details: description,
        link,
        picture,
        type,
        isHighlighted: isHighlightedNumber,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log('response du ad gift:', response);
          store.dispatch(clearStateGifts());
        })
        .then(() => {
          window.location = `/listes/${currentListSlug}`;
        })

        .catch((error) => {
          console.log('erreur de requete:', error);
        });

      next(action);
      break;
    }

    case HANDLE_CLICK_BOUGHT_LIST: {
      const { giftSlug } = action;
      const { token } = store.getState().user;

      axios.patch(`http://54.208.46.110/data/api/v1/gifts/${giftSlug}`, {
        status: 1,
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

    case HANDLE_CLICK_STOP_BOUGHT_LIST: {
      const { giftSlug } = action;
      const { token } = store.getState().user;

      axios.patch(`http://54.208.46.110/data/api/v1/gifts/${giftSlug}`, {
        status: 0,
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
      next(action);
  }
};
export default giftMiddleware;
