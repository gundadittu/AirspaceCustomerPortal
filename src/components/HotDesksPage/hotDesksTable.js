import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, Menu, Table, Tag, message, notification, Popconfirm} from 'antd';
// import Highlighter from 'react-highlight-words';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import * as actionCreator from '../../store/actions/officeAdmin';


class HotDesksTable extends React.Component {
  state = {
    searchText: ''
  };

  componentDidMount() {
    this.props.loadHotDesks(this.props.currentOfficeUID);
  }


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
    title: 'Reserveable',
    dataIndex: 'reserveable',
    key: 'reserveable',
    render: (bool) => (
      <div style={bool ? {color: 'green'} : {color: 'red'}}>
        {bool ? 'true' : 'false'}
      </div>
    )
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
      </Menu.Item>
      </Menu>
    );
  }

  handleEditMenuClick = (e, roomUID) => {
    console.log(e)
    const key = e.key;
    if (key == 'edit') {
    } else if (key == 'inactivate'){
        console.log("hello")
    }
  }

  render() {
    return (
      <div>
        <Table
               columns={this.columns} dataSource={this.props.desksList}
               pagination={false}
               loading={this.props.isLoadingHotDesksData}
         />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    desksList: state.officeAdmin.desksList,
    currentOfficeUID: state.general.currentOfficeAdminUID,
    isLoadingHotDesksData: state.officeAdmin.isLoadingHotDesksData
  }
};

const mapDispatchToProps = dispatch => {
  return {
    loadHotDesks: (officeUID) => dispatch(actionCreator.loadHotDesks(officeUID))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HotDesksTable);
