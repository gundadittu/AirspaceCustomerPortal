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

class OfficeList extends React.Component {

    state = {
        showLoading: false,
    }

    chooseOffice = (officeUID) => {
        this.setState({ showLoading: true });


        const firebase = this.props.firebase || null;
        if (firebase) {

            const urlParams = new URLSearchParams(this.props.redirect);
            const authCode = urlParams.get("code");
            // console.log(authCode);
            const dict = {
                authCode: authCode,
                selectedOfficeUID: officeUID
            }

            this.setState({ showLoading: true });
            // console.log("reached linkAlexa");
            const apiCall = firebase.functions.httpsCallable('linkAlexa');
            apiCall(dict)
                .then(result => {
                    this.setState({ showLoading: false });
                    // console.log("reached end of linkAlexa");
                    // console.log(this.props.redirect);
                    window.location.href = this.props.redirect;
                    return null
                })
        }

    }

    render() {

        const spinner = () => {
            if (this.state.showLoading === true) {
                return (
                    <Grid container justify="center" alignItems="center" style={{ marginTop: 20 }}>
                        <Spin />
                    </Grid>
                );
            } else {
                return null;
            }
        }
        return (

            <div>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={3} />
                    <Col span={18}>
                        <h3>Which Airspace Office do you want to associate with all your Alexa devices?</h3>
                        {spinner()}
                        {this.props.adminOfficeList !== null ?
                            this.props.adminOfficeList.map(x => (
                                <Card style={{ marginBottom: 30 }} actions={[<Button onClick={() => this.chooseOffice(x.uid)}>Choose</Button>]}>
                                    {x.name}
                                </Card>
                            ))
                            : null}
                    </Col>
                    <Col span={3} />
                </Row>
            </div>
        );
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//     }
// };

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        adminOfficeList: state.auth.adminOfficeList,
        firebase: state.firebase.firebase,
        redirect: state.officeAdmin.alexaRedirect
    }
}

export default withRouter(Form.create({ name: 'normal_login' })(connect(mapStateToProps, null)(OfficeList)));
