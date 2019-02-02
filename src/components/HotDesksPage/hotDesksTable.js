import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, Menu, Table } from 'antd';
// import Highlighter from 'react-highlight-words';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import * as actionCreator from '../../store/actions/officeAdmin';
import EditDeskForm from './editDeskForm';


class HotDesksTable extends React.Component {

  state = { 
    selectedDesk: null, 
    editDeskFormVisible: false 
  }

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
    render: (deskUID) => (
      <Dropdown overlay={() => this.editMenu(deskUID)} trigger={['click']}>
        <IconButton>
          <MoreIcon />
        </IconButton>
      </Dropdown>
    ),
  }];

  editMenu = (deskUID) => {
    return (
      <Menu
        onClick={(e) => this.handleEditMenuClick(e, deskUID)}
        style={{ textAlign: 'left', border: 0 }}
      >
        <Menu.Item key="edit">
          Edit Desk Info
        </Menu.Item>
      </Menu>
    );
  }

  handleEditMenuClick = (e, deskUID) => {
    const key = e.key;
    const desksList = this.props.dataSource;

     // Get selected desk object
     let selectedDesk = null;
     for (let key in desksList) {
       const value = desksList[key];
       const currentUID = value.uid;
 
       if (deskUID === currentUID) {
         this.setState({
           selectedDesk: value
         });
         selectedDesk = value;
         break;
       }
     }
 
     if (selectedDesk == null) {
       return
     }

    if (key === 'edit') {
      const editDeskForm = this.editDeskFormRef.props.form;
      editDeskForm.setFields({ 
        deskName: { 
          value: selectedDesk.name
        }, 
        reserveable: { 
          value: (selectedDesk.reserveable === true) ? ['reserveable'] : []
        }, 
        activeStatus: { 
          value: (selectedDesk.active === true) ? 'active' : 'inactive'
        }
      })

      this.setState({editDeskFormVisible: true });
    }
  }

  handleCreateEditDesk = () => { 
    const editDeskForm = this.editDeskFormRef.props.form;
    editDeskForm.validateFields((err, values) => {
      if (err) {
        return;
      }
      const deskName = values.deskName;

      let reserveable = false;
      if (values.reserveable.includes('reserveable') === true) {
        reserveable = true;
      }

      let activeStatus = false;
      if (values.activeStatus === 'active') {
        activeStatus = true;
      }

      let photoFileObj = null;
      const uploadPhotoDict = values.uploadPhoto || null;
      if (uploadPhotoDict) {
        const value = uploadPhotoDict[0];
        const fileObj = value.originFileObj;
        photoFileObj = fileObj;
      }

      const payload = {
        selectedDeskUID: this.state.selectedDesk.uid,
        deskName: deskName,
        reserveable: reserveable,
        activeStatus: activeStatus,
        photoFileObj: photoFileObj,
        hideForm: this.hideEditDeskForm, 
        selectedOfficeUID: this.props.currentOfficeUID
      }

      this.props.editHotDesk(payload);
    })
  }

  handleCancelEditDesk = () => { 
    this.hideEditDeskForm();
  }

  hideEditDeskForm = () => { 
    this.setState({editDeskFormVisible: false });
    this.editDeskFormRef.setState({ fileList: [] });
    const editDeskForm = this.editDeskFormRef.props.form;
    editDeskForm.setFields({ 
      deskName: { 
        value: null
      }, 
      reserveable: { 
        value: []
      }, 
      activeStatus: { 
        value: null 
      }
    })
  }

  saveEditDeskFormRef = (form) => { 
    this.editDeskFormRef = form;
  }

  render() {
    return (
      <div>
        <EditDeskForm
           wrappedComponentRef={(form) => this.saveEditDeskFormRef(form)}
           visible={this.state.editDeskFormVisible}
           onCancel={this.handleCancelEditDesk}
           onCreate={this.handleCreateEditDesk}
           confirmLoading={this.props.editDeskFormLoading}
        />
        <Table
               columns={this.columns} 
               dataSource={this.props.dataSource}
               pagination={false}
               loading={this.props.isLoadingHotDesksData}
         />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    editDeskFormLoading: state.officeAdmin.editDeskFormLoading, 
    desksList: state.officeAdmin.desksList,
    currentOfficeUID: state.general.currentOfficeAdminUID,
    isLoadingHotDesksData: state.officeAdmin.isLoadingHotDesksData
  }
};

const mapDispatchToProps = dispatch => {
  return {
    editHotDesk: (payload) => dispatch(actionCreator.editHotDesk(payload)),
    loadHotDesks: (officeUID) => dispatch(actionCreator.loadHotDesks(officeUID))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HotDesksTable);
