import React from 'react';
import { Route, Redirect } from 'react-router'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LoginNavBar from '../Login/LoginNavBar';
import ConfirmationImage from "../../assets/images/createPWConf.png";
import ConfirmationErrorImage from "../../assets/images/error.png";
import * as actionCreator from '../../store/actions/general';
import { Row, Col, Card, Spin } from 'antd';
import '../Login/Login.css'

class CreatePasswordPage extends React.Component {
  state = ({
    valid_confirmation: true
  })

  componentDidMount() {
    const userUID = this.props.match.params.userUID
    var payload = {
      userUID: userUID
    }
    this.props.guestCreatePassword(payload)
  }

  render() {

    if (this.props.create_password_url) {
      window.location.assign(this.props.create_password_url);
    }

    if (this.props.createPasswordLoading === true) {
      return (
        <div>
          <Row>
            <LoginNavBar/>
          </Row>
          <Row type="flex" justify="space-around" align="middle">
            <h2>Creating password</h2>
          </Row>
          <Row type="flex" justify="space-around" align="middle">
            <Spin size="large" />
          </Row>
          <br />

        </div>
      );
    }

    return (
      <div>
        {/* <Row>
          <LoginNavBar/>
        </Row> */}
        <br />
        <Row type="flex" justify="space-around" align="middle">
          {this.props.updatingServiceStatusEmail ? <Spin /> : (
            <div>
              <Col span={7}>
              </Col>
              <Col span={10}>
                <Card
                cover={<img alt="Request Photo" src={this.props.createPasswordError === null ? ConfirmationImage : ConfirmationErrorImage} />}
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
    redirect_create_password: state.general.redirect_create_password,
    create_password_url: state.general.create_password_url,
    createPasswordError: state.general.createPasswordError,
    createPasswordLoading: state.general.createPasswordLoading
  }
};

const mapDispatchToProps = dispatch => {
  return {
    guestCreatePassword: (payload) => dispatch(actionCreator.guestCreatePassword(payload))
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreatePasswordPage));
