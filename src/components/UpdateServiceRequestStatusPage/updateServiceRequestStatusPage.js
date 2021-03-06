import React from 'react';
import { connect } from 'react-redux';
import LoginNavBar from '../Login/LoginNavBar';
import ConfirmationImage from "../../assets/images/requestUpdateConf.png";
import ConfirmationErrorImage from "../../assets/images/error.png";
import * as actionCreator from '../../store/actions/general';
import { Row, Col, Card, Spin } from 'antd';
import '../Login/Login.css'

class UpdateServiceRequestStatusPage extends React.Component {
  state = ({
    valid_confirmation: true
  })

  componentDidMount() {
    const serviceRequestUID = this.props.match.params.uid
    const newStatus = this.props.match.params.status

    var payload = {
      selectedServiceRequestUID: serviceRequestUID,
      newStatus: newStatus
    }
    this.props.editServiceRequestStatusForEmail(payload)
  }

  render() {

    return (
      <div>
        {/* <Row>
          <LoginNavBar/>
        </Row>
        <br /> */}
        <Row type="flex" justify="space-around" align="middle">
          {this.props.updatingServiceStatusEmail ? <Spin /> : (
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
    updatingServiceStatusEmail: state.general.updatingServiceStatusEmail,
    successfulServiceRequestUpdate: state.general.successfulServiceRequestUpdate
  }
};

const mapDispatchToProps = dispatch => {
  return {
    editServiceRequestStatusForEmail: (payload) => dispatch(actionCreator.editServiceRequestStatusForEmail(payload))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateServiceRequestStatusPage);
