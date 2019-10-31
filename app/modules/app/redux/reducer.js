import { combineReducers } from 'redux';

import userReducer from '../user/redux/reducer';
// import entryReducer from '../entry/redux/reducer';

const appReducer = combineReducers({
  user: userReducer,

  // entry: entryReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'auth/logout') {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
