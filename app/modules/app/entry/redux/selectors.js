import { createSelector } from 'reselect';

const selectEntry = state => state.app.entry;

const makeSelectEntryList = () =>
  createSelector(
    selectEntry,
    entryState => entryState.entries.list,
  );

const makeSelectEntryListLoading = () =>
  createSelector(
    selectEntry,
    entryState => entryState.entries.loading,
  );

const makeSelectEntryReport = () =>
  createSelector(
    selectEntry,
    entryState => entryState.report.list,
  );

const makeSelectEntryReportLoading = () =>
  createSelector(
    selectEntry,
    entryState => entryState.report.loading,
  );

const makeSelectEntry = () =>
  createSelector(
    selectEntry,
    entryState => entryState.entry.data,
  );

const makeSelectEntryLoading = () =>
  createSelector(
    selectEntry,
    entryState => entryState.entry.loading,
  );

export {
  selectEntry,
  makeSelectEntryList,
  makeSelectEntryListLoading,
  makeSelectEntry,
  makeSelectEntryLoading,
  makeSelectEntryReport,
  makeSelectEntryReportLoading,
};
