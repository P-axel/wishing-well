import {
  CHANGE_NAME,
  CHANGE_EVENT_DATE,
  CHANGE_DESCRIPTION,
  CLEAR_CREATE_LIST,
} from '../actions/createList';

const initialState = {
  name: '',
  eventDate: '',
  description: '',
};

const nameForTheReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_NAME:
      return {
        ...state,
        name: action.value,
      };
    case CHANGE_EVENT_DATE:
      return {
        ...state,
        eventDate: action.value,
      };
    case CHANGE_DESCRIPTION:
      return {
        ...state,
        description: action.value,
      };
    case CLEAR_CREATE_LIST:
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

export default nameForTheReducer;
