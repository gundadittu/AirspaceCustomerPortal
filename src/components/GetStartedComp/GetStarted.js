import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Steps, Row, Col, Alert, Spin } from 'antd';

import CreateAccount from './CreateAccount';
// import CompanyDetails from './CompanyDetails';
import OfficeDetails from './OfficeDetails';
import BuildingDetails from './BuildingDetails';
// import ServiceDetails from './ServiceDetails';
import NewServiceDetails from './NewServiceDetails';

// import TextField from '@material-ui/core/TextField';
// import Fab from '@material-ui/core/Fab';
import getStarted1Photo from "../../assets/images/get-started/get-started-1.png";
import getStarted2Photo from "../../assets/images/get-started/get-started-2.png"
import getStarted3Photo from "../../assets/images/get-started/get-started-3.png"
import getStarted4Photo from "../../assets/images/get-started/get-started-4.png"
// import getStarted5Photo from "../../assets/images/get-started/get-started-5.png"
// import clipboardPhoto from "../../assets/images/get-started/clipboard.png"

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// import ArrowForward from '@material-ui/icons/ArrowForward';

import * as generalActionCreators from '../../store/actions/general';

const theme = createMuiTheme({
    palette: {
        primary: { main: '#FC588F' },
        secondary: { main: '#000000' },
    },
    typography: { useNextVariants: true },
});

const stepTitles = ["Get Started", "Office Details", "Building Contact", "Services"];
// const stepPhotos = ["Create Account", "Company Info", "Office Details", "Building Details", "Service Plan"]

class GetStartedComp extends React.Component {

    getStartedPayload = () => { 
        let dict = {
            companyName: this.props.companyName, 
            firstName: this.props.companyURL, 
            lastName: this.props.lastName,  
            companyRole: this.props.userRole, 
            email: this.props.emailAddress, 
            phone: this.props.phoneNo, 
            newServices: this.props.newServices, 
            companyURL: this.props.companyURL, 
            streetAddr1: this.props.streetAddr1, 
            streetAddr2: this.props.streetAddr2, 
            city: this.props.city, 
            stateAddr: this.props.stateAddr, 
            zipCode: this.props.zipCode, 
            floorNo: this.props.floorNo, 
            suiteNo: this.props.suiteNo, 
            squareFT: this.props.squareFT, 
            employeeNo: this.props.employeeNo, 
            moveDate: this.props.moveInDate,
            buildingContName: this.props.buildingContactName, 
            buildingContRole: this.props.buildingContactRole, 
            buildingContEmail: this.props.buildingContactEmail, 
            buildingContPhone: this.props.buildingContactPhone
        }
        return dict
    }

    nextStep = () => {
        if (this.props.step === 3) { 
            const data = this.getStartedPayload(); 
            this.props.submitGSData(data); 
            return 
        }
        if (this.props.step < 0) {
            this.props.changeStep(0);
            return
        }
        if (this.props.step >= 3) {
            this.props.changeStep(3);
            return
        }
        this.props.changeStep(this.props.step + 1);
    }

    prevStep = () => {
        if (this.props.step <= 0) {
            this.props.changeStep(0);
            return
        }
        if (this.props.step > 3) {
            this.props.changeStep(3);
            return
        }
        this.props.changeStep(this.props.step - 1);
    }

    openDrift = () => {
        window.open("https://drift.me/airspaceoffice", "_blank");
    }

    updateData = (value, key) => {
        let obj = {};
        obj[key] = value;
        this.props.updateGetStartedData(obj);
    }

    render() {
        const Step = Steps.Step;

        let body = null;
        let bodyPhoto = null;
        let bodyTitle = null;
        let bodyMessage = null;
        if (this.props.step === 0) {
            body = (<CreateAccount updateData={(value, key) => this.updateData(value, key)} nextAction={this.nextStep} />);
            bodyPhoto = getStarted1Photo;
            bodyTitle = stepTitles[0];
            bodyMessage = "Let’s start with some contact & company information."; //and selecting a password
        } else if (this.props.step === 1) {
            body = (<OfficeDetails updateData={this.updateData} nextAction={this.nextStep} />);
            bodyPhoto = getStarted2Photo;
            bodyTitle = stepTitles[1];
            bodyMessage = "Now, we just need a couple details about your office. This will help us give you more accurate prices."
        } else if (this.props.step === 2) {
            body = (<BuildingDetails updateData={this.updateData} nextAction={this.nextStep} />);
            bodyPhoto = getStarted3Photo;
            bodyTitle = stepTitles[2];
            bodyMessage = "Now, we just need your building contact, like your landlord or property manager. We'll work with them to streamline deliveries and other fun stuff."
        } else if (this.props.step === 3) {
            body = (<NewServiceDetails updateData={this.updateData} nextAction={this.nextStep} />);
            bodyPhoto = getStarted4Photo;
            bodyTitle = stepTitles[3];
            bodyMessage = "Let us know which service your office is looking for. This information will help your experience manager create your service plan before your first consultation."
        }

        return (
            <div>
                <div>
                    <Alert
                        message="Heads up! Getting started with Airspace will take about 5 minutes."
                        description="You'll need your contact info, company website, office square footage and employee count, building address, property manager's contact info, and an idea of what services your looking for. You can always update your information."
                        type="info"
                        closeText="Got it"
                    />
                </div>
                <Spin spinning={this.props.isLoading}/>
                <MuiThemeProvider theme={theme}>
                    <div>
                        <Row>
                            <Col span={24}>
                                <Steps style={{ paddingTop: 50, paddingLeft: 100, paddingRight: 100 }} current={this.props.step}>
                                    <Step title={stepTitles[0]} />
                                    <Step title={stepTitles[1]} />
                                    <Step title={stepTitles[2]} />
                                    <Step title={stepTitles[3]} />
                                    {/* <Step title={stepTitles[4]} /> */}
                                </Steps>
                            </Col>
                        </Row>
                        <Row style={{ paddingTop: 50 }}>
                            <Col span={7} />
                            <Col span={5}>
                                <img style={{ width: "30%", textAlign: "start" }} alt="Get Started" src={bodyPhoto} />
                                <h1>{bodyTitle}</h1>
                                <h3>Need Help? <a onClick={this.openDrift}>Live chat with us.</a></h3>
                                <p style={{ fontSize: 20 }}>{bodyMessage}</p>
                            </Col>
                            <Col span={1} />
                            <Col span={5}>
                                {body}
                                {this.props.step !== 0 ?
                                    (
                                        <div style={{ paddingTop: 10, textAlign: "center" }}>
                                            <a style={{ color: "#FC588F" }} onClick={this.prevStep}>Go Back</a>
                                        </div>
                                    ) : null}
                            </Col>
                            <Col span={6} />
                        </Row>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.getStarted.isLoading, 
        step: state.getStarted.step, 
        firstName: state.getStarted.firstName, 
        lastName: state.getStarted.lastName, 
        emailAddress: state.getStarted.emailAddress, 
        password: state.getStarted.password, 
        phoneNo: state.getStarted.phoneNo, 
        companyName: state.getStarted.companyName, 
        companyURL: state.getStarted.companyURL, 
        userRole: state.getStarted.userRole, 
        streetAddr1: state.getStarted.streetAddr1, 
        streetAddr2: state.getStarted.streetAddr2, 
        zipCode: state.getStarted.zipCode, 
        city: state.getStarted.city, 
        stateAddr: state.getStarted.stateAddr, 
        floorNo: state.getStarted.floorNo,
        suiteNo: state.getStarted.suiteNo, 
        squareFT: state.getStarted.squareFT, 
        employeeNo: state.getStarted.employeeNo, 
        moveInDate: state.getStarted.moveInDate, 
        buildingContactName: state.getStarted.buildingContactName, 
        buildingContactRole: state.getStarted.buildingContactRole, 
        buildingContactEmail: state.getStarted.buildingContactEmail,
        buildingContactPhone: state.getStarted.buildingContactPhone, 
        newServices: state.getStarted.newServices
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateGetStartedData: (data) => dispatch(generalActionCreators.updateGetStartedData(data)),
        changeStep: (newStep) => dispatch(generalActionCreators.changeGetStartedStep(newStep)), 
        submitGSData: (payload) => dispatch(generalActionCreators.submitGetStartedData(payload))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GetStartedComp));