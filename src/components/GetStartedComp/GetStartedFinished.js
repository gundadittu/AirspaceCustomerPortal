import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col, Card } from 'antd';
import getStartedFinishedImage from "../../assets/images/get-started/get-started-finished.png"
import * as authActionCreators from '../../store/actions/auth';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

const theme = createMuiTheme({
    palette: {
        primary: { main: '#FC588F' },
        secondary: { main: '#000000' },
    },
    typography: {
        useNextVariants: true,
        fontFamily: [
            'Avenir Next'
        ]
    },
});

class GetStartedFinishedComp extends React.Component {

    signIn = () => {
        this.props.history.push('/login');
        window.location.reload(false);
        // this.props.signInUser(this.props.email, this.props.password, true);
    }

    render() {

        const { classes } = this.props;
        return (
            <div>
                <Row type="flex" justify="space-around" align="middle">
                    <div style={{ paddingTop: "5%", textAlign: "center" }}>
                        <Col span={8}>
                        </Col>
                        <Col span={8}>
                            <Card
                                cover={<img alt="Request Photo" src={getStartedFinishedImage} />}
                                bordered={false}
                            />
                            <h1>CHEERS!</h1>
                        </Col>
                        <Col span={8}>
                        </Col>
                    </div>
                </Row>
                <MuiThemeProvider theme={theme}>
                    <Row align="middle">
                        <div style={{ textAlign: "center" }}>
                            <Col span={5}>
                            </Col>
                            <Col span={14}>
                                <h1 >You're on your way to a new office experience.</h1>
                                <h2 style={{ color: "#A9A9A9" }}>Your experience manager will be reaching out soon.</h2>
                                {/* {this.props.isLoadingSignIn ? (<CircularProgress className={classes.progress} color="#f07c94" />)
                                    : (
                                        <div style={{ textAlign: "center" }}>
                                            <Fab onClick={this.signIn} style={{ width: "40%", fontSize: 19 }} variant="extended" color="primary" aria-label="Add">
                                                LOGIN
                                        </Fab>
                                        </div>
                                    )} */}
                            </Col>
                            <Col span={5}>
                            </Col>
                        </div>
                    </Row >
                </MuiThemeProvider>
            </div>

        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signInUser: (email, password, rememberMe) => dispatch(authActionCreators.signInUserAction(email, password, rememberMe))
    }
};

const mapStateToProps = state => {
    return {
        isLoadingSignIn: state.general.isLoadingSignIn,
        email: state.getStarted.emailAddress,
        password: state.getStarted.password
    }
}

GetStartedFinishedComp.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(GetStartedFinishedComp)));
