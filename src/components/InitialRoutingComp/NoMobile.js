
import React from 'react';
import ErrorImage from "../../assets/images/no-mobile.png";
import LoginNavBar from "../Login/LoginNavBar";

const NoMobilePage = (props) => {
    return (
        <div style={{ textAlign: "center" }}>
            <LoginNavBar />
            <img style={{ width: "80%" }} src={ErrorImage} />
            <h2>Please visit portal on desktop.</h2>
        </div>

    )
}

export default NoMobilePage; 