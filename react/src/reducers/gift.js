import {
  SAVE_GIFT,
  SAVE_GIFTS,
  DELETE_GIFT_FROM_STATE,
  CLEAR_STATE_GIFTS,
  GET_GIFT_DETAILS_SLUG,
  SAVE_GIFT_DETAILS,
  LOG_OUT,
  EDIT_GIFT,
  ADD_NEW_GIFT,
  UPDATE_GIFT_FIELD,
  SAVE_CURRENT_GIFT_INFOS,
} from 'src/actions/gift';

const initialState = {
  // ici l'état initial
  details: [],
  giftsList: [],
  name: '',
  description: '',
  link: '',
  picture: null,
  isHighlighted: false,
  wishlistId: '',
  type: '',
  status: 0,
  nomDuGift: '',
  nomDeLaListe: '',
  id: '',
  slug: '',
  isArchived: '',
  createdAt: '',
  updatedAt: '',
};

const gift = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_GIFT_FIELD:
      return {
        ...state,
        [action.name]: action.value,
      };
    case SAVE_GIFT:
      return {
        ...state,
        details: action.giftDetails,
      };

    case SAVE_GIFTS:
      return {
        ...state,
        giftsList: action.giftList,
      };

    case CLEAR_STATE_GIFTS:
      return {
        ...initialState,
      };

    case ADD_NEW_GIFT:
      return {
        ...state,
      };

    case DELETE_GIFT_FROM_STATE: {
      console.log('slug du gift', action.slugDuGift);
      console.log('filter du reducer', state.giftsList.filter((currentGift, slug) => slug !== action.slugDuGift));
      return {
        ...state,
        giftsList: state.giftsList.filter((currentGift, slug) => slug !== action.slugDuGift),
      };
    }

    case LOG_OUT:
      return {
        ...initialState,
        // ...state,
        // token: '',
        // isLogged: false,

        // c'est quoi ? details: action.giftDetails,
      };

    case EDIT_GIFT:
      return {
        ...state,
        allLists: action.details,

      };

    case GET_GIFT_DETAILS_SLUG:
      return {
        ...state,
        nomDuGift: action.nomDuGift,
        nomDeLaListe: action.nomDeLaListe,
      };
    case SAVE_GIFT_DETAILS:
      return {
        ...state,
        details: action.giftDetails,
      };

    case SAVE_CURRENT_GIFT_INFOS: {
      console.log('action.isHighlighted dans reducer:', action.isHighlighted);
      console.log('action.name dans reducer:', action.name);

      return {
        ...state,
        name: action.name,
        description: action.details,
        link: action.link,
        picture: action.picture,
        isHighlighted: action.isHighlighted,
      };
    }
    default:
      return { ...state };
  }
};

export default gift;
