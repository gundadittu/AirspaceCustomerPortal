import React from 'react';
import { connect } from 'react-redux';
import LoginNavBar from '../Login/LoginNavBar';
import ConfirmationImage from "../../assets/images/confirm_registered_guest.png";
import ConfirmationErrorImage from "../../assets/images/confirmation_error.png";
import * as actionCreator from '../../store/actions/general';
import { Row, Col, Card, Spin } from 'antd';
import '../Login/Login.css'

class ConfirmationPage extends React.Component {
  state = ({
    valid_confirmation: true
  })

  componentDidMount() {
    console.log(this)
    const rgUID = this.props.match.params.UID
    var payload = {
      registeredGuestUID: rgUID
    }
    this.props.guestSelfCheckIn(payload)
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
                cover={<img alt="Request Photo" src={this.props.checkedIn? ConfirmationImage : ConfirmationErrorImage} />}
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
    checkedIn: state.general.checkedIn,
    checkingUserIn: state.general.checking_user_in
  }
};

const mapDispatchToProps = dispatch => {
  return {
    guestSelfCheckIn: (payload) => dispatch(actionCreator.guestSelfCheckIn(payload))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationPage);
