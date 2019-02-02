import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, Icon, Menu, Table, Tag, message, notification, Popconfirm} from 'antd';
// import Highlighter from 'react-highlight-words';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import * as actionCreator from '../../store/actions/officeAdmin';


class RegisteredGuestsTable extends React.Component {
  state = {
  };

  columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  }];

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
      <div style={bool ? {color: 'green'} : {color: 'red'}}>
        {bool ? <span>
          Arrived <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
          </span>
        : <span>{guest.expectedVisitDate}</span>}
      </div>
    ),
    filters: [
      { text: 'Arrived', value: true},
      { text: 'Not Yet', value: false},
    ],
     onFilter: (value, record) => record.arrived.toString() == value,
  }
];

  render() {
    return (
      <div>
        <Table
               columns={this.columns}
               dataSource={this.props.dataSource}
               loading={this.props.isLoadingGuestsData}
               pagination={false}
         />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentOfficeUID: state.general.currentOfficeAdminUID,
    isLoadingGuestsData: state.officeAdmin.isLoadingGuestsData
  }
};

export default connect(mapStateToProps, null)(RegisteredGuestsTable);
