import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, Menu, Table, Tag } from 'antd';
// import Highlighter from 'react-highlight-words';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import EditRoomForm from './editRoomForm.js'
import * as actionCreator from '../../store/actions/officeAdmin';

class ConferenceRoomsTable extends React.Component {
  state = {
    searchText: '',
    editRoomFormVisible: false,
    selectedRoom: null
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
    render: (amenities) => {
      return (
        <span>
          {amenities.map(amenity => <Tag color="blue" key={amenity.type}>{amenity.title}</Tag>)}
        </span>
      )
    }
  },
  {
    title: 'Capacity',
    dataIndex: 'capacity'
  },
  {
    title: 'Reserveable',
    dataIndex: 'reserveable',
    key: 'reserveable',
    render: (bool) => {
      if (bool === true) {
        return (
          <span>
            <Tag color="blue">Reserveable</Tag>
          </span>
        )
      } else {
        return null
      }
    }
  },
  {
    title: '',
    dataIndex: 'uid',
    key: 'more',
    render: (roomUID) => (
      <IconButton onClick={() => this.handleEditMenuClick(roomUID)}>
        <EditIcon />
      </IconButton>
    ),
  }];

  /*
  got rid of edit room menu

  editMenu = (roomUID) => {
    return (
      <Menu
        onClick={(e) => this.handleEditMenuClick(e, roomUID)}
        style={{ textAlign: 'left', border: 0 }}
      >
        <Menu.Item key="edit">
          Edit Room Info
        </Menu.Item>
      </Menu>
    );
  }
  */

  handleEditMenuClick = (roomUID) => {
    const roomsList = this.props.dataSource;

    // Get selected room object
    let selectedRoom = null;
    for (let key in roomsList) {
      const value = roomsList[key];
      const currentUID = value.uid;

      if (roomUID === currentUID) {
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

    if (roomUID) {
      const editRoomForm = this.editRoomFormRef.props.form;
      const imgUrl = selectedRoom.imageURL
      //this.editRoomFormRef.setState({ fileList: [imgUrl] });

      editRoomForm.setFields({
        roomName: {
          value: selectedRoom.name
        },
        capacity: {
          value: selectedRoom.capacity
        },
        standardAmenities: {
          value: selectedRoom.amenities
        },
        reserveable: {
          value: (selectedRoom.reserveable) ? ['reserveable'] : null
        },
        activeStatus: {
          value: (selectedRoom.active) ? 'active' : 'inactive'
        },
        uploadPhoto: {
          fileList: [imgUrl] // populate?
        },
        keys: {
          value: null // populate?
        }
      });

      this.setState({ editRoomFormVisible: true });
    }
  }


  hideEditRoomForm = () => {
    const editRoomForm = this.editRoomFormRef.props.form;
    this.editRoomFormRef.setState({ fileList: [] });
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

      const roomName = values.roomName;
      const standardAmenities = values.standardAmenities;
      let reserveable = false;
      if (values.reserveable.includes('reserveable') === true) {
        reserveable = true;
      }
      let activeStatus = false;
      if (values.activeStatus === 'active') {
        activeStatus = true;
      }
      // const customAmenities = values.customAmenities;
      const capacity = values.capacity;
      let photoFileObj = null;
      const uploadPhotoDict = values.uploadPhoto || null;
      if (uploadPhotoDict) {
        const value = uploadPhotoDict[0];
        const fileObj = value.originFileObj;
        photoFileObj = fileObj;
      }

      const payload = {
        selectedRoomUID: this.state.selectedRoom.uid,
        roomName: roomName,
        capacity: capacity,
        standardAmenities: standardAmenities,
        // customAmenities: customAmenities,
        reserveable: reserveable,
        activeStatus: activeStatus,
        photoFileObj: photoFileObj,
        hideForm: this.hideEditRoomForm,
        selectedOfficeUID: this.props.currentOfficeUID
      }
      this.props.editConferenceRoom(payload);
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
          confirmLoading={this.props.editRoomFormLoading}
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
    editRoomFormLoading: state.officeAdmin.editRoomFormLoading,
    currentOfficeUID: state.general.currentOfficeAdminUID,
    isLoadingRoomsData: state.officeAdmin.isLoadingRoomsData
  }
};

const mapDispatchToProps = dispatch => {
  return {
    editConferenceRoom: (payload) => dispatch(actionCreator.editConferenceRoom(payload))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ConferenceRoomsTable);
