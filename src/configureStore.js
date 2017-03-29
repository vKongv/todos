import { createStore } from 'redux';
import todoApp from './reducers';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle';

const logger = (store) => (next) => {
  if (!console.group) {
    return next;
  }
  return (action) => {
    console.group(action.type);
    console.log('%c prev state', 'color: gray', store.getState());
    console.log('%c action', 'color: blue', action);
    const returnValue = next(action);
    console.log('%c next state', 'color: green', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  };
};

const promise = () => (next) => (action) => {
    if (typeof action.then === 'function') {
      return action.then(next);
    }
    return next(action);
  };

const wrapDispatchWithMiddlewares = (store, middlewares) => {
  middlewares.slice().reverse().forEach(middleware => // eslint-disable-line
    store.dispatch = middleware(store)(store.dispatch) // eslint-disable-line
  );
};

const configureStore = () => {
  const persistedState = loadState();
  /* eslint-disable no-underscore-dangle */
  const store = createStore(
    todoApp,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  /* eslint-enable */
  const middlewares = [promise];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }

  wrapDispatchWithMiddlewares(store, middlewares);

  store.subscribe(throttle(() => {
    saveState({
      todos: store.getState().todos,
    });
  }, 1000));

  return store;
};


export default configureStore;
