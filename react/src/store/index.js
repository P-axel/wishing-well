import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import listsMiddleware from 'src/middlewares/listsMiddleware';
import userMiddleware from 'src/middlewares/userMiddleware';
import giftMiddleware from 'src/middlewares/giftMiddleware';
import createListMiddleware from 'src/middlewares/createListMiddleware';
import editListMiddleware from 'src/middlewares/editListMiddleware';
// autre middleware qu'on peut importer : import userMiddleware from 'src/middlewares/user';

import rootReducer from 'src/reducers';

const saveToLocalStorage = (state) => {
  try {
    // Serialize the state. Redux store is recommended to be serializable.
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  }
  catch (error) {
    console.log(error);
  }
};

const loadFromLocalStorage = () => {
  // We need the try block because user may not permit our accessing localStorage.
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) { // The key 'state' does not exist.
      return undefined; // Let our reducer initialize the app.
    }
    return JSON.parse(serializedState);
  }
  catch (error) {
    console.log(error);
    return undefined; // Let our reducer initialize the app.
  }
};

const persistedState = loadFromLocalStorage();

// on combine devTools avec les middlewares
const enhancers = composeWithDevTools(
  applyMiddleware(
    listsMiddleware,
    userMiddleware,
    giftMiddleware,
    createListMiddleware,
    editListMiddleware,
    // ... d'autres middlewares
  ),
);

const store = createStore(
  // reducer
  rootReducer,
  persistedState,
  // enhancer
  enhancers,
);

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
