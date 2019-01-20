import React from 'react';
import { connect } from 'react-redux';
import LoginNavBar from './LoginNavBar';
import LoginForm from './LoginForm';
import { Row, Col } from 'antd';
import './Login.css'

// To-do:
// make sure successful sign in leaves page
// show loading indicator
// show error message

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
    error: state.general.error,
    isLoading: state.general.isLoading
  }
};

export default connect(mapStateToProps, null)(Login);