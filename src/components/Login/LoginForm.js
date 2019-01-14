import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Card } from 'antd';
import { connect } from 'react-redux';
import * as authActionCreators from '../../store/actions/auth'; 
import '../../App.css'
import './Login.css'

// To do: 
// handle forgot password 
// handle remember me 
// responsive card size 

class LoginForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const email = values.emailAddress || null; 
        const password = values.password || null;
        this.props.signInUser(email, password);
      }
    });
  }

  render() {

    const { getFieldDecorator } = this.props.form;
    return (
      <Card style={{ width: 350 }}>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('emailAddress', {
              rules: [{ required: true, message: 'Please input your email address!', whitespace: true, pattern: /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/ }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email Address" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!', whitespace: true }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox className="">Remember me</Checkbox>
            )}
            <a className="login-form-forgot airspaceColor" href="">Forgot password?</a>
            <Button type="primary" htmlType="submit" className="login-form-button airspace-submit-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signInUser: (email, password) => dispatch(authActionCreators.signInUserAction(email, password))
  }
};

export default Form.create({ name: 'normal_login' })(connect(null, mapDispatchToProps)(LoginForm));