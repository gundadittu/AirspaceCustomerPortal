import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as generalActionCreator from '../../store/actions/general';
import { Modal, Button } from 'antd';

class OfficeProfileModal extends React.Component {

    componentDidMount() {
        if (this.props.currentOfficeAdminUID !== null) {
            this.props.loadOfficeProfile(this.props.currentOfficeAdminUID);
        }
    }
    // City: "San Jose"
    // Company Name: "Game of Thrones"
    // Experience Manager: ["recf7gEk9wiRPDSoa"]
    // Floor No.: "2"
    // Issue Log: ["recfF9Ws7BjZT7YpS"]
    // Issues Solved: 10
    // No. of Employees: "34"
    // Office UID: "qGTShTzLuOI3uDXXNM6J"
    // Record ID: "recW5bxTtq6gvgglL"
    // Square Feet: "3000"
    // State: "CA"
    // Street Address - 1: "1585 Deluca Dr."
    // Suite No.: "1"
    // Time Saved: 20
    // Zip Code: "95131"

    render() {
        const visible = this.props.visible || false;
        const hideForm = this.props.hideModal;
        const profile = this.props.officeProfile;

        if (profile === null) { 
            return null 
        }

        const companyName = profile["Company Name"] || "";
        const employeeNo = profile["No. of Employees"] || "";
        const sqFT = profile["Square Feet"] || "";

        const street = "Street Address: " + (profile["Street Address - 1"] || "");
        const street2 = "Street Address 2: " + (profile["Street Address - 2"] || "");
        const city = "City: " + profile["City"] || "";
        const state = "State: " + profile["State"] || "";
        const zip = "Zip Code: " + profile["Zip Code"] || "";
        const floorNo = "Floor No.: " + profile["Floor No."] || "";
        const suiteNo = "Suite No.: " + profile["Suite No."] || "";

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
            <p>Your office profile allows for Airspace to provide quotes and terms for various services in an expedient manner. If any of this information changes for  your office, please reach out to your experience manager.</p>
                <br />
                <h1>General</h1>
                <h3>Company Name:</h3>
                <p>{companyName}</p>
                <h3>Employee Count:</h3>
                <p>{employeeNo}</p>
                <h3>Square Feet:</h3>
                <p>{sqFT}</p>
                <br />
                <h1>Address</h1>
                <h3>Street Address 1:</h3>
                <p>{street}</p>
                <h3>Street Address 2:</h3>
                <p>{street2}</p>
                <h3>City:</h3>
                <p>{city}</p>
                <h3>State:</h3>
                <p>{state}</p>
                <h3>Zip Code:</h3>
                <p>{zip}</p>
                <br />
                <h3>Floor No:</h3>
                <p>{floorNo}</p>
                <h3>Suite No:</h3>
                <p>{suiteNo}</p>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentOfficeAdminUID: state.general.currentOfficeAdminUID,
        isLoadingOfficeProfile: state.officeAdmin.isLoadingOfficeProfile,
        officeProfile: state.officeAdmin.officeProfile
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadOfficeProfile: (officeUID) => dispatch(generalActionCreator.loadOfficeProfile({ selectedOfficeUID: officeUID })),
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OfficeProfileModal));