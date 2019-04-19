import React from 'react';
import { Row, Col, Card, Button, Tooltip, List } from 'antd';
import ServicePlanPendingAddOn from './ServicePlanPendingAddOn';
import ServicePlanPendingOption from './ServicePlanPendingOption';
const moment = require('moment');


const servicePlanPendingCard = (props) => {
    const servicePackage = props.pendingPackage || null;
    if (servicePackage === null) {
        return null
    }
    const title = servicePackage["Name"];
    const description = servicePackage["Description"];
    const identifier = servicePackage["Record ID"];
    const options = servicePackage["options"];
    const addOns = servicePackage["addOns"];

    return (
        <Card
            title={title}
            extra={<p style={{ textAlign: "right" }}>ID: {identifier}</p>}
            style={{ width: "100%" }}
        >
            <Row>
                <Col span={24}>
                    {/* <h4>Description:</h4> */}
                    {description}
                </Col>
            </Row>
            <br />
            {(options !== null) ?
                <br style={{ marginTop: 20, marginBottom: 20 }} />
                : null}

            {options !== null ?
                <Row>
                    <ServicePlanPendingOption options={options} />
                </Row>
                : null}

            {(options !== null && addOns !== null) ?
                <br style={{ marginTop: 20, marginBottom: 20 }} />
                : null}

            {addOns !== null ?
                <Row>
                    <ServicePlanPendingAddOn options={addOns} />
                </Row>
                : null}
            {/* <Tooltip title="Want to change some details? Something went wrong with the service? We can help you here.">
                <Button className="inlineDisplay rightAlign" type="primary" onClick={() => openURL()}>Get Help</Button>
            </Tooltip> */}
        </Card>
    );
}

export default servicePlanPendingCard; 