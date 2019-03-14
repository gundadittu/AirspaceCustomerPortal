import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

class InitialRoutingComp extends Component {

    render() {
        if (this.props.officeAdminList) {
            if (this.props.currentOfficeAdminUID) {
                return <Redirect to={'/officeAdmin/' + this.props.currentOfficeAdminUID}></Redirect>
            } else if (this.props.officeAdminList.length > 0) {
                return <Redirect to={'/officeAdmin/' + this.props.currentOfficeAdmin[0]}></Redirect>
            } else {
                return null
            }
        } else {
            return null
        }
    }

}

const mapStateToProps = state => {
    return {
        currentOfficeAdminUID: state.general.currentOfficeAdminUID,
        officeAdminList: state.auth.adminOfficeList,
    }
};

export default withRouter(connect(mapStateToProps, null)(InitialRoutingComp));