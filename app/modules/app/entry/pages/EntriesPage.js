import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import {
  Segment,
  Table,
  Header,
  Container,
  Dimmer,
  Loader,
  Button,
  Confirm,
} from 'semantic-ui-react';
import Pagination from 'components/Pagination';
import DateRangeFilter from 'components/DateRangeFilter';
import { entryListRequest, entryDeleteRequest } from '../redux/actions';
import {
  makeSelectEntryList,
  makeSelectEntryListLoading,
} from '../redux/selectors';

class EntriesPage extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      deleteId: null,
      showDeleteConfirm: false,
      page: 1,
      pageSize: 10,
      from: moment()
        .subtract(30, 'days')
        .toDate(),
      to: moment().toDate(),
    };
  }

  componentWillMount() {
    this.props.entryList();
  }

  onChangePage = page => {
    this.setState({ page });
  };

  onRemove = deleteId => () => {
    this.setState({ deleteId, showDeleteConfirm: true });
  };

  onChangeFilter = (filterName, value) => {
    this.setState({ [filterName]: value });
  };

  handleConfirm = () => {
    this.props.entryDelete(this.state.deleteId);
    this.setState({ showDeleteConfirm: false });
  };

  handleCancel = () => this.setState({ showDeleteConfirm: false });

  renderEntries = entries => {
    const { page, pageSize } = this.state;

    if (!entries.length) {
      return (
        <Table.Row>
          <Table.Cell colSpan="6">No Entries</Table.Cell>
        </Table.Row>
      );
    }
    return entries.slice((page - 1) * pageSize, page * pageSize).map(entry => (
      <Table.Row key={entry._id}>
        <Table.Cell>
          {entry.user.firstName}
          &nbsp;
          {entry.user.lastName}
        </Table.Cell>
        <Table.Cell>{moment(entry.date).format('MM/DD/YYYY')}</Table.Cell>
        <Table.Cell>{entry.distance}km</Table.Cell>
        <Table.Cell>{entry.duration}mins</Table.Cell>
        <Table.Cell>
          {entry.duration
            ? ((entry.distance / entry.duration) * 60).toFixed(2)
            : entry.duration}
          km/hr
        </Table.Cell>
        <Table.Cell>
          <Button
            color="teal"
            size="mini"
            as={Link}
            to={`/entries/${entry._id}`}
            content="View"
            icon="edit"
            labelPosition="left"
          />
          &nbsp;
          <Button
            color="orange"
            size="mini"
            content="Remove"
            icon="minus"
            labelPosition="left"
            onClick={this.onRemove(entry._id)}
          />
        </Table.Cell>
      </Table.Row>
    ));
  };

  render() {
    const { entries, loading } = this.props;
    const { page, pageSize, showDeleteConfirm, from, to } = this.state;

    const filteredEntries = entries.filter(
      entry =>
        moment(from)
          .startOf('day')
          .diff(moment(entry.date)) < 0 &&
        moment(to)
          .endOf('day')
          .diff(moment(entry.date)) >= 0,
    );
    return (
      <Container>
        <Confirm
          open={showDeleteConfirm}
          content="Are you sure to delete this entry?"
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
        />
        <Dimmer active={loading}>
          <Loader />
        </Dimmer>
        <Header as="h2" content="Entries" />
        <Segment>
          <Header as="h4" content="Filter" dividing />
          <DateRangeFilter from={from} to={to} onChange={this.onChangeFilter} />
        </Segment>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Distance</Table.HeaderCell>
              <Table.HeaderCell>Duration</Table.HeaderCell>
              <Table.HeaderCell>Avg Speed</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{this.renderEntries(filteredEntries)}</Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="6">
                <Pagination
                  total={filteredEntries.size}
                  currentPage={page}
                  onChange={this.onChangePage}
                  perPage={pageSize}
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  entries: makeSelectEntryList(),
  loading: makeSelectEntryListLoading(),
});

const mapDispatchToProps = {
  entryList: entryListRequest,
  entryDelete: entryDeleteRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(EntriesPage);
