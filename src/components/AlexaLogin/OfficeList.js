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
        url: null,
        showLoading: false,
    }

    componentDidMount() {
        if (this.props.match.isExact) {
            const url = this.props.match.params.url;
            this.setState({ url: url });
        }
    }

    chooseOffice = (officeUID) => {
        this.setState({ showLoading: true });


        const firebase = this.props.firebase || null;
        if (firebase) {

            const urlParams = new URLSearchParams(window.location.search);
            const authCode = urlParams.get("code");
            const dict = {
                authCode: authCode,
                selectedOfficeUID: officeUID
            }

            this.setState({ showLoading: true });
            const apiCall = firebase.functions.httpsCallable('linkAlexa');
            apiCall(dict)
                .then(result => {
                    this.setState({ showLoading: false });
                    window.location.href = this.state.url;
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
                    <Col span={6} />
                    <Col span={12}>
                        <h3>Which Airspace Office do you want to associate with all your Alexa devices?</h3>
                        {this.props.adminOfficeList !== null ?
                            this.props.adminOfficeList.map(x => (
                                <Card actions={[<Button onClick={() => this.chooseOffice(x.uid)}>Choose</Button>]}>
                                    {x.name}
                                </Card>
                            ))
                            : null}
                        {spinner()}
                    </Col>
                    <Col span={6} />
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
        firebase: state.firebase.firebase
    }
}

export default withRouter(Form.create({ name: 'normal_login' })(connect(mapStateToProps, null)(OfficeList)));
