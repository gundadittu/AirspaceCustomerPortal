import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as generalActionCreator from '../../store/actions/general';
import { Modal, Button } from 'antd';

class OfficeProfileModal extends React.Component {

    componentDidMount() { 
        this.props.loadOfficeProfile(this.props.currentOfficeAdminUID);
    }

    render() { 
        const visible = this.props.visible || false; 
        const hideForm = this.props.hideModal; 

        return ( 
            <Modal
            visible={visible}
            title={"Office Profile"}
            closable={false}
            onOk={this.hideForm}
            onCancel={this.hideForm}
            confirmLoading={this.props.isLoadingOfficeProfile}
            footer={[<Button onClick={hideForm} type="primary">OK</Button>]}
          >
            Content
          </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentOfficeAdminUID: state.general.currentOfficeAdminUID,
        isLoadingOfficeProfile: state.officeAdmin.isLoadingOfficeProfile, 

    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadOfficeProfile: (officeUID) => dispatch(generalActionCreator.loadOfficeProfile({ selectedOfficeUID: officeUID })),
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OfficeProfileModal));