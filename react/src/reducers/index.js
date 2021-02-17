import { combineReducers } from 'redux';
// on importe tous les reducers
import listsReducer from './lists';
import userReducer from './user';
import giftReducer from './gift';
import createListReducer from './createList';
import editListReducer from './editList';

// etc
// le reducer principal, qui regroupe les autres
// combineReducers prend en argument un objet qui indique un nom pour
// chaque reducer
const rootReducer = combineReducers({
  lists: listsReducer,
  user: userReducer,
  gift: giftReducer,
  createList: createListReducer,
  editList: editListReducer,
  // etc
});

export default rootReducer;
