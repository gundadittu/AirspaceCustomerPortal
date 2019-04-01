import React from 'react';
import { Row, Col, Card, Button } from 'antd';

const openURL = (url) => { 
    return 
}

const servicePlanCard = (props) => {
    const servicePackage = props.servicePackage || null;
    if (servicePackage === null) {
        return null
    }
    const title = servicePackage["Title"];
    const deliveryInstructions = servicePackage["Delivery Instructions"];
    const price = servicePackage["Price"];
    const notes = servicePackage["Notes"];
    const schedule = servicePackage["Schedule"];
    const identifier = servicePackage["Record ID"];

    return (
        <Card
            title={title}
            extra={<p style={{ textAlign: "right" }}>ID: {identifier}</p>}
            style={{ width: "100%" }}
        >
            <Row>
                <Col span={8}>
                    <h4>Details:</h4>
                    {notes}
                </Col>
                <Col span={8}>
                    <h4>Schedule:</h4>
                    {schedule}
                </Col>
                <Col span={8}>
                    <h4>Price:</h4>
                    {"$" + price}
                </Col>
            </Row>
            <br />
            <h4>Delivery Instructions:</h4>
            {deliveryInstructions}
            <Button className="inlineDisplay rightAlign" type="primary" onClick={() => openURL()}>Get Help</Button>
        </Card>
    );
}

export default servicePlanCard; 