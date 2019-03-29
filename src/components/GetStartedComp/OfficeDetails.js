import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import NextButtom from './NextButton';

import mixpanel from 'mixpanel-browser';
mixpanel.init('4b6f21dc6886a40bf4900783da31064a');

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


class OfficeDetails extends React.Component {

    state = {
        streetAddr1Err: null,
        zipCodeErr: null,
        cityErr: null,
        stateAddrErr: null,
        floorNoErr: null,
        squareFTErr: null,
        employeeNoErr: null
    }

    validateEntries = () => {

        let error = false;

        if (this.props.streetAddr1 === null) {
            this.setState({ streetAddr1Err: "Required value" });
            error = true;
        } else {
            this.setState({ streetAddr1Err: null });
        }

        if (this.props.zipCode === null) {
            this.setState({ zipCodeErr: "Required value" });
            error = true;
        } else {
            this.setState({ zipCodeErr: null });
        }

        if (this.props.city === null) {
            this.setState({ cityErr: "Required value" });
            error = true;
        } else {
            this.setState({ cityErr: null });
        }

        if (this.props.stateAddr === null) {
            this.setState({ stateAddrErr: "Required value" });
            error = true;
        } else {
            this.setState({ stateAddrErr: null });
        }

        if (this.props.floorNo === null) {
            this.setState({ floorNoErr: "Required value" });
            error = true;
        } else {
            this.setState({ floorNoErr: null });
        }

        if (this.props.squareFT === null) {
            this.setState({ squareFTErr: "Required value" });
            error = true;
        } else {
            this.setState({ squareFTErr: null });
        }


        if (this.props.employeeNo === null) {
            this.setState({ employeeNoErr: "Required value" });
            error = true;
        } else {
            this.setState({ employeeNoErr: null });
        }

        return !error // false if there are errors 
    }

    componentWillMount() {
        mixpanel.time_event('Get-Started: Office Details Page'); // starts timer 
    }

    componentWillUnmount() {
        mixpanel.track('Get-Started: Office Details Page'); // end timer 
    }

    render() {
        const { classes, updateData } = this.props;

        return (
            <div>
                <form className={classes.container} noValidate autoComplete="off">
                    <FormControl fullWidth>
                        <TextField
                            required
                            id="outlined-name"
                            label="Street Address"
                            className={classes.textField}
                            value={this.props.streetAddr1}
                            onChange={(e) => updateData(e.target.value, "streetAddr1")}
                            margin="normal"
                            variant="outlined"
                            style={{ width: "100%" }}
                            type="text"
                            error={this.state.streetAddr1Err}
                            helperText={this.state.streetAddr1Err}
                        />
                        <TextField
                            id="outlined-name"
                            label="Street Address 2"
                            className={classes.textField}
                            value={this.props.streetAddr2}
                            onChange={(e) => updateData(e.target.value, "streetAddr2")}
                            margin="normal"
                            variant="outlined"
                            style={{ width: "100%" }}
                            type="text"
                        />
                        <div>
                            <TextField
                                required
                                id="outlined-name"
                                label="City"
                                className={classes.textField}
                                value={this.props.city}
                                onChange={(e) => updateData(e.target.value, "city")}
                                margin="normal"
                                variant="outlined"
                                style={{ width: "50%" }}
                                type="text"
                                error={this.state.cityErr}
                                helperText={this.state.cityErr}
                            />
                            <TextField
                                required
                                id="outlined-name"
                                label="State"
                                className={classes.textField}
                                value={this.props.stateAddr}
                                onChange={(e) => updateData(e.target.value, "stateAddr")}
                                margin="normal"
                                variant="outlined"
                                style={{ width: "30%" }}
                                type="text"
                                error={this.state.stateAddrErr}
                                helperText={this.state.stateAddrErr}
                            />
                        </div>
                        <TextField
                            required
                            id="outlined-name"
                            label="Zip Code"
                            className={classes.textField}
                            value={this.props.zipCode}
                            onChange={(e) => updateData(e.target.value, "zipCode")}
                            margin="normal"
                            variant="outlined"
                            style={{ width: "100%" }}
                            type="number"
                            error={this.state.zipCodeErr}
                            helperText={this.state.zipCodeErr}
                        />
                        <div>
                            <TextField
                                required
                                id="outlined-name"
                                label="Floor Number"
                                className={classes.textField}
                                value={this.props.floorNo}
                                onChange={(e) => updateData(e.target.value, "floorNo")}
                                margin="normal"
                                variant="outlined"
                                style={{ width: "40%" }}
                                type="number"
                                error={this.state.floorNoErr}
                                helperText={this.state.floorNoErr}
                            />
                            <TextField
                                id="outlined-name"
                                label="Suite Number"
                                className={classes.textField}
                                value={this.props.suiteNo}
                                onChange={(e) => updateData(e.target.value, "suiteNo")}
                                margin="normal"
                                variant="outlined"
                                style={{ width: "40%" }}
                                type="number"
                            />
                        </div>
                        <div style={{ paddingTop: 20 }}></div>
                        <TextField
                            required
                            id="outlined-name"
                            label="Square Footage"
                            className={classes.textField}
                            value={this.props.squareFT}
                            onChange={(e) => updateData(e.target.value, "squareFT")}
                            margin="normal"
                            variant="outlined"
                            type="number"
                            style={{ width: "100%" }}
                            error={this.state.squareFTErr}
                            helperText={this.state.squareFTErr}
                        />
                        <TextField
                            required
                            id="outlined-name"
                            label="Number of Employees In Office"
                            className={classes.textField}
                            value={this.props.employeeNo}
                            onChange={(e) => updateData(e.target.value, "employeeNo")}
                            margin="normal"
                            variant="outlined"
                            type="number"
                            style={{ width: "100%" }}
                            error={this.state.employeeNoErr}
                            helperText={this.state.employeeNoErr}
                        />
                        <div style={{ paddingTop: 20 }}></div>
                        <TextField
                            id="date"
                            label="Move-in Date (if this is not your existing office)"
                            type="date"
                            variant="outlined"
                            value={this.props.moveInDate}
                            onChange={(e) => updateData(e.target.value, "moveInDate")}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: "100%" }}
                        />
                    </ FormControl>
                </form>
                < NextButtom validate={this.validateEntries} nextAction={this.props.nextAction} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        streetAddr1: state.getStarted.streetAddr1,
        streetAddr2: state.getStarted.streetAddr2,
        zipCode: state.getStarted.zipCode,
        city: state.getStarted.city,
        stateAddr: state.getStarted.stateAddr,
        floorNo: state.getStarted.floorNo,
        suiteNo: state.getStarted.suiteNo,
        squareFT: state.getStarted.squareFT,
        employeeNo: state.getStarted.employeeNo,
        moveInDate: state.getStarted.moveInDate
    }
};

// const mapDispatchToProps = dispatch => {
//     return {
//     }
// };

OfficeDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps, null)(OfficeDetails));