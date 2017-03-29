import { createStore } from 'redux';
import todoApp from './reducers';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle';

const configureStore = () => {
  const persistedState = loadState();
  /* eslint-disable no-underscore-dangle */
  const store = createStore(
    todoApp,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  /* eslint-enable */
  store.subscribe(throttle(() => {
    saveState({
      todos: store.getState().todos,
    });
  }, 1000));

  return store;
};


export default configureStore;
