import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
// import { Steps, Row, Col } from 'antd';
import NextButtom from './NextButton';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    }
});

class CreateAccount extends React.Component {

    state = {
        firstNameErr: null,
        lastNameErr: null,
        emailAddrErr: null,
        passwordErr: null,
        phoneNoErr: null,
        compNameErr: null,
        compURLErr: null,
        roleErr: null,

    }

    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    validateEntries = () => {
        let error = false;
        if (this.props.firstName === null) {
            this.setState({ firstNameErr: "Required value" });
            error = true;
        } else {
            this.setState({ firstNameErr: null });
        }

        if (this.props.lastName === null) {
            this.setState({ lastNameErr: "Required value" });
            error = true;
        } else {
            this.setState({ lastNameErr: null });
        }

        if (this.props.emailAddress === null) {
            this.setState({ emailAddrErr: "Required value" });
            error = true;
        } else if (this.validateEmail(this.props.emailAddress) === false) {
            this.setState({ emailAddrErr: "Must provide a valid email address." });
            error = true;
        } else {
            this.setState({ emailAddrErr: null });
        }

        // if (this.props.password === null) {
        //     this.setState({ passwordErr: "Required value" });
        //     error = true;
        // } else {
        //     this.setState({ passwordErr: null });
        // }

        if (this.props.companyName === null) {
            this.setState({ compNameErr: "Required value" });
            error = true;
        } else {
            this.setState({ compNameErr: null });
        }

        if (this.props.companyURL === null) {
            this.setState({ compURLErr: "Required value" });
            error = true;
        } else {
            this.setState({ compURLErr: null });
        }

        if (this.props.userRole === null) {
            this.setState({ roleErr: "Required value" });
            error = true;
        } else {
            this.setState({ roleErr: null });
        }

        if (this.props.phoneNo === null) {
            this.setState({ phoneNoErr: "Required value" });
            error = true;
            // var digits = ("" + this.props.phoneNo).split("");
            // if (digits.length != 10) {
            //     this.setState({ phoneNoErr: "Must provide a valid phone number." });
            //     error = true;
            // } else {
            //     this.setState({ phoneNoErr: null });
            // }
        } else {
            this.setState({ phoneNoErr: null });
        }

        return !error // false if there is an error 
    }

    render() {
        const { classes, updateData } = this.props;

        return (
            <div>
                <form className={classes.container} autoComplete="off">
                    <FormControl fullWidth>
                        <div>
                            <TextField
                                required
                                id="outlined-name"
                                label="First Name"
                                className={classes.textField}
                                type="text"
                                defaultValue={this.props.firstName}
                                onChange={(e) => updateData(e.target.value, 'firstName')}
                                style={{ width: "40%" }}
                                margin="normal"
                                variant="outlined"
                                error={(this.state.firstNameErr !== null)}
                                helperText={this.state.firstNameErr}
                            />
                            <TextField
                                required
                                id="outlined-name"
                                label="Last Name"
                                type="text"
                                className={classes.textField}
                                defaultValue={this.props.lastName}
                                onChange={(e) => updateData(e.target.value, 'lastName')}
                                style={{ width: "40%" }}
                                margin="normal"
                                variant="outlined"
                                error={(this.state.lastNameErr !== null)}
                                helperText={this.state.lastNameErr}
                            />
                        </div>
                        <TextField
                            required
                            id="outlined-name"
                            label="Email Address"
                            className={classes.textField}
                            type="email"
                            defaultValue={this.props.emailAddress}
                            onChange={(e) => updateData(e.target.value, 'emailAddress')}
                            style={{ width: "100%" }}
                            margin="normal"
                            variant="outlined"
                            error={(this.state.emailAddrErr !== null)}
                            helperText={this.state.emailAddrErr}
                        />
                        {/* <TextField
                            required
                            id="outlined-name"
                            label="Password"
                            type="password"
                            className={classes.textField}
                            defaultValue={this.props.password}
                            onChange={(e) => updateData(e.target.value, 'password')}
                            margin="normal"
                            variant="outlined"
                            style={{ width: "100%" }}
                            error={(this.state.passwordErr !== null)}
                            helperText={this.state.passwordErr}
                            autoComplete="no"
                        /> */}
                        {/* <div style={{ paddingTop: 20 }}/> */}
                        <TextField
                            required
                            id="outlined-name"
                            label="Phone Number"
                            className={classes.textField}
                            type="tel"
                            defaultValue={this.props.phoneNo}
                            onChange={(e) => updateData(e.target.value, 'phoneNo')}
                            margin="normal"
                            variant="outlined"
                            style={{ width: "100%" }}
                            error={(this.state.phoneNoErr !== null)}
                            helperText={this.state.phoneNoErr}
                        />
                        <div style={{ paddingTop: 20, paddingBottom: 20 }}>
                            <TextField
                                required
                                id="outlined-name"
                                label="Company Name"
                                className={classes.textField}
                                type="text"
                                defaultValue={this.props.companyName}
                                onChange={(e) => updateData(e.target.value, 'companyName')}
                                margin="normal"
                                variant="outlined"
                                style={{ width: "100%" }}
                                error={(this.state.compNameErr !== null)}
                                helperText={this.state.compNameErr}
                            />
                            <TextField
                                required
                                id="outlined-name"
                                label="Company URL"
                                className={classes.textField}
                                type="url"
                                defaultValue={this.props.companyURL}
                                onChange={(e) => updateData(e.target.value, 'companyURL')}
                                margin="normal"
                                variant="outlined"
                                style={{ width: "100%" }}
                                error={(this.state.compURLErr !== null)}
                                helperText={this.state.compURLErr}
                            />
                            <TextField
                                required
                                id="outlined-select-currency-native"
                                select
                                label="What is your role in the company?"
                                className={classes.textField}
                                type="text"
                                value={this.props.userRole}
                                onChange={(e) => updateData(e.target.value, 'userRole')}
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                                margin="normal"
                                variant="outlined"
                                style={{ width: "100%" }}
                                error={(this.state.roleErr !== null)}
                                helperText={this.state.roleErr}
                            >
                                <MenuItem key={1} value={"office-admin"}>
                                    Office Administrator
                                </MenuItem>
                                <MenuItem key={2} value={"hr-manager"}>
                                    HR Manager
                                </MenuItem>
                                <MenuItem key={3} value={"executive-assistant"}>
                                    Executive Assistant
                                </MenuItem>
                                <MenuItem key={4} value={"executive"}>
                                    Executive
                                </MenuItem>
                                <MenuItem key={5} value={"other"}>
                                    Other
                                </MenuItem>
                            </TextField>
                        </div>
                    </ FormControl>
                </form >
                < NextButtom validate={this.validateEntries} nextAction={this.props.nextAction} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        firstName: state.getStarted.firstName,
        lastName: state.getStarted.lastName,
        emailAddress: state.getStarted.emailAddress,
        password: state.getStarted.password,
        phoneNo: state.getStarted.phoneNo,
        companyName: state.getStarted.companyName,
        companyURL: state.getStarted.companyURL,
        userRole: state.getStarted.userRole
    }
};

const mapDispatchToProps = dispatch => {
    return {
    }
};

CreateAccount.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CreateAccount));