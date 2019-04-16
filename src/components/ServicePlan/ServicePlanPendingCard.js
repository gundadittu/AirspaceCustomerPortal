import React from 'react';
import { Row, Col, Card, Button, Tooltip, List } from 'antd';
const moment = require('moment');

const ServicePlanPendingOption = (props) => {
    const options = props.options || null;
    if (options === null) {
        return null
    }

    return (
        <div>
            <h3>Choose options:</h3>
            <List
                grid={{
                    gutter: 16, xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 2,
                }}
                dataSource={options}
                renderItem={item => (
                    <List.Item>
                        <Card
                            title={item["Name"]}
                            // extra={<p style={{ textAlign: "right" }}>ID: {item["Record ID"]}</p>}
                            actions={[(<Button type="primary">Select</Button>)]}
                        >
                            <Row>
                                <Col span={24}>
                                    <h4>Description:</h4>
                                    {item["Description"]}
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <h4>Pricing:</h4>
                                    {item["Pricing Details"]}
                                </Col>
                            </Row>
                        </Card>
                    </List.Item>
                )}
            />
        </div>

    )
}

const ServicePlanPendingAddOn = (props) => {
    const options = props.options || null;
    if (options === null) {
        return null
    }

    return (
        <div>
            <h3>Choose add-ons:</h3>
            <List
                grid={{
                    gutter: 16, xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 2,
                }}
                dataSource={options}
                renderItem={item => (
                    <div>
                        <List.Item>
                            <Card
                                title={item["Name"]}
                                // extra={<p style={{ textAlign: "right" }}>ID: {item["Record ID"]}</p>}
                                actions={[(<Button type="primary">Select</Button>)]}
                            >
                                <Row>
                                    <Col span={24}>
                                        <h4>Description:</h4>
                                        {item["Description"]}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <h4>Pricing:</h4>
                                        {item["Pricing Details"]}
                                    </Col>
                                </Row>
                            </Card>
                        </List.Item>
                    </div>

                )}
            />
        </div>

    )
}

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