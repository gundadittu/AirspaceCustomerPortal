import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Card, Row, Col, Spin, notification } from 'antd';
import Grid from '@material-ui/core/Grid';
import SigninLogo from "../../assets/images/fogg-logged-out-1.png";
import { connect } from 'react-redux';
import * as authActionCreators from '../../store/actions/auth';
import '../../App.css'
import '../Login/Login.css'
import LoginNavBar from '../Login/LoginNavBar';
import { withRouter } from 'react-router-dom';
import OfficeList from './OfficeList';

class AlexaLoginForm extends React.Component {

    componentDidMount() {
        if (this.props.user) {
            var uid = this.props.uid;
            this.nextPage(uid);
        }


        const weakThis = this;
        const firebase = this.props.firebase || null;
        if (firebase) {

            this.listener = firebase.auth.onAuthStateChanged(function (user) {
                if (user) {
                    var uid = user.uid;
                    weakThis.nextPage(uid);
                }
            });
        }
    }

    nextPage = (uid) => {
        let authCode = this.getAuthCode();

        const urlParams = new URLSearchParams(window.location.search);
        // State sent by Alexa which we have to return.
        const state = urlParams.get("state");
        // Redirect uri sent by Alexa.
        const redirect_uri = urlParams.get("redirect_uri");
        // Combine all the uri elements.
        let url = redirect_uri + "?state=" + state + "&code=" + authCode;

        this.props.history.push('/general/alexa-login/office-list/' + url);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const email = values.emailAddress || null;
                const password = values.password || null;
                const rememberMe = values.remember || false;
                this.props.signInUser(email, password, rememberMe);
            }
        });
    }

    getAuthCode = () => {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        return '_' + Math.random().toString(36).substr(2, 9);
    }


    render() {

        const { getFieldDecorator } = this.props.form;

        const spinner = () => {
            if (this.props.isLoadingSignIn === true) {
                return (
                    <Grid container justify="center" alignItems="center" style={{ marginTop: 20 }}>
                        <Spin />
                    </Grid>
                );
            } else {
                return null;
            }
        }

        let body = (
            <Row>
                <Col span={6} />
                <Col span={12}>
                    <Card bordered={false}>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item>
                                {getFieldDecorator('emailAddress', {
                                    validateTrigger: 'onBlur',
                                    rules: [{ required: true, message: 'Please input your email address!', whitespace: true, pattern: /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/ }],
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email Address" />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    validateTrigger: 'onBlur',
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
                                {spinner()}
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
                <Col span={6} />
            </Row>
        )

        // if (this.state.showOfficeList) { 
        //     body = (< OfficeList url={this.state.url} />)
        // }

        return (

            <div>
                {/* <LoginNavBar /> */}
                <Row type="flex" justify="space-around" align="middle">
                    <Card className="login-card">
                        {body}
                    </Card>
                </Row>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signOutUser: () => dispatch(authActionCreators.signOutUserAction()),
        signInUser: (email, password, rememberMe) => dispatch(authActionCreators.signInUserAction(email, password, rememberMe))
    }
};

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        isLoadingSignIn: state.general.isLoadingSignIn,
        firebase: state.firebase.firebase,
    }
}

export default withRouter(Form.create({ name: 'normal_login' })(connect(mapStateToProps, mapDispatchToProps)(AlexaLoginForm)));
