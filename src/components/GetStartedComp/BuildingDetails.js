import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import NextButton from './NextButton';
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
    },
    menu: {
        width: 200,
    },
});


class BuildingDetails extends React.Component {

    validateEntries = () => {
        return true
    }

    render() {
        const { classes, updateData } = this.props;

        return (
            <div>
                <form className={classes.container} noValidate autoComplete="off">
                    <FormControl fullWidth>
                        <div style={{ paddingTop: 20 }}>
                            <TextField
                                id="outlined-name"
                                label="Building Contact Name"
                                className={classes.textField}
                                value={this.props.buildingContactName}
                                onChange={(e) => updateData(e.target.value, "buildingContactName")}
                                margin="normal"
                                variant="outlined"
                                style={{ width: "100%" }}
                                type="text"
                            />
                            <TextField
                                required
                                id="outlined-select-currency-native"
                                select
                                label="Building Contact Role"
                                className={classes.textField}
                                type="text"
                                value={this.props.buildingContactRole}
                                onChange={(e) => updateData(e.target.value, "buildingContactRole")}
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                                margin="normal"
                                variant="outlined"
                                style={{ width: "100%" }}
                            >
                                <MenuItem key={1} value={"landlord"}>
                                    Landlord
                                </MenuItem>
                                <MenuItem key={2} value={"property-manager"}>
                                    Property Manager
                                </MenuItem>
                                <MenuItem key={3} value={"leasing-agent"}>
                                    Leasing Agent
                                </MenuItem>
                                <MenuItem key={4} value={"other"}>
                                    Other
                                </MenuItem>
                            </TextField>
                            <TextField
                                id="outlined-name"
                                label="Building Contact Email"
                                className={classes.textField}
                                value={this.props.buildingContactEmail}
                                onChange={(e) => updateData(e.target.value, "buildingContactEmail")}
                                margin="normal"
                                variant="outlined"
                                style={{ width: "100%" }}
                                type="email"
                            />
                            <TextField
                                id="outlined-name"
                                label="Building Contact Phone Number"
                                className={classes.textField}
                                value={this.props.buildingContactPhone}
                                onChange={(e) => updateData(e.target.value, "buildingContactPhone")}
                                margin="normal"
                                variant="outlined"
                                style={{ width: "100%" }}
                                type="tel"
                            />
                        </div>
                    </ FormControl>
                </form>
                < NextButton validate={this.validateEntries} nextAction={this.props.nextAction} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        buildingContactName: state.getStarted.buildingContactName,
        buildingContactRole: state.getStarted.buildingContactRole,
        buildingContactEmail: state.getStarted.buildingContactEmail,
        buildingContactPhone: state.getStarted.buildingContactPhone
    }
};

BuildingDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps, null)(BuildingDetails));