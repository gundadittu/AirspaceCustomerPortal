import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import nonAdminEmptyState from "../../assets/images/nonAdminEmptyState.png";

class InitialRoutingComp extends Component {

    renderNonAdminView = () => {
        return (
            <div style={{ textAlign: "center" }} >
                <img alt="This portal is only for Airspace office administrators." src={nonAdminEmptyState} />
            </div>
        )
    }

    render() {
        if (this.props.isSettingUpUser) {
            return null
        } else if (this.props.officeAdminList) {
            if (this.props.officeAdminList.length > 0) {
                const officeObj = this.props.officeAdminList[0];
                const officeUID = officeObj.uid;
                this.props.history.push('/officeAdmin/' + officeUID)
                return null
            } else {
                return this.renderNonAdminView()
            }
        } else {
            return this.renderNonAdminView()
        }
    }

}

const mapStateToProps = state => {
    return {
        isSettingUpUser: state.auth.isSettingUpUser,
        currentOfficeAdminUID: state.general.currentOfficeAdminUID,
        officeAdminList: state.auth.adminOfficeList,
        type: state.auth.type,
    }
};

export default withRouter(connect(mapStateToProps, null)(InitialRoutingComp));