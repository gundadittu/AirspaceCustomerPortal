import React from 'react';
import { connect } from 'react-redux';
import { Table, Tag, Dropdown, Menu } from 'antd';
// import Highlighter from 'react-highlight-words';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import EditUserForm from './editUserForm';

import * as actionCreator from '../../store/actions/officeAdmin';
// import { stat } from 'fs';

class UsersTable extends React.Component {

  columns = [
    {
    title: 'First Name',
    dataIndex: 'firstName',
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
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    sorter: (a, b) => {
      const aName = a.lastName;
      const bName = b.lastName;
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
        {/* closable onClose={log} */}
        {offices.map(office => <Tag color="blue" key={office.uid}>{office.name}</Tag>)}
      </span>
    ))
  },
  {
    title: 'Office Admin For',
    dataIndex: 'officeAdmins',
    render: (offices => (
      <span>
        {/* closable onClose={log} */}
        {offices.map(office => <Tag color="blue" key={office.uid}>{office.name}</Tag>)}
      </span>
    ))
  },
  {
    title: '',
    dataIndex: 'uid',
    key: 'more',
    render: (userUID) => (
      <Dropdown overlay={() => this.editMenu(userUID)} trigger={['click']}>
        <IconButton>
          <MoreIcon />
        </IconButton>
      </Dropdown>
    ),
  }
];

  state = {
    editUserFormVisible: false,
    selectedUser: null
  }

  handleEditMenuClick = (e, userUID) => {
    const key = e.key;
    const userList = this.props.userList;

    // Get selected user object
    for (let key in userList) { 
      const value = userList[key];
      const currentUID = value.uid;

      if (userUID == currentUID) {
        this.setState({
          selectedUser: value
        });
        break;
      }
    }

    if (key == 'edit') {
      this.setState({editUserFormVisible: true });
    } else if (key == 'remove') {
      return
    }
  }

  editMenu(userUID) {
    return (
      <Menu
        onClick={(e) => this.handleEditMenuClick(e, userUID)}
        mode="horizontal"
        style={{ textAlign: 'right', border: 0 }}
      >
        <Menu.Item key="edit">
          Edit
      </Menu.Item>
        <Menu.Item key="remove">
          Remove
      </Menu.Item>
      </Menu>
    );
  }

  handleCancelEditUser = () => {
    this.setState({ editUserFormVisible: false });
  }

  handleEditUser = () => {
    // this.setState({ editUserFormVisible: false });
    const editUserForm = this.editUserFormRef.props.form;
    editUserForm.validateFields((err, values) => {
      if (err) {
          return;
      }

      const firstName = values.firstName; 
      const lastName = values.lastName;
      const emailAddress = values.emailAddress; 
      const makeUserOfficeAdmin = (values.userType == 'regular') ? false : true;
      const officeUID = this.props.currentOfficeUID;
      const payload = { firstName: firstName, lastName: lastName, emailAddress: emailAddress, makeUserOfficeAdmin: makeUserOfficeAdmin, officeUID: officeUID, componentRef: this, formRef: editUserForm, }
      // this.props.createUserForOfficeAdmin(payload);
  });
  }

  saveEditUserFormRef(editUserFormRef) {
    this.editUserFormRef = editUserFormRef;
  }

  componentDidMount() {
    this.props.loadUserList(this.props.currentOfficeUID);
  }

  render() {
    return (
      <div>
        <EditUserForm
          wrappedComponentRef={(form) => this.saveEditUserFormRef(form)}
          visible={this.state.editUserFormVisible}
          onCancel={this.handleCancelEditUser}
          onCreate={this.handleEditUser}
          confirmLoading={this.props.editUserFormLoading}
          selectedUser={this.state.selectedUser}
          selectedOffice={this.props.currentOfficeUID}
        />
        {/* // customize empty state locale={{ emptyText: 'No Users'}} */}
        <Table rowKey={record => record.uid.toString()} columns={this.columns} dataSource={this.props.userList} pagination={false} loading={this.props.isLoadingUserData} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userList: state.officeAdmin.userList,
    currentOfficeUID: state.general.currentOfficeAdminUID,
    isLoadingUserData: state.officeAdmin.isLoadingUserData, 
    editUserFormLoading: state.officeAdmin.editUserFormLoading 
  }
};

const mapDispatchToProps = dispatch => {
  return {
    loadUserList: (officeUID) => dispatch(actionCreator.loadOfficeUsers(officeUID))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);
