import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, Menu, Table, Tag, message, notification, Popconfirm } from 'antd';
// import Highlighter from 'react-highlight-words';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import EditRoomForm from './editRoomForm.js'
import * as actionCreator from '../../store/actions/officeAdmin';

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
        {amenities.map(amenity => <Tag color="blue" key={amenity}>{amenity}</Tag>)}
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
    render: (roomUID) => (
      <Dropdown overlay={() => this.editMenu(roomUID)} trigger={['click']}>
        <IconButton>
          <MoreIcon />
        </IconButton>
      </Dropdown>
    ),
  }];

  confirmRoomDeactivation = (e, roomUID) => {
    // construct payload !!!!!!!!!!!!!!!
    // dispatch action 
    // show loading indicator & notification message on completion
  }

  editMenu = (roomUID) => {
    return (
      <Menu
        onClick={(e) => this.handleEditMenuClick(e, roomUID)}
        mode="horizontal"
        style={{ textAlign: 'left', border: 0 }}
      >
        <Menu.Item key="edit">
          Edit Room Info
        </Menu.Item>
        <Menu.Item key="deactivate">
          <Popconfirm title="Are you sure deactive this conference room?" onConfirm={(e) => this.confirmRoomDeactivation(e, roomUID)} okText="Yes" cancelText="No">
            Deactivate Room
          </Popconfirm>
        </Menu.Item>
      </Menu>
    );
  }

  handleEditMenuClick = (e, roomUID) => {
    const key = e.key;
    const roomsList = this.props.dataSource;

    // Get selected room object
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
    }

    if (key == 'edit') {
      const editRoomForm = this.editRoomFormRef.props.form;
      editRoomForm.setFields({
        roomName: {
          value: selectedRoom.name
        },
        capacity: { 
          value: selectedRoom.capacity 
        },
        standardAmenities: {
          value: null // populate !!!!!!!!!!!!!!!
        },
        reserveable: {
          value: (selectedRoom.reserveable) ? ['reserveable'] : null 
        },
        activeStatus: {
          value: (selectedRoom.active) ? 'active' : 'inactive' 
        },
        uploadPhoto: {
          value: null // populate !!!!!!!!!!!!!!!
        },
        keys: {
          value: null // populate !!!!!!!!!!!!!!!
        }
      });

      this.setState({ editRoomFormVisible: true });
    }
  }


  hideEditRoomForm = () => {
    const editRoomForm = this.editRoomFormRef.props.form;
    editRoomForm.setFields({
      roomName: {
        value: null
      },
      capacity: { 
        value: null
      },
      standardAmenities: {
        value: null
      },
      reserveable: {
        value: null
      },
      activeStatus: {
        value: null
      },
      uploadPhoto: {
        value: null
      },
      keys: {
        value: null
      }
    });
    this.setState({ editRoomFormVisible: false, selectedRoom: null });
  }

  handleCreateEditRoom = () => {
    const editRoomForm = this.editRoomFormRef.props.form;
    editRoomForm.validateFields((err, values) => {
      if (err) {
        return;
      }

      // construct payload !!!!!!!!!!!!!!!
      // pass reference to hideEditRoomForm
    });
  }

  handleCancelEditRoom = () => {
    this.hideEditRoomForm()
  }

  saveEditRoomFormRef = (form) => {
    this.editRoomFormRef = form
  }

  render() {
    return (
      <div>
        <EditRoomForm
          wrappedComponentRef={(form) => this.saveEditRoomFormRef(form)}
          visible={this.state.editRoomFormVisible}
          onCancel={this.handleCancelEditRoom}
          onCreate={this.handleCreateEditRoom}
        />
        <Table
          columns={this.columns}
          dataSource={this.props.dataSource}
          pagination={false}
          loading={this.props.isLoadingRoomsData}
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
