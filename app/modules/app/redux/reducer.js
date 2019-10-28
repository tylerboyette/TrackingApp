import produce from 'immer';
import * as CONSTANTS from './constants';

// The initial state of the App
export const initialState = {
  name: null,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CONSTANTS.LOGIN_SUCCESS:
        // Delete prefixed '@' from the github username
        draft.name = action.data;
        break;
      case CONSTANTS.LOGOUT:
        draft.name = null;
        break;
    }
  });

export default appReducer;
