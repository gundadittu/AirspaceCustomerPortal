import React from 'react';
import Fab from '@material-ui/core/Fab';
import ArrowForward from '@material-ui/icons/ArrowForward';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

class NextButton extends React.Component {

    validate = this.props.validate;
    nextAction = this.props.nextAction;

    trigger = () => {
    
        // if ((this.props.step === 0) && ((this.props.validEmail === false) || (this.props.validEmail === null))) {
        //     this.validate();
        //     return
        // }

        if (this.validate() === false) {
            return
        } else {
            this.nextAction();
        }
    }

    render() {
        const { classes } = this.props;

        let text = "Next";
        if (this.props.step === 2) {
            text = "Finish";
        }

        if (this.props.isLoading) {
            return (
                <div style={{ textAlign: "center" }}>
                    <CircularProgress className={classes.progress} color="#f07c94" />
                </div>
            );
        } else {
            return (
                <div style={{ paddingTop: 25 }}>
                    <Fab onClick={this.trigger} style={{ width: "100%", fontSize: 19 }} variant="extended" color="primary" aria-label="Add">
                        {text} <ArrowForward />
                    </Fab>
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        step: state.getStarted.step,
        isLoading: state.getStarted.isLoading,
        validEmail: state.getStarted.validEmail
    }
}

NextButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps, null)(NextButton));