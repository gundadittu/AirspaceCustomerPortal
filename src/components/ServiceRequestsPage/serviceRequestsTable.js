import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, Menu, Table, Tag, Icon} from 'antd';
// import Highlighter from 'react-highlight-words';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import EditRoomForm from '../ConferenceRoomsPage/editRoomForm.js'
import * as actionCreator from '../../store/actions/officeAdmin';
const moment = require('moment');

class ServiceRequestsTable extends React.Component {
  state = {
    searchText: '',
    editRoomFormVisible: false,
    selectedRoom: null,
  };

  Issue
  type
  Status
  Notified

  data = [{
      key: '1',
      issue: 'Men\'s bathroom on the third floor is clogged',
      type: "Plumbing",
      status: 'pending',
      notified: "polsky_plumber@uchicago.edu",
    }, {
      key: '2',
      issue: 'There is a broken table in the co-working space on the second floor',
      type: "Furniture",
      status: 'closed',
      notified: "polsky_handyman@gmail.com",
  }, {
    key: '2',
    issue: 'Half the lightbulbs in the back of the room do not work',
    type: "Lighting",
    status: 'open',
    notified: "polsky_handyman@gmail.com",
}]

  columns = [{
    title: 'Issue',
    dataIndex: 'note',
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
    title: 'Type',
    dataIndex: 'issueType',
    key: 'issueType',
    render: (typeObj) => {
        return (
          <span>
            <Tag color="blue">{typeObj.title ? typeObj.title.title : typeObj.type}</Tag>
          </span>
        )
    }
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => (
      <span>
        {
          status=='open' ? <Tag color={'green'} key={status}>{status}</Tag> :
          status=='pending' ? <Tag color={'volcano'} key={status}>{status}</Tag> :
          <Tag color={'red'} key={status}>{status}</Tag>
        }
      </span>
    ),
    filters: [
      { text: 'Arrived', value: true},
      { text: 'Not Arrived', value: false},
    ],
     onFilter: (value, record) => record.arrived.toString() == value,
  },
  {
    title: 'Notified',
    dataIndex: 'notified',
    key: 'notified',
    render: (email) => (
      <span>{email}</span>
    )
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
    )
  }
];

  editMenu = (roomUID) => {
    return (
      <Menu
        onClick={(e) => this.handleEditMenuClick(e, roomUID)}
        style={{ textAlign: 'left', border: 0 }}
      >
      <Menu.Item key="edit">
        Edit Status
      </Menu.Item>
      <Menu.Divider />
        <Menu.Item key="open">
          <Tag color={'green'} key='open'>open</Tag>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="pending">
          <Tag color={'volcano'} key='pending'>pending</Tag>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="closed">
          <Tag color={'red'} key='closed'>closed</Tag>
        </Menu.Item>
      </Menu>
    );
  }

  handleEditMenuClick = (e, serviceUID) => {
    const key = e.key;
    const roomsList = this.props.dataSource;
    console.log("e ", e)
    console.log("Service UID ", serviceUID)
    var payload = {
      selectedServiceRequestUID: serviceUID,
      newStatus: e.key
    }

    this.props.editServiceRequestStatusForOfficeAdmin(payload)
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
          dataSource={this.props.serviceRequestsList}
          pagination={false}
          loading={this.props.isLoadingServiceRequestsData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    editRoomFormLoading: state.officeAdmin.editRoomFormLoading,
    serviceRequestsList: state.officeAdmin.serviceRequestsList,
    currentOfficeUID: state.general.currentOfficeAdminUID,
    isLoadingRoomsData: state.officeAdmin.isLoadingRoomsData
  }
};

const mapDispatchToProps = dispatch => {
  return {
    editConferenceRoom: (payload) => dispatch(actionCreator.editConferenceRoom(payload)),
    editServiceRequestStatusForOfficeAdmin: (payload) => dispatch(actionCreator.editServiceRequestStatusForOfficeAdmin(payload))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceRequestsTable);
