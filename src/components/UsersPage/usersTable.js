import React from 'react';
import { connect } from 'react-redux';
import { Table, Tag, Icon} from 'antd';
// import Highlighter from 'react-highlight-words';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreHoriz';

import * as actionCreator from '../../store/actions/officeAdmin';
// import { stat } from 'fs';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  // fix sorter to be alphabetical
  sorter: (a, b) => {
    const aName = a.name; 
    const bName = b.name;
    if (aName < bName) { 
      return -1;
    } else if (aName > bName) { 
      return 1;
    } else { 
      return 0
    }
  },
  sortDirections: ['descend', 'ascend'],
}, 
{
  title: 'Email',
  dataIndex: 'email'
},
{
  title: 'Offices',
  dataIndex: 'offices',
  render: (offices => (
        <span>
          {offices.map(office => <Tag color="blue" key={office.uid}>{office.name}</Tag>)}
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
  render: (type => {
    
    return ( 
      <span>
        <Tag color="blue" key={type}>{type}</Tag>   
      </span>
    );
  }),
  filterMultiple: true,
  onFilter: (value, record) => record.type.indexOf(value) === 0
},  
{
  title: '',
  key: 'more',
  render: () => (
    <IconButton>
      <MoreIcon/>
    </IconButton>
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
      // customize empty state locale={{ emptyText: 'No Users'}}
      <Table rowKey={record => record.uid.toString()} columns={columns} dataSource={this.props.userList} pagination={false} loading={this.props.isLoadingUserData}/>
    );
  }
}

const mapStateToProps = state => {
  return {
    userList: state.officeAdmin.userList, 
    currentOfficeUID: state.general.currentOfficeAdminUID, 
    isLoadingUserData: state.officeAdmin.isLoadingUserData
  }
};

const mapDispatchToProps = dispatch => {
  return {
    loadUserList: (officeUID) => dispatch(actionCreator.loadOfficeUsers(officeUID))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);