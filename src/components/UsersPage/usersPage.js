import React from 'react';
import { connect } from 'react-redux';
import { Menu, Icon, Row, Table, Input, Button, Tag} from 'antd';
import Highlighter from 'react-highlight-words';

import MaterialUIButton from '@material-ui/core/Button';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const data = [{
  key: '1',
  name: 'Aditya Gunda',
  type: 'Admin',
  offices: ['Polsky', 'North', 'Crear'],
  email: 'adityagunda@uchicago.edu'
  }, {
  key: '2',
  name: 'Dieg Ibarra',
  type: 'Regular',
  offices: ['Polsky', 'North', 'Booth'],
  email: 'dibarra@uchicago.edu',
  }, {
  key: '3',
  name: 'Soheil Ebadat',
  type: 'Admin',
  offices: ['Booth', 'Law School'],
  email: 'soheilEbadat@uchicago.edu',
}];

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  filters: [{
    text: 'Diego',
    value: 'Diego',
  }, {
    text: 'Aditya',
    value: 'Aditya',
  }, {
    text: 'Soheil',
    value: 'Soheil'
  }],
  // specify the condition of filtering result
  // here is that finding the name started with `value`
  onFilter: (value, record) => record.name.indexOf(value) === 0,
  sorter: (a, b) => a.name.length - b.name.length,
  sortDirections: ['descend'],
}, {
  title: 'Offices',
  dataIndex: 'offices',
  filters: [{
    text: 'Polsky',
    value: 'polsky',
  }, {
    text: 'Booth',
    value: 'booth',
  }],
  render: (offices => (
        <span>
          {offices.map(office => <Tag color="blue" key={office}>{office}</Tag>)}
        </span>
      ))
},
{
  title: 'Type',
  dataIndex: 'type',
  filters: [{
    text: 'Admin',
    value: 'Admin',
  }, {
    text: 'Regular',
    value: 'Regular',
  }],
  filterMultiple: false,
  onFilter: (value, record) => record.type.indexOf(value) === 0,
  sorter: (a, b) => a.type.length - b.type.length,
  sortDirections: ['descend', 'ascend'],
}, {
  title: 'Email',
  dataIndex: 'email',
  filters: [{
    text: 'London',
    value: 'London',
  }, {
    text: 'New York',
    value: 'New York',
  }],
  filterMultiple: false,
  onFilter: (value, record) => record.email.indexOf(value) === 0,
  sorter: (a, b) => a.email.length - b.email.length,
  sortDirections: ['descend', 'ascend'],
}, {
  title: '',
  key: 'action',
  render: (text) => (
    <span>
      <MaterialUIButton color="primary">Delete</MaterialUIButton>
    </span>
  ),
}];

function onChange(pagination, filters, sorter) {
  console.log('params', pagination, filters, sorter);
}

class UserPage extends React.Component {
  state = {
    searchText: '',
  };

  handleClick = (e) => {
    console.log('click ', e);
  }

  render() {
    return (
      <Table columns={columns} dataSource={data} onChange={onChange} />
    )
  }
}

const mapStateToProps = state => {
  return {
  }
};

export default connect(mapStateToProps, null)(UserPage);
