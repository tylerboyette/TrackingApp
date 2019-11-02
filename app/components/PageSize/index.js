import React, { Component } from 'react';
import { Dropdown, Menu } from 'semantic-ui-react';

const options = [
  { key: 1, text: '5', value: 5 },
  { key: 2, text: '10', value: 10 },
  { key: 3, text: '15', value: 15 },
  { key: 4, text: '20', value: 20 },
];

class PageSize extends Component {
  constructor(props) {
    super(props);
  }
  onChangeSize = (event, { value }) => {
    this.props.onChangeSize(value);
  };
  render() {
    const { size } = this.props;
    return (
      <Menu floated="right" pagination>
        <Dropdown
          text={size.toString()}
          options={options}
          simple
          item
          onChange={this.onChangeSize}
        />
      </Menu>
    );
  }
}
export default PageSize;
