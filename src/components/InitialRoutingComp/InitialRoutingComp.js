import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import nonAdminEmptyState from "../../assets/images/nonAdminEmptyState.png";

class InitialRoutingComp extends Component {

  nonAdminComp = () => { 
      return ( 
        <div style={{textAlign: "center"}} >
           <img alt="This portal is only for Airspace office administrators." src={nonAdminEmptyState} />
        </div>
      )
  }

    render() {
        if (this.props.officeAdminList) {
            if (this.props.currentOfficeAdminUID) {
                return <Redirect to={'/officeAdmin/' + this.props.currentOfficeAdminUID}></Redirect>
            } else if (this.props.officeAdminList.length > 0) {
                const officeObj = this.props.officeAdminList[0]; 
                const officeUID = officeObj.uid; 
                return <Redirect to={'/officeAdmin/' + officeUID }></Redirect>
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
        currentOfficeAdminUID: state.general.currentOfficeAdminUID,
        officeAdminList: state.auth.adminOfficeList,
    }
};

export default withRouter(connect(mapStateToProps, null)(InitialRoutingComp));