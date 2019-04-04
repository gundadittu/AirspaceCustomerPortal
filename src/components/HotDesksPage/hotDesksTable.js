import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, Menu, Table, Tag } from 'antd';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
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
    render: (deskUID) => (
      <IconButton onClick={() => this.handleEditDesk(deskUID)}>
        <EditIcon />
      </IconButton>
    ),
  }];

  handleEditDesk = (deskUID) => {
    this.props.mixpanel.track("Clicked Edit Desk in hot desk table.");

    const desksList = this.props.dataSource;
     // Get selected desk object
     let selectedDesk = null;
     for (let key in desksList) {
       const value = desksList[key];
       const currentUID = value.uid;

       if (deskUID === currentUID) {
         selectedDesk = value;
         this.setState({
           selectedDesk: selectedDesk
         });
         break;
       }
     }

     if (selectedDesk == null) {
       console.log("return null");
       return
     }

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
    this.setState({
      selectedDesk: selectedDesk
    })
    this.setState({editDeskFormVisible: true });
  }

  handleCreateEditDesk = () => {
    this.props.mixpanel.track("Confirmed Edit Desk in hot desk table.");
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
    this.props.mixpanel.track("Cancelled Edit Desk in hot desk table.");
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
           selectedDesk={this.state.selectedDesk}
           onCancel={this.handleCancelEditDesk}
           onCreate={this.handleCreateEditDesk}
           confirmLoading={this.props.editDeskFormLoading}
        />
        <Table
               rowKey={record => record.uid.toString()}
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
    isLoadingHotDesksData: state.officeAdmin.isLoadingHotDesksData, 
    mixpanel: state.firebase.mixpanel
  }
};

const mapDispatchToProps = dispatch => {
  return {
    editHotDesk: (payload) => dispatch(actionCreator.editHotDesk(payload)),
    loadHotDesks: (officeUID) => dispatch(actionCreator.loadHotDesks(officeUID))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HotDesksTable);
