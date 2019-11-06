import produce from 'immer';
import * as CONSTANTS from './constants';

const newEntry = {
  duration: 0,
  distance: 0,
  date: new Date(),
};

const initialState = {
  entries: {
    list: [],
    loading: false,
  },
  report: {
    list: [],
    loading: false,
  },
  entry: {
    id: '',
    data: {},
    error: [],
    loading: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const entryReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CONSTANTS.LOAD_NEW_ENTRY:
        draft.entry = {
          data: newEntry,
          id: 'new',
          error: [],
          loading: false,
        };
        break;

      case CONSTANTS.ENTRY_LIST_REQUEST:
        draft.entries.loading = true;
        break;
      case CONSTANTS.ENTRY_LIST_SUCCESS:
        draft.entries.list = action.data;
        draft.entries.loading = false;
        break;
      case CONSTANTS.ENTRY_LIST_ERROR:
        draft.entries.loading = false;
        break;

      case CONSTANTS.ENTRY_LOAD_REQUEST:
        draft.entry.loading = true;
        break;
      case CONSTANTS.ENTRY_LOAD_SUCCESS:
        draft.entry.data = action.data;
        draft.entry.id = action.data._id;
        draft.entry.loading = false;
        break;
      case CONSTANTS.ENTRY_LOAD_ERROR:
        draft.entry.loading = false;
        break;

      case CONSTANTS.ENTRY_SAVE_REQUEST:
        draft.entry.loading = true;
        draft.entry.error = [];
        break;
      case CONSTANTS.ENTRY_SAVE_SUCCESS:
        draft.entry.id = action.date._id;
        draft.entry.data.id = action.date._id;
        draft.entry.loading = false;
        break;
      case CONSTANTS.ENTRY_SAVE_ERROR:
        draft.entry.loading = false;
        draft.entry.error = action.data.error;
        break;

      case CONSTANTS.UPDATE_ENTRY_FIELD:
        draft.entry.data[action.field] = action.value;
        break;

      case CONSTANTS.ENTRY_REPORT_REQUEST:
        draft.report.loading = true;
        break;
      case CONSTANTS.ENTRY_REPORT_SUCCESS:
        draft.report.loading = false;
        draft.report.list = action.data;
        break;
      case CONSTANTS.ENTRY_REPORT_ERROR:
        draft.report.loading = false;
        break;
      case CONSTANTS.ENTRY_DELETE_REQUEST:
        draft.entries.loading = true;
        draft.entry.loading = true;
        break;
      case CONSTANTS.ENTRY_DELETE_SUCCESS: {
        const entryList = state.entries.list;
        const filteredList = entryList.filter(entry => entry._id !== action.id);
        draft.entries.list = filteredList;
        draft.entries.loading = false;
        draft.entry.loading = false;
        break;
      }

      case CONSTANTS.ENTRY_DELETE_ERROR:
        draft.entries.loading = false;
        draft.entry.loading = false;
        break;
    }
  });

export default entryReducer;
