import invariant from 'invariant';
import { isEmpty, isFunction, isString } from 'lodash';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import checkStore from './checkStore';
import createReducer from '../reducers';

export function injectReducerFactory(store, isValid) {
  return function injectReducer(key, reducer) {
    if (!isValid) checkStore(store);

    invariant(
      isString(key) && !isEmpty(key) && isFunction(reducer),
      '(app/utils...) injectReducer: Expected `reducer` to be a reducer function',
    );

    const PersistConfig = {
      key,
      storage,
    };
    const persisreducer = persistReducer(PersistConfig, reducer);
    // Check `store.injectedReducers[key] === reducer` for hot reloading when a key is the same but a reducer is different
    if (
      Reflect.has(store.injectedReducers, key) &&
      store.injectedReducers[key] === persisreducer
    )
      return;

    store.injectedReducers[key] = persisreducer; // eslint-disable-line no-param-reassign
    store.replaceReducer(createReducer(store.injectedReducers));
  };
}

export default function getInjectors(store) {
  checkStore(store);

  return {
    injectReducer: injectReducerFactory(store, true),
  };
}
