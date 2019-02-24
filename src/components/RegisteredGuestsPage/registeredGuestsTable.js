import React from 'react';
import { connect } from 'react-redux';
import { Icon, Table, Menu, Dropdown, Tag} from 'antd';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import * as actionCreator from '../../store/actions/officeAdmin';
const moment = require('moment');

class RegisteredGuestsTable extends React.Component {

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
    title: 'Email',
    dataIndex: 'email'
  },
  {
    title: 'Status',
    dataIndex: 'arrived',
    key: 'arrived',
    render: (bool, guest) => (
      <div style={bool ? {color: 'green'} : {color: 'black'}}>
        {bool ? <span>
          Arrived <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
          </span>
        :  <span>Expected {moment(guest.expectedVisitDate).format('ddd MMM DD, YYYY')} at {moment(guest.expectedVisitDate).format('hh:mm a')}</span> }
      </div>
    ),
    filters: [
      { text: 'Arrived', value: true},
      { text: 'Not Arrived', value: false},
    ],
     onFilter: (value, record) => record.arrived.toString() == value,
  },
  {
    title: '',
    dataIndex: '',
    key: 'more',
    render: (regGuest) => (
      <Dropdown overlay={() => this.editArrival(regGuest)} trigger={['click']}>
        <IconButton>
          <MoreIcon />
        </IconButton>
      </Dropdown>
    )
  }
];

editArrival = (guest) => {
  return (
    <Menu
      onClick={(e) => this.handleEditArrival(e, guest)}
      style={{ textAlign: 'left', border: 0 }}
    >
      <Menu.Item key="ignore" disabled={true}>
        Mark Registered Guest as:
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="arrived">
        <Tag color={'green'} key='open'>Arrived</Tag>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="missing">
        <Tag color={'volcano'} key='pending'>Missing</Tag>
      </Menu.Item>
    </Menu>
  );
}

handleEditArrival = (e, guest) => {
  const roomsList = this.props.emailsToPass;
  var newStatus = true;
  if(e.key == "missing") {
    newStatus = false
  }
  var payload = {
    registeredGuestUID: guest.uid,
    newArrivalStatus: newStatus
  }
  this.props.editRegisteredGuestStatusForOfficeAdmin(payload)
}

  render() {
    return (
        <Table
               columns={this.columns}
               dataSource={this.props.dataSource}
               loading={this.props.isLoadingGuestsData}
               pagination={false}
         />
    );
  }
}

const mapStateToProps = state => {
  return {
  }
};

const mapDispatchToProps = dispatch => {
  return {
    editRegisteredGuestStatusForOfficeAdmin: (payload) => dispatch(actionCreator.editRegisteredGuestStatusForOfficeAdmin(payload))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisteredGuestsTable);
