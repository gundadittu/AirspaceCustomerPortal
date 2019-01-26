import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, Menu, Table, Tag, message, notification, Popconfirm} from 'antd';
// import Highlighter from 'react-highlight-words';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import EditRoomForm from './editRoomForm.js'
import * as actionCreator from '../../store/actions/officeAdmin';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
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
  title: 'Amenities',
  dataIndex: 'amenities',
  render: (amenities => (
        <span>
          {amenities.map(amenity => <Tag  color="blue" key={amenity}>{amenity}</Tag>)}
        </span>
      ))
},
{
  title: 'Capacity',
  dataIndex: 'capacity'
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

class ConferenceRoomsTable extends React.Component {
  state = {
    searchText: '',
    editRoomFormVisible: false,
    selectedRoom: null,
  };
  
  columns = [{
    title: 'Name',
    dataIndex: 'name',
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
    title: 'Amenities',
    dataIndex: 'amenities',
    render: (amenities => (
          <span>
            {amenities.map(amenity => <Tag  color="blue" key={amenity}>{amenity}</Tag>)}
          </span>
        ))
  },
  {
    title: 'Capacity',
    dataIndex: 'capacity'
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
  }];

  confirm(e) {
  console.log(e);
  notification.open({
    message: 'Deactivated Room',
    description: 'You can now find this room under the \'Inactive\' tab!',
    onClick: () => {
      console.log('Notification Clicked!');
    }
  })
}

cancel(e) {
  console.log(e);
  message.error('Click on No');
}

  editMenu(userUID) {
    return (
      <Menu
        onClick={(e) => this.handleEditMenuClick(e, userUID)}
        mode="horizontal"
        style={{ textAlign: 'left', border: 0 }}
      >
        <Menu.Item key="edit">
          Edit Room Info
        </Menu.Item>
        <Menu.Item key="inactivate">
          <Popconfirm title="Are you sure delete this task?" onConfirm={(e) => this.confirm(e)} onCancel={(e) => this.cancel(e)} okText="Yes" cancelText="No">
            Deactivate Room
          </Popconfirm>
      </Menu.Item>
      </Menu>
    );
  }

  hideEditRoomForm = () => {
    this.setState({ editRoomFormVisible: false, selectedRoom: null });
  }

  handleEditRoom = () => {
    /*const editRoomForm = this.editUserFormRef.props.form;
    editRoomForm.validateFields((err, values) => {
      if (err) {
          return;
      }

      const name = values.name;
      const officeUID = this.props.currentOfficeUID;
      const payload = { hideForm: this.hideEditUserForm, makeUserOfficeAdmin: makeUserOfficeAdmin, userUID: userUID, firstName: firstName, lastName: lastName, email: email, makeUserOfficeAdmin: makeUserOfficeAdmin, officeUID: officeUID, componentRef: this, formRef: editUserForm, }
      this.props.editUserForOfficeAdmin(payload);
  }); */
  }

  handleEditMenuClick = (e, roomUID) => {
    console.log(e)
    const key = e.key;
    /*const userList = this.props.userList;

    // Get selected user object
    let selectedRoom = null;
    for (let key in roomsList) {
      const value = roomsList[key];
      const currentUID = value.uid;

      if (roomUID == currentUID) {
        this.setState({
          selectedRoom: value
        });
        selectedRoom = value;
        break;
      }
    }

    if (selectedRoom == null) {
      return
    } */

    if (key == 'edit') {

      /*const officeObj = this.props.currentOfficeUID;
      const userAdminOffices = selectedUser.officeAdmins;
      let initialUserTypeValue = 'regular'

      for (let key in userAdminOffices) {
          const value = userAdminOffices[key];
          const officeUID = value.uid;

          if (officeUID == officeObj) {
              initialUserTypeValue = 'officeAdmin'
              break
          }
      }

      this.editRoomFormRef.props.form.setField({
          name: {
            value: selectedRoom.name,
            error: null
          },

      }) */

      this.setState({editRoomFormVisible: true});
    } else if (key == 'inactivate'){
        console.log("hello")
    }
  }

  render() {
    return (
      <div>
        <EditRoomForm
          visible={this.state.editRoomFormVisible}
          onCancel={() => this.hideEditRoomForm()}
        />
        <Table
               columns={this.columns} 
               dataSource={this.props.dataSource}
               pagination={false}
               loading={this.props.isLoadingUserData}
         />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentOfficeUID: state.general.currentOfficeAdminUID,
    isLoadingRoomsData: state.officeAdmin.isLoadingRoomsData
  }
};

// const mapDispatchToProps = dispatch => {
//   return {
//     loadConferenceRooms: (officeUID) => dispatch(actionCreator.loadConferenceRooms(officeUID))
//   }
// };

export default connect(mapStateToProps, null)(ConferenceRoomsTable);
