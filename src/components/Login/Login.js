import React from 'react';
import { connect } from 'react-redux';
import LoginNavBar from './LoginNavBar';
import LoginForm from './LoginForm';
import { Row, Col } from 'antd';
import './Login.css'

class Login extends React.Component {

  render() {
    return (
      <div>
        <LoginNavBar/>
        <Row type="flex" justify="space-around" align="middle">
           <Col>
             <LoginForm/>
          </Col>
        </Row>
      </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.general.error
  }
};

export default connect(mapStateToProps, null)(Login);
