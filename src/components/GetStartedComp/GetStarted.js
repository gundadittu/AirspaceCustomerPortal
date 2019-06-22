import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Steps, Row, Col } from 'antd';
import CreateAccount from './CreateAccount';
import OfficeDetails from './OfficeDetails';
// import BuildingDetails from './BuildingDetails';
import NewServiceDetails from './NewServiceDetails';
import getStarted1Photo from "../../assets/images/get-started/get-started-1.png";
import getStarted2Photo from "../../assets/images/get-started/get-started-2.png"
// import getStarted3Photo from "../../assets/images/get-started/get-started-3.png"
import getStarted4Photo from "../../assets/images/get-started/get-started-4.png"
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import * as generalActionCreators from '../../store/actions/general';
import MediaQuery from 'react-responsive';

import mixpanel from 'mixpanel-browser';
mixpanel.init('4b6f21dc6886a40bf4900783da31064a');

const theme = createMuiTheme({
    palette: {
        primary: { main: '#FC588F' },
        secondary: { main: '#000000' },
    },
    typography: {
        useNextVariants: true,
        fontFamily: [
            'Avenir Next'
        ]
    },
});

const stepTitles = ["Get Started", "Office Details", "Services"];
const stepCount = stepTitles.length - 1;

class GetStartedComp extends React.Component {

    getStartedPayload = () => {
        let dict = {
            // password: this.props.password, 
            companyName: this.props.companyName,
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            companyRole: this.props.userRole,
            email: this.props.emailAddress,
            phone: this.props.phoneNo,
            newServices: this.props.newServices,
            otherServicesDetails: this.props.otherServicesDetails,
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
        if (this.props.step === stepCount) {
            const data = this.getStartedPayload();
            this.props.submitGSData(data);
            mixpanel.track("Get-Started"); // ends timer 
            mixpanel.track("Finished Get Started.");
            return
        }
        if (this.props.step < 0) {
            this.props.changeStep(0);
            return
        }
        if (this.props.step >= stepCount) {
            this.props.changeStep(stepCount);
            return
        }
        this.props.changeStep(this.props.step + 1);
    }

    prevStep = () => {
        mixpanel.track("Get-Started: Clicked Go Back"); // ends timer 
        if (this.props.step <= 0) {
            this.props.changeStep(0);
            return
        }
        if (this.props.step > stepCount) {
            this.props.changeStep(stepCount);
            return
        }
        this.props.changeStep(this.props.step - 1);
    }

    updateData = (value, key) => {

        // if (key === "emailAddress") {
        //     this.props.checkValidEmail({ email: value });
        // }

        let obj = {};
        obj[key] = value;
        this.props.updateGetStartedData(obj);
    }

    openDrift = () => {
        mixpanel.track("Get-Started: Clicked Get Help");
        window.open('https://drift.me/airspaceoffice', '_blank');
    }

    componentDidMount() {
        mixpanel.time_event('Get-Started'); // starts timer 
        mixpanel.track("Entered Get Started.");
    }

    render() {

        if (this.props.isFinished) {
            this.props.history.push('/get-started/finished');
        }

        const Step = Steps.Step;

        let body = null;
        let bodyPhoto = null;
        let bodyTitle = null;
        let bodyMessage = null;
        let firstMessage = null;
        if (this.props.step === 0) {
            body = (<CreateAccount updateData={(value, key) => this.updateData(value, key)} nextAction={this.nextStep} />);
            // body = (<NewServiceDetails updateData={this.updateData} nextAction={this.nextStep} />);
            bodyPhoto = getStarted1Photo;
            bodyTitle = stepTitles[0];
            firstMessage = "This will take around 5 minutes.";
            bodyMessage = "Let's start with some contact and company info. Next, you'll need your office square footage, employee count, address, and a list of services your office is looking for.";
        } else if (this.props.step === 1) {
            body = (<OfficeDetails updateData={this.updateData} nextAction={this.nextStep} />);
            bodyPhoto = getStarted2Photo;
            bodyTitle = stepTitles[1];
            bodyMessage = "Now, we just need a couple details about your office. This will help us give you accurate prices."
        } else if (this.props.step === 2) {
            body = (<NewServiceDetails updateData={this.updateData} nextAction={this.nextStep} />);
            bodyPhoto = getStarted4Photo;
            bodyTitle = stepTitles[2];
            bodyMessage = "Let us know which services your office is looking for."
        }

        return (
            <div>
                <MuiThemeProvider theme={theme}>
                    <div>
                        <MediaQuery minDeviceWidth={1225}>
                            <Row>
                                <Col span={24}>
                                    <Steps style={{ paddingTop: 30, paddingLeft: 100, paddingRight: 100 }} current={this.props.step}>
                                        <Step title={stepTitles[0]} description="Tell us about yourself and your company." />
                                        <Step title={stepTitles[1]} description="Tell us about your office." />
                                        <Step title={stepTitles[2]} description="Tell us what services your office needs." />
                                    </Steps>
                                </Col>
                            </Row>
                            <Row style={{ paddingTop: 20 }}>
                                <Col span={6} />
                                <Col style={{ paddingRight: 20 }} span={6}>
                                    <img style={{ width: "30%", textAlign: "start" }} alt="Get Started" src={bodyPhoto} />
                                    <h1>{bodyTitle}</h1>
                                    <h3 style={{ fontSize: 19 }}>{firstMessage}</h3>
                                    <h3>Need Help? <a style={{ color: "#FC588F" }} onClick={this.openDrift}>Live chat with us.</a></h3>
                                    <p style={{ fontSize: 16 }}>{bodyMessage}</p>
                                </Col>
                                {/* <Col span={1} /> */}
                                <Col style={{ paddingBottom: 50 }} span={6}>
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
                        </MediaQuery>
                        <MediaQuery maxDeviceWidth={1224}>
                            {/* <Row>
                                <Col span={24}>
                                    <Steps style={{ paddingTop: 50, paddingLeft: 100, paddingRight: 100 }} current={this.props.step}>
                                        <Step title={stepTitles[0]} description="Tell us about yourself and your company." />
                                        <Step title={stepTitles[1]} description="Tell us about your office." />
                                        <Step title={stepTitles[2]} description="Tell us what services your office needs." />
                                    </Steps>
                                </Col>
                            </Row> */}
                            <div style={{ paddingLeft: 15, paddingRight: 15 }}>
                                <Row style={{ paddingTop: 10 }}>
                                    <Col span={24}>
                                        <img style={{ width: "30%", textAlign: "start" }} alt="Get Started" src={bodyPhoto} />
                                        <h1>{bodyTitle}</h1>
                                        <h3>Need Help? <a style={{ color: "#FC588F" }} onClick={this.openDrift}>Live chat with us.</a></h3>
                                        <p style={{ fontSize: 15 }}>{bodyMessage}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{ paddingBottom: 50 }} span={24}>
                                        {body}
                                        {this.props.step !== 0 ?
                                            (
                                                <div style={{ paddingTop: 10, textAlign: "center" }}>
                                                    <a style={{ color: "#FC588F" }} onClick={this.prevStep}>Go Back</a>
                                                </div>
                                            ) : null}
                                    </Col>
                                </Row>
                            </div>
                        </MediaQuery>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isFinished: state.getStarted.isFinished,
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
        newServices: state.getStarted.newServices,
        otherServicesDetails: state.getStarted.otherServicesDetails
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateGetStartedData: (data) => dispatch(generalActionCreators.updateGetStartedData(data)),
        changeStep: (newStep) => dispatch(generalActionCreators.changeGetStartedStep(newStep)),
        submitGSData: (payload) => dispatch(generalActionCreators.submitGetStartedData(payload)),
        checkValidEmail: (payload) => dispatch(generalActionCreators.checkValidEmail(payload))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GetStartedComp));