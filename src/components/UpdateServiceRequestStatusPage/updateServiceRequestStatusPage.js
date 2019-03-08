import React from 'react';
import { connect } from 'react-redux';
import LoginNavBar from '../Login/LoginNavBar';
import ConfirmationImage from "../../assets/images/confirm_registered_guest.png";
import ConfirmationErrorImage from "../../assets/images/confirmation_error.png";
//import * as actionCreator from '../../store/actions/general';
import * as actionCreator from '../../store/actions/officeAdmin';
import { Row, Col, Card, Spin } from 'antd';
import '../Login/Login.css'

class UpdateServiceRequestStatusPage extends React.Component {
  state = ({
    valid_confirmation: true
  })

  componentDidMount() {
    console.log("UpdateSerivceRequestPage")
    console.log(this)
    const serviceRequestUID = this.props.match.params.uid
    const newStatus = this.props.match.params.status

    var payload = {
      selectedServiceRequestUID: serviceRequestUID,
      newStatus: newStatus
    }
    console.log("Payload", payload)
    this.props.editServiceRequestStatusForOfficeAdmin(payload)
  }

  render() {

    return (
      <div>
        <Row>
          <LoginNavBar/>
        </Row>
        <br />
        <Row type="flex" justify="space-around" align="middle">
          {this.props.checkingUserIn ? <Spin /> : (
            <div>
              <Col span={7}>
              </Col>
              <Col span={10}>
                <Card
                cover={<img alt="Request Photo" src={this.props.successfulServiceRequestUpdate? ConfirmationImage : ConfirmationErrorImage} />}
                bordered={false}
                />
              </Col>
              <Col span={7}>
              </Col>
            </div>
          )}

        </Row>
      </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    currentOfficeUID: state.general.currentOfficeAdminUID,
    isLoadingServiceRequestsData: state.officeAdmin.isLoadingServiceRequestsData,
    successfulServiceRequestUpdate: state.officeAdmin.successfulServiceRequestUpdate,
    checkedIn: state.general.checkedIn,
    checkingUserIn: state.general.checking_user_in
  }
};

const mapDispatchToProps = dispatch => {
  return {
    editServiceRequestStatusForOfficeAdmin: (payload) => dispatch(actionCreator.editServiceRequestStatusForOfficeAdmin(payload))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateServiceRequestStatusPage);
