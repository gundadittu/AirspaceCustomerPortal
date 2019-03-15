import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, Menu, Table, Tag, Icon} from 'antd';
// import Highlighter from 'react-highlight-words';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import RequestInfoModal from '../ServiceRequestsPage/requestInfoModal.js'
import * as actionCreator from '../../store/actions/officeAdmin';
const moment = require('moment');
const SubMenu = Menu.SubMenu;

class ServiceRequestsTable extends React.Component {
  state = {
    searchText: '',
    emails: {},
    editRoomFormVisible: false,
    showInfoModal: false,
    selectedRequest: null,
  };

capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

formatDate(date){
  var description = moment(date).format('ddd MMM DD, YYYY') + ': ';
  description += (moment(date).format('hh:mm a'));
  return description;
}

  columns = [{
    title: 'Request ID',
    dataIndex: 'uid',
    render: (requestID) => (
      <span>
        {requestID.slice(0, 6)}
      </span>
    )
  },
  {
    title: 'Date',
    dataIndex: 'timestamp',
    key: 'timestamp',
    render: (time) => (
      <span>
        {this.formatDate(time)}
      </span>
    )
  },
  {
    title: 'Type',
    dataIndex: 'issueType',
    key: 'issueType',
    render: (typeObj) => {
        return (
          <span key={typeObj.type}>
            <Tag color="blue">{typeObj.title ? typeObj.title.title : typeObj.type}</Tag>
          </span>
        )
    },
    filters: [
      { text: 'IT', value: 'infoTech'},
      { text: 'Plumbing', value: 'plumbing'},
      { text: 'Lighting', value: 'lighting'},
      { text: 'General Maintenance', value: 'generalMaintenance'},
      { text: 'Furniture', value: 'furniture'},
      { text: 'Door', value: 'door'},
      { text: 'Heating/Cooling', value: 'heatingCooling'},
      { text: 'Cleaning', value: 'cleaning'},
      { text: 'Supplies', value: 'supplies'},
      { text: 'Other', value: 'other'},
    ],
    onFilter: (value, request) => (value == request.issueType.title.rawValue)
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => (
      <span>
        {
          status=='open' ? <Tag color={'green'} key={status}>{this.capitalizeFirstLetter(status)}</Tag> :
          status=='pending' ? <Tag color={'volcano'} key={status}>In Progress</Tag> :
          <Tag color={'red'} key={status}>{this.capitalizeFirstLetter(status)}</Tag>
        }
      </span>
    ),
    filters: [
      { text: 'Open', value: 'open'},
      { text: 'In Progress', value: 'pending'},
      { text: 'Closed', value: 'closed'}
    ],
     onFilter: (value, record) => record.status == value,
  },
  {
    title: '',
    dataIndex: '',
    key: 'more',
    render: (request) => (
      <Dropdown overlay={() => this.editMenu(request)} trigger={['click']}>
        <IconButton>
          <MoreIcon />
        </IconButton>
      </Dropdown>
    )
  }
];

  editMenu = (request) => {
    return (
      <Menu
        onClick={(e) => this.handleEditMenuClick(e, request)}
        style={{ textAlign: 'left', border: 0 }}
      >
        <SubMenu key="edit" title={<span>Edit Status</span>}>
          <Menu.Item key="open">
            <Tag color={'green'} key='open'>Open</Tag>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="pending">
            <Tag color={'volcano'} key='pending'>In Progress</Tag>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="closed">
            <Tag color={'red'} key='closed'>Closed</Tag>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="showInfo">
          Show Info
        </Menu.Item>
      </Menu>
    );
  }

  handleEditMenuClick = (e, request) => {
    const key = e.key;
    if (key == 'showInfo'){

      this.setState({
        showInfoModal: true,
        selectedRequest: request
      })

    } else {
      const roomsList = this.props.emailsToPass;
      var payload = {
        selectedServiceRequestUID: request.uid,
        newStatus: e.key
      }

      this.props.editServiceRequestStatusForOfficeAdmin(payload)
    }
  }

  cancelInfoModal = () => {
    this.setState({
      showInfoModal: false
    })
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

  render() {
    return (
      <div>
        <RequestInfoModal selectedRequest={this.state.selectedRequest} showInfoModal={this.state.showInfoModal}
          cancelInfoModal={this.cancelInfoModal} emailsToPass={this.props.emailsToPass}
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
    isLoadingServiceRequestsData: state.officeAdmin.isLoadingServiceRequestsData
  }
};

const mapDispatchToProps = dispatch => {
  return {
    editConferenceRoom: (payload) => dispatch(actionCreator.editConferenceRoom(payload)),
    editServiceRequestStatusForOfficeAdmin: (payload) => dispatch(actionCreator.editServiceRequestStatusForOfficeAdmin(payload))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceRequestsTable);
