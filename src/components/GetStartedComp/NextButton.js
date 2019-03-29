import React from 'react';
import Fab from '@material-ui/core/Fab';
import ArrowForward from '@material-ui/icons/ArrowForward';
import { connect } from 'react-redux';


class NextButton extends React.Component {

    validate = this.props.validate;
    nextAction = this.props.nextAction;

    trigger = () => {
        this.nextAction();
        return
        if (this.validate() === false) {
            return
        } else {
            this.nextAction();
        }
    }

    render() {

        let text = "NEXT";
        if (this.props.step === 3) { 
            text = "FINISH";
        }

        return (
            <div style={{ paddingTop: 25 }}>
                <Fab onClick={this.trigger} style={{ width: "100%", fontSize: 19 }} variant="extended" color="primary" aria-label="Add">
                    {text} < ArrowForward />
                </Fab>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        step: state.getStarted.step
    }
}

export default connect(mapStateToProps, null)(NextButton)