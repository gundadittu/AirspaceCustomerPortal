import React from 'react';
import { connect } from 'react-redux';
import { Table, Tag, Dropdown, Menu, message } from 'antd';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import EditUserForm from './editUserForm';
import RemoveUserForm from './removeUserForm';
import * as actionCreator from '../../store/actions/officeAdmin';
import { throws } from 'assert';

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
    // {
    //   title: 'Offices',
    //   dataIndex: 'offices',
    //   render: (offices => (
    //     <span>
    //       {offices.map(office => <Tag color="blue" key={office.uid}>{office.name}</Tag>)}
    //     </span>
    //   ))
    // },
    // {
    //   title: 'Office Admin For',
    //   dataIndex: 'officeAdmins',
    //   render: (offices => (

    //     < span >
    //       {offices.map(office => <Tag color="blue" key={office.uid}>{office.name}</Tag>)}
    //     </span>
    //   ))
    // },
    {
      title: 'Office Admin',
      dataIndex: 'officeAdmins',
      render: (officeAdmin => {
        if (officeAdmin === null) {
          console.log("officeAdmin is null");
          return null
        }
        console.log(officeAdmin);
        const current = this.props.currentOfficeUID;
        const list = officeAdmin;
        for (let key in list) {
          const value = list[key];

          if (value.uid === current) {
            return (
              <Tag color="blue" key={value.uid}>Yes</Tag>
            )
          }
        }
        return null
      })
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
    removeUserFormVisible: false,
    editUserFormVisible: false,
    selectedUser: null,
  }

  handleEditMenuClick = (e, userUID) => {
    const key = e.key;
    const userList = this.props.userList;

    // Get selected user object
    let selectedUser = null;
    for (let key in userList) {
      const value = userList[key];
      const currentUID = value.uid;

      if (userUID === currentUID) {
        this.setState({
          selectedUser: value
        });
        selectedUser = value;
        break;
      }
    }

    if (selectedUser == null) {
      return
    }

    if (key === 'edit') {

      const officeObj = this.props.currentOfficeUID;
      const userAdminOffices = selectedUser.officeAdmins;
      let initialUserTypeValue = 'regular'

      for (let key in userAdminOffices) {
        const value = userAdminOffices[key];
        const officeUID = value.uid;

        if (officeUID === officeObj) {
          initialUserTypeValue = 'officeAdmin'
          break
        }
      }

      this.editUserFormRef.props.form.setFields({
        firstName: {
          value: selectedUser.firstName,
          error: null
        },
        lastName: {
          value: selectedUser.lastName,
          error: null
        },
        emailAddress: {
          value: selectedUser.email,
          error: null
        },
        emailAddress2: {
          value: selectedUser.email,
          error: null
        },
        userType: {
          value: initialUserTypeValue,
          error: null
        }
      });

      this.props.mixpanel.track("Clicked edit user in office", { "userUID": userUID });
      this.setState({ editUserFormVisible: true, removeUserFormVisible: false });
    } else if (key === 'remove') {
      this.props.mixpanel.track("Clicked remove user in office", { "userUID": userUID });
      this.setState({ removeUserFormVisible: true, editUserFormVisible: false });
    }
  }

  editMenu(userUID) {
    return (
      <Menu
        onClick={(e) => this.handleEditMenuClick(e, userUID)}
        style={{ textAlign: 'left', border: 0 }}
      >
        <Menu.Item key="edit">
          Edit User Info
      </Menu.Item>
        <Menu.Item key="remove">
          Remove from Office
      </Menu.Item>
      </Menu>
    );
  }

  handleCancelEditUser = () => {
    this.props.mixpanel.track("Cancelled edit user in office");
    this.hideEditUserForm();
  }

  handleEditUser = (userUID) => {
    const editUserForm = this.editUserFormRef.props.form;
    editUserForm.validateFields((err, values) => {
      if (err) {
        message.error('We were unable to save your changes.');
        return;
      }
      message.success('Saving your changes...');
      const firstName = values.firstName;
      const lastName = values.lastName;
      const email = values.emailAddress;
      const makeUserOfficeAdmin = (values.userType === 'regular') ? false : true;
      const officeUID = this.props.currentOfficeUID;
      const payload = { hideForm: this.hideEditUserForm, userUID: userUID, firstName: firstName, lastName: lastName, email: email, makeUserOfficeAdmin: makeUserOfficeAdmin, officeUID: officeUID, componentRef: this, formRef: editUserForm, }

      this.props.mixpanel.track("Confirmed edit user in office", { "oldUserInfo": this.state.selectedUser, "newUserInfo": payload });
      this.props.editUserForOfficeAdmin(payload);
    });

    this.setState({ editUserFormVisible: false, selectedUser: null });
  }

  hideEditUserForm = () => {
    this.setState({ editUserFormVisible: false, selectedUser: null });
  }

  saveEditUserFormRef(editUserFormRef) {
    this.editUserFormRef = editUserFormRef;
  }

  handleCancelRemoveUser = () => {
    this.props.mixpanel.track("Cancelled remove user in office");
    this.setState({ removeUserFormVisible: false, selectedUser: null });
  }

  handleRemoveUser = (selectedUser, selectedOffice) => {
    const userUID = selectedUser.uid;
    const officeUID = selectedOffice;
    message.success('Removing user from this office...');
    this.setState({ removeUserFormVisible: false, selectedUser: null });
    this.props.mixpanel.track("Confirmed remove user in office");
    this.props.removeUserFromOffice(userUID, officeUID, this)
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
          onCreate={() => this.handleEditUser(this.state.selectedUser.uid)}
          confirmLoading={this.props.editUserFormLoading}
        />
        <RemoveUserForm
          visible={this.state.removeUserFormVisible}
          onCancel={this.handleCancelRemoveUser}
          onCreate={() => this.handleRemoveUser(this.state.selectedUser, this.props.currentOfficeUID)}
          selectedUser={this.state.selectedUser}
          confirmLoading={this.props.removeUserFormLoading}
        />
        <Table rowKey={record => record.uid.toString()} columns={this.columns} dataSource={this.props.userList} pagination={false} loading={this.props.isLoadingUserData} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userList: state.officeAdmin.userList,
    currentOfficeUID: state.general.currentOfficeAdminUID,
    userAdminOfficeList: state.auth.adminOfficeList,
    isLoadingUserData: state.officeAdmin.isLoadingUserData,
    editUserFormLoading: state.officeAdmin.editUserFormLoading,
    removeUserFormLoading: state.officeAdmin.removeUserFormLoading,
    mixpanel: state.firebase.mixpanel
  }
};

const mapDispatchToProps = dispatch => {
  return {
    loadUserList: (officeUID) => dispatch(actionCreator.loadOfficeUsers(officeUID)),
    removeUserFromOffice: (userUID, officeUID, componentRef) => dispatch(actionCreator.removeUserForOfficeAdmin({ userUID: userUID, officeUID: officeUID, componentRef: componentRef })),
    editUserForOfficeAdmin: (payload) => dispatch(actionCreator.editUserForOfficeAdmin(payload)),
    finishedEditUserForOfficeAdmin: (payload) => dispatch({ type: 'EDIT_OFFICE_USER_FINISHED', payload: { ...payload } })
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);
