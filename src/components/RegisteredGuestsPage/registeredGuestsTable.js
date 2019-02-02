import React from 'react';
import { connect } from 'react-redux';
import { Icon, Table } from 'antd';
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
  }
];

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
    isLoadingGuestsData: state.officeAdmin.isLoadingGuestsData
  }
};

export default connect(mapStateToProps, null)(RegisteredGuestsTable);
