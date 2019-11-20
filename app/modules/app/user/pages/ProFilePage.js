/* eslint-disable func-names */
/* eslint-disable lines-between-class-members */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import imageExists from 'image-exists';
import { Header, Segment, Container, Form, Button } from 'semantic-ui-react';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import Avatar from 'react-avatar-edit';
import { profileSaveRequest } from '../redux/actions';

// import { FilePond, registerPlugin } from 'react-filepond';
// import 'filepond/dist/filepond.min.css';
// import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
// import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

// import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

// // Register the plugins
// registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.currentUser,
      files: [],
      preview: null,
    };
  }

  onClose = () => {
    this.setState({ preview: null });
  };

  onCrop = preview => {
    this.setState({ preview });
  };

  onUpdateField = field => evt => {
    const { user } = this.state;
    this.setState({
      user: { ...user, [field]: evt.target.value },
    });
  };

  onSubmit = () => {
    const { user, files, preview } = this.state;
    const { saveProfile } = this.props;
    const fd = new FormData();
    if (files.length) {
      fd.append('file', files[0]);
    }
    fd.append('data', JSON.stringify(user));
    if (preview) fd.append('preview', preview);
    saveProfile({
      body: fd,
      header_type: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  // setFiles = fileItems => {
  //   this.setState({
  //     files: fileItems.map(fileItem => fileItem.file),
  //   });
  // };

  onBeforeFileLoad = elem => {
    console.log(elem.target.files);
    this.setState({ files: elem.target.files });
  };

  render() {
    const { user, files } = this.state;
    return (
      <Container fluid className="main-app-container">
        <Header as="h2" content="Profile Settings" textAlign="center" />

        <Form onSubmit={this.onSubmit}>
          <Segment>
            <Header as="h4" content="Basic Info" dividing />
            <div
              style={{
                width: '100%',
                height: '200px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Avatar
                width={200}
                height={200}
                onCrop={this.onCrop}
                onClose={this.onClose}
                onBeforeFileLoad={this.onBeforeFileLoad}
                src={user.imageUrl}
              />
            </div>
            <Form.Input
              label="First Name"
              required
              value={user.firstName || ''}
              onChange={this.onUpdateField('firstName')}
            />
            <Form.Input
              label="Last Name"
              required
              value={user.lastName || ''}
              onChange={this.onUpdateField('lastName')}
            />
            <Form.Input
              label="Email"
              type="email"
              required
              value={user.email || ''}
              onChange={this.onUpdateField('email')}
            />
            <Form.Input
              label="Password"
              type="password"
              value={user.password || '****'}
              onChange={this.onUpdateField('password')}
            />
          </Segment>
          <Button color="blue">Save</Button>&nbsp;&nbsp;
          <Link to="/users">Cancel</Link>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});

const mapDispatchToProps = {
  saveProfile: profileSaveRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Profile);
