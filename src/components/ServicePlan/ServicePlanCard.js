import React from 'react';
import { Row, Col, Card, Button, Tooltip, Collapse, Icon } from 'antd';
const moment = require('moment');

const servicePlanCard = (props) => {
    const Panel = Collapse.Panel;
    const customPanelStyle = {
        background: '#f7f7f7',
        borderRadius: 4,
        marginBottom: 15,
        border: 0,
        overflow: 'hidden',
    };

    const servicePackage = props.servicePackage || null;
    if (servicePackage === null) {
        return null
    }
    const title = servicePackage["Title"];
    const deliveryInstructions = servicePackage["Delivery Instructions"];
    // const buildingAccess = servicePackage["Building Access Details"];


    const startDateObj = servicePackage["Start Date"] || null;
    const startDate = (startDateObj !== null ? moment(startDateObj).calendar() : "TBD");
    const price = servicePackage["Price"];
    const notes = servicePackage["Notes"];
    const schedule = servicePackage["Schedule"];
    const identifier = servicePackage["Record ID"];

    return (
        <Collapse
            bordered={false}
            className="collapse-tab"
            // defaultActiveKey={['1']}
            expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
        >
            <Panel header={title} key="1" style={customPanelStyle}>
                <Card
                    title={title}
                    extra={<p style={{ textAlign: "right" }}>ID: {identifier}</p>}
                    style={{ width: "100%" }}
                >
                    <Row>
                        <Col span={7}>
                            <h4>Details:</h4>
                            {notes}
                        </Col>
                        <Col span={1} />
                        <Col span={7}>
                            <h4>Schedule:</h4>
                            {schedule}
                        </Col>
                        <Col span={1} />
                        <Col span={8}>
                            <h4>Price:</h4>
                            {price}
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col span={7}>
                            <h4>Start Date</h4>
                            {startDate}
                        </Col>
                        <Col span={1} />
                        {/* <Col span={8}>
                            <h4>Building Access Details:</h4>
                            {buildingAccess}
                        </Col> */}
                        <Col span={8}>
                            <h4>Delivery Instructions:</h4>
                            {deliveryInstructions}
                        </Col>
                    </Row>
                    {/* <Tooltip title="Want to change some details? Something went wrong with the service? We can help you here.">
                <Button className="inlineDisplay rightAlign" type="primary" onClick={() => openURL()}>Get Help</Button>
            </Tooltip> */}
                </Card>
            </ Panel>
        </Collapse>
    );
}

export default servicePlanCard; 