import React from 'react';
import { connect } from 'react-redux';
import { Table, Tag} from 'antd';
// import Highlighter from 'react-highlight-words';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreHoriz';

import * as actionCreator from '../../store/actions/officeAdmin';
// import { stat } from 'fs';

const tempDataSource = [{
  name: 'Kimbark',
  amenities: ['Projector', 'White Board', 'Speaker'],
  capacity: 50
}, {
  name: 'Kenwood',
  amenities: ['Projector', 'TV Monitor'],
  capacity: 75
}, {
  name: 'Woodlawn',
  amenities: ['Nothing'],
  capacity: 20
}];

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
  };

  componentDidMount() {
    this.props.loadConferenceRooms(this.props.currentOfficeUID);
  }

  render() {
    console.log(this.props.roomsList)
    return (
      // customize empty state locale={{ emptyText: 'No Users'}}
      //<Table rowKey={record => record.uid.toString()} columns={columns} dataSource={this.props.userList} pagination={false} loading={this.props.isLoadingUserData}/>
      <Table
             columns={columns} dataSource={this.props.roomsList}
             pagination={false}
             loading={this.props.isLoadingUserData}
       />
    );
  }
}

const mapStateToProps = state => {
  return {
    roomsList: state.officeAdmin.roomsList,
    currentOfficeUID: state.general.currentOfficeAdminUID,
    isLoadingRoomsData: state.officeAdmin.isLoadingRoomsData
  }
};

const mapDispatchToProps = dispatch => {
  return {
    loadConferenceRooms: (officeUID) => dispatch(actionCreator.loadConferenceRooms(officeUID))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ConferenceRoomsTable);
