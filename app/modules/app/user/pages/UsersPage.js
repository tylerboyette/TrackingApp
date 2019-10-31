import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

import { makeSelectCurrentUser } from 'containers/App/selectors';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { userListRequest } from '../redux/actions';
import { makeSelectUserList } from '../redux/selectors';
import reducer from '../../redux/reducer';
import saga from '../../redux/saga';
import Pagination from 'components/Pagination';
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
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.userListRequest();
  }
  onChangePage = page => {
    this.setState({ page });
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

    if (!users.length) {
      return <div>No Users</div>;
    }
    return users.map((user, index) => (
      <Table.Row key={user._id}>
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
    const { users } = this.props;
    return (
      <div style={{ marginTop: '50px' }}>
        <Header as="h2" content="Users" />
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Role</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{this.renderUsers()}</Table.Body>

          {/* <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="4">
                <Pagination
                  total={users.length}
                  currentPage={page}
                  onChange={this.onChangePage}
                  perPage={pageSize}
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer> */}
        </Table>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  users: makeSelectUserList(),
});

const mapDispatchToProps = {
  userListRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'app', reducer });
const withSaga = injectSaga({ key: 'app', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
)(UsersPage);
