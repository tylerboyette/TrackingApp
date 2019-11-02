import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { userListRequest, userDeleteRequest } from '../redux/actions';
import {
  makeSelectUserList,
  makeSelectUserListLoading,
} from '../redux/selectors';
import reducer from '../../redux/reducer';
import saga from '../../redux/saga';
import Pagination from 'components/Pagination';
import PageSize from 'components/PageSize';
import {
  Table,
  Header,
  Container,
  Dimmer,
  Loader,
  Button,
  Confirm,
} from 'semantic-ui-react';

class UsersPage extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      deleteId: null,
      showDeleteConfirm: false,
      page: 1,
      pageSize: 10,
    };
  }

  componentWillMount() {
    this.props.userListRequest();
  }
  onChangePage = page => {
    this.setState({ page });
  };
  onChangePageSize = size => {
    this.setState({ pageSize: size, page: 1 });
  };

  onRemove = deleteId => () => {
    this.setState({ deleteId, showDeleteConfirm: true });
  };

  handleConfirm = () => {
    this.props.userDelete(this.state.deleteId);
    this.setState({ showDeleteConfirm: false });
  };
  renderUsers = () => {
    const { users } = this.props;
    const { page, pageSize } = this.state;

    if (!users.length) {
      return (
        <Table.Row>
          <Table.Cell colSpan="4">No Users</Table.Cell>
        </Table.Row>
      );
    }
    return users
      .slice((page - 1) * pageSize, page * pageSize)
      .map((user, index) => (
        <Table.Row key={user._id}>
          <Table.Cell>{(page - 1) * pageSize + index + 1}</Table.Cell>
          <Table.Cell>
            <Link to={`/users/${user._id}`}>
              {user.firstName}
              &nbsp;
              {user.lastName}
            </Link>
          </Table.Cell>
          <Table.Cell>{user.email}</Table.Cell>
          <Table.Cell>{user.role}</Table.Cell>
          <Table.Cell>
            <Button
              color="teal"
              size="mini"
              as={Link}
              to={`/users/${user._id}`}
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
              onClick={this.onRemove(user._id)}
            />
          </Table.Cell>
        </Table.Row>
      ));
  };

  render() {
    const { users, loading } = this.props;
    const { page, pageSize, showDeleteConfirm } = this.state;
    return (
      <Container style={{ marginTop: '40px' }}>
        <Confirm
          open={showDeleteConfirm}
          content="Are you sure to delete this user?"
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
        />
        <Dimmer active={loading}>
          <Loader />
        </Dimmer>
        <Header as="h2" content="Users" textAlign="center" />
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>No</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Role</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{this.renderUsers()}</Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="5">
                <Pagination
                  total={users.length}
                  currentPage={page}
                  onChange={this.onChangePage}
                  perPage={pageSize}
                />
                <PageSize
                  onChangeSize={this.onChangePageSize}
                  size={pageSize}
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
  currentUser: makeSelectCurrentUser(),
  users: makeSelectUserList(),
  loading: makeSelectUserListLoading(),
});

const mapDispatchToProps = {
  userListRequest,
  userDelete: userDeleteRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

// const withReducer = injectReducer({ key: 'app', reducer });
// const withSaga = injectSaga({ key: 'app', saga });

export default compose(
  withConnect,
  // withReducer,
  // withSaga,
)(UsersPage);
