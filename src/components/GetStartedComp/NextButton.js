import React from 'react';
import Fab from '@material-ui/core/Fab';
import ArrowForward from '@material-ui/icons/ArrowForward';

const NextButton = (props) => {
    const validate = props.validate; 
    const nextAction = props.nextAction; 

    const trigger = () => { 
        if (validate() === false) { 
            return 
        } else { 
            nextAction();
        }
    }

    return (
        <div style={{ paddingTop: 25, paddingBottom: 25 }}>
            <Fab onClick={trigger} style={{ width: "100%", fontSize: 19 }} variant="extended" color="primary" aria-label="Add">
                NEXT < ArrowForward />
            </Fab>
        </div>
    )
}

export default NextButton; 