import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import nonAdminEmptyState from "../../assets/images/nonAdminEmptyState.png";

class InitialRoutingComp extends Component {

    nonAdminComp = () => {
        return (
            <div style={{ textAlign: "center" }} >
                <img alt="This portal is only for Airspace office administrators and landlords." src={nonAdminEmptyState} />
            </div>
        )
    }

    render() {
        if (this.props.isSettingUpUser) {
            return null
        } else if (this.props.type === "landlord") {
            if ((this.props.landlordBuildingList !== null) && (this.props.landlordBuildingList.length > 0)) { 
                const building = this.props.landlordBuildingList[0]; 
                const buildingUID = building.uid; 
                this.props.history.push('/landlord/' + buildingUID);
                return null 
            } else { 
                return (
                    <div style={{ textAlign: "center" }} >
                        <img alt="Your landlord portal currently has access to no buildings." src={nonAdminEmptyState} />
                    </div>
                )
            }

        } else if (this.props.officeAdminList) {
            if (this.props.officeAdminList.length > 0) {
                const officeObj = this.props.officeAdminList[0];
                const officeUID = officeObj.uid;
                this.props.history.push('/officeAdmin/' + officeUID)
                // return <Redirect to={'/officeAdmin/' + officeUID}></Redirect>
                return null
            } else {
                return this.nonAdminComp()
            }
        } else {
            return this.nonAdminComp()
        }
    }

}

const mapStateToProps = state => {
    return {
        isSettingUpUser: state.auth.isSettingUpUser,
        currentOfficeAdminUID: state.general.currentOfficeAdminUID,
        officeAdminList: state.auth.adminOfficeList,
        type: state.auth.type,
        landlordBuildingList: state.auth.landlordBuildingList,
        currentBuildingUID: state.general.currentBuildingUID, 
        currentBuilding: state.general.currentBuildingUID
    }
};

export default withRouter(connect(mapStateToProps, null)(InitialRoutingComp));