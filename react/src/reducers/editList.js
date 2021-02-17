import {
  GET_SLUG,
  SAVE_LIST,
  CHANGE_NAME_EDIT_LIST,
  CHANGE_EVENT_DATE_EDIT_LIST,
  CHANGE_DESCRIPTION_EDIT_LIST,
  CLEAR_EDIT_LIST,
} from 'src/actions/editList';

const initialState = {
  name: '',
  eventDate: '',
  description: '',
  slug: '',
};

const editList = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_SLUG:
      return {
        ...state,
        slug: action.slug,
      };
    case SAVE_LIST:
      return {
        ...state,
        name: action.list.name,
        // substring permet de récupérer le début du string "2020-01-02T00:12:00+00:00"
        eventDate: action.list.eventDate.substring(0, 10),
        description: action.list.description,
      };
    case CHANGE_NAME_EDIT_LIST:
      return {
        ...state,
        name: action.value,
      };
    case CHANGE_EVENT_DATE_EDIT_LIST:
      return {
        ...state,
        eventDate: action.value,
      };
    case CHANGE_DESCRIPTION_EDIT_LIST:
      return {
        ...state,
        description: action.value,
      };
    case CLEAR_EDIT_LIST:
      return {
        ...state,
        name: '',
        eventDate: '',
        description: '',
      };
    default:
      return { ...state };
  }
};

export default editList;
