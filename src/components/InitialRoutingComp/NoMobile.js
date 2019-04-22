
import React from 'react';
import ErrorImage from "../../assets/images/no-mobile.png";

const NoMobilePage = (props) => {
    return (
        <div style={{ textAlign: "center" }}>
            <img style={{ width: "80%" }} src={ErrorImage} />
            <h2>Please visit portal on desktop.</h2>
        </div>

    )
}

export default NoMobilePage; 