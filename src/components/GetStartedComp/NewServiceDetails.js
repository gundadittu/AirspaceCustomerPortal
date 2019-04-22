import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Checkbox } from 'antd';
import NextButton from './NextButton';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import mixpanel from 'mixpanel-browser';
mixpanel.init('4b6f21dc6886a40bf4900783da31064a');

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    }
});

class NewServiceDetails extends React.Component {

    onChange = (checkedValues) => {
        this.props.updateData(checkedValues, 'newServices');
    }

    validateEntries = () => {
        return true
    }

    componentWillMount() {
        mixpanel.time_event('Get-Started: New Service Details Page'); // starts timer 
    }

    componentWillUnmount() {
        mixpanel.track('Get-Started: New Service Details Page'); // end timer 
    }

    render() {
        const CheckboxGroup = Checkbox.Group;
        const { classes } = this.props;

        return (
            <div>
                <CheckboxGroup style={{ width: '100%' }} defaultValue={this.props.newServices} onChange={this.onChange}>
                    <Row>
                        <Col style={{ paddingTop: 10 }} span={12}>
                            <Checkbox value="coffee">Coffee</Checkbox>
                        </Col>
                        <Col style={{ paddingTop: 10 }} span={12}>
                            <Checkbox value="snacks-beverages">Snacks + Beverages</Checkbox>
                        </Col>
                        <Col style={{ paddingTop: 10 }} span={12}>
                            <Checkbox value="it-services">IT Services</Checkbox>
                        </Col>
                        <Col style={{ paddingTop: 10 }} span={12}>
                            <Checkbox value="cleaning">Cleaning</Checkbox>
                        </Col>
                        <Col style={{ paddingTop: 10 }} span={12}>
                            <Checkbox value="wifi">High Speed WiFi</Checkbox>
                        </Col>
                        <Col style={{ paddingTop: 10 }} span={12}>
                            <Checkbox value="backup-mifi">Backup Mifi</Checkbox>
                        </Col>
                        <Col style={{ paddingTop: 10 }} span={12}>
                            <Checkbox value="airspace-office-app">Airspace Office App</Checkbox>
                        </Col>
                        <Col style={{ paddingTop: 10 }} span={12}>
                            <Checkbox value="repairs-maintenance">Repairs/Maintenance</Checkbox>
                        </Col>
                        <Col style={{ paddingTop: 10 }} span={12}>
                            <Checkbox value="printing">Printing</Checkbox>
                        </Col>
                        <Col style={{ paddingTop: 10 }} span={12}>
                            <Checkbox value="office-supplies">Office Supplies</Checkbox>
                        </Col>
                        <Col style={{ paddingTop: 10 }} span={12}>
                            <Checkbox value="conf-room-hardware">Conf. Room Hardware</Checkbox>
                        </Col>
                        <Col style={{ paddingTop: 10 }} span={12}>
                            <Checkbox value="conf-room-software">Conf. Room Software</Checkbox>
                        </Col>
                        <Col style={{ paddingTop: 10 }} span={12}>
                            <Checkbox value="furniture-purchase">Furniture Purchase</Checkbox>
                        </Col>
                        <Col style={{ paddingTop: 10 }} span={12}>
                            <Checkbox value="furniture-rental">Furniture Rental</Checkbox>
                        </Col>
                        <Col style={{ paddingTop: 10 }} span={12}>
                            <Checkbox value="contractors">Contractors</Checkbox>
                        </Col>
                        <Col style={{ paddingTop: 10 }} span={12}>
                            <Checkbox value="architects">Architects</Checkbox>
                        </Col>
                        <Col style={{ paddingTop: 10 }} span={12}>
                            <Checkbox value="space-design">Space Design</Checkbox>
                        </Col>
                        <Col style={{ paddingTop: 10 }} span={12}>
                            <Checkbox value="office-security">Office Security</Checkbox>
                        </Col>
                        <Col style={{ paddingTop: 10 }} span={12}>
                            <Checkbox value="event-management">Event Management</Checkbox>
                        </Col>
                        <Col style={{ paddingTop: 10 }} span={12}>
                            <Checkbox value="mailing-services">Mailing Services</Checkbox>
                        </Col>
                        <Col style={{ paddingTop: 10 }} span={12}>
                            <Checkbox value="growth-planning">Growth Planning</Checkbox>
                        </Col>
                    </Row>
                </CheckboxGroup>
                <TextField
                    fullWidth={true}
                    id="outlined-multiline-flexible"
                    label="Other Services or Details"
                    multiline
                    rows="4"
                    value={this.props.otherServicesDetails}
                    onChange={(e) => this.props.updateData(e.target.value, 'otherServicesDetails')}
                    className={classes.textField}
                    style={{ width: "100%" }}
                    margin="normal"
                    variant="outlined"
                />
                <div style={{ textAlign: "center" }}>
                    < NextButton validate={this.validateEntries} nextAction={this.props.nextAction} />
                    <p style={{ marginTop: 10 }}>By clicking Finish, you agree to our <a style={{ color: "#FC588F" }} target="_blank" href="https://www.airspaceoffice.co/terms.html">Terms</a> and <a style={{ color: "#FC588F" }} target="_blank" href="https://www.airspaceoffice.co/privacy.html">Privacy Policy.</a> </p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        newServices: state.getStarted.newServices,
        otherServicesDetails: state.getStarted.otherServicesDetails
    }
};

NewServiceDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps, null)(NewServiceDetails));