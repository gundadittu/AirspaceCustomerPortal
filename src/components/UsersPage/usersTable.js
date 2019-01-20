import React from 'react';
import { connect } from 'react-redux';
import { Table, Tag} from 'antd';
import '../../App.css';
// import Highlighter from 'react-highlight-words';
import MaterialUIButton from '@material-ui/core/Button';
import * as actionCreator from '../../store/actions/officeAdmin';
// import { stat } from 'fs';

const columns = [{
  title: 'Name',
  dataIndex: 'firstName',
  // fix sorter to be alphabetical
  sorter: (a, b) => {
    const aName = a.firstName; 
    const bName = b.firstName;
    if (aName < bName) { 
      return -1;
    } else if (aName > bName) { 
      return 1;
    } else { 
      return 0
    }
  },
  sortDirections: ['descend', 'ascend'],
}, {
  title: 'Offices',
  dataIndex: 'offices',
  render: (offices => (
        <span>
          {offices.map(office => <Tag color="blue" key={office}>{office}</Tag>)}
        </span>
      ))
},
{
  // render appropriate admin or regular tag
  title: 'Type',  
  dataIndex: 'type',
  filters: [{
    text: 'Admin',
    value: 'admin',
  }, {
    text: 'Regular',
    value: 'regular',
  }],
  filterMultiple: false,
  onFilter: (value, record) => record.type.indexOf(value) === 0,
  sorter: (a, b) => a.type.length - b.type.length,
  sortDirections: ['descend', 'ascend'],
}, {
  title: 'Email',
  dataIndex: 'email',
  // Fix sorter to be alphabetical 
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

class UsersTable extends React.Component {
  state = {
    searchText: '',
  };

   componentDidMount() { 
    this.props.loadUserList(this.props.currentOfficeUID);
   }

  render() {
    return (
      <div className="wide-table">
        <h1>Users</h1>
        <Table rowKey={record => record.uid} columns={columns} dataSource={this.props.userList} pagination={false} loading={this.props.isLoadingUserData}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userList: state.officeAdmin.userList, 
    currentOfficeUID: state.officeAdmin.currentOfficeAdminUID, 
    isLoadingUserData: state.officeAdmin.isLoadingUserData
  }
};

const mapDispatchToProps = dispatch => {
  return {
    loadUserList: (officeUID) => dispatch(actionCreator.loadOfficeUsers(officeUID))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);
