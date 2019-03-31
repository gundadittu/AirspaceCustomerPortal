import React from 'react';
import { Card } from 'antd';

const servicePlanCard = (props) => {
    const servicePackage = props.servicePackage || null;
    if (servicePackage === null) {
        return null
    }
 

    return (
        <Card
            title={"TITLE"}
            extra={"EXTRA"}
            style={{ width: "100%" }}
        >
        </Card>
    );
}

export default servicePlanCard; 