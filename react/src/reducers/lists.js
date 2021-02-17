import {
  SAVE_LISTS, SAVE_OWN_LISTS, SAVE_FRIENDS_LISTS, SAVE_SLUG, SAVE_LIST_INFOS, LOG_OUT,
} from 'src/actions/lists';

const initialState = {
  // ici l'état initial
  allLists: [],
  ownLists: [],
  friendsLists: [],
  currentListSlug: '',
  currentListInfos: {},

};

const lists = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_LISTS:
      return {
        ...state,
        allLists: action.listsArray,
      };
    case SAVE_OWN_LISTS:
      return {
        ...state,
        ownLists: action.listsArray,
      };
    case SAVE_FRIENDS_LISTS:
      return {
        ...state,
        friendsLists: action.listsArray,
      };
    case SAVE_SLUG:
      return {
        ...state,
        currentListSlug: action.slug,
      };
    case SAVE_LIST_INFOS:
      return {
        ...state,
        currentListInfos: action.listInfos,
      };
    case LOG_OUT:
      return {
        ...initialState,
        // ...state,
        // token: '',
        // isLogged: false,
      };

    default:
      return { ...state };
  }
};

export default lists;
