import React from 'react';
import { Card, Button, Row, Col, Collapse, Icon } from 'antd';
import { red } from '@material-ui/core/colors';
const moment = require('moment');

function openUrl(url) {
    if (url === null) {
        return
    }
    window.open(url, "_blank");
}

function convertToDollarString(amount) {
    if (amount === null) {
        return "Not available"
    }
    const dollarAmt = "$" + Math.floor(amount / 100);
    const cents = () => {
        const centsAmt = amount % 100;
        if (centsAmt === 0) {
            return "00";
        } else if (centsAmt < 10) {
            return "0" + centsAmt;
        } else {
            return "" + centsAmt;
        }
    }
    return dollarAmt+"."+cents();
}

const invoiceCard = (props) => {

    const Panel = Collapse.Panel;
    const customPanelStyle = {
        background: '#f7f7f7',
        borderRadius: 4,
        marginBottom: 15,
        border: 0,
        overflow: 'hidden',
    };

    const invoice = props.invoice || null;
    if (invoice === null) {
        return null
    }
    const description = invoice.description || "Invoice";
    const invoiceURL = invoice.invoice_pdf || null;
    const payURL = invoice.hosted_invoice_url || null;

    const remaining = convertToDollarString(invoice.amount_remaining)|| convertToDollarString(0);
    const total = convertToDollarString(invoice.amount_due) || convertToDollarString(0);
    const paid = convertToDollarString(invoice.amount_paid) || convertToDollarString(0);

    const dueDateTimeStamp = invoice.due_date || null;
    const dueDateObj = new Date(dueDateTimeStamp * 1000).toString();
    const dueDate = moment(dueDateObj).calendar();
    const identifier = invoice.number || null;
    const createdTimestamp = invoice.created || null;
    const createdObj = new Date(createdTimestamp * 1000).toString();
    const created = moment(createdObj).calendar();

    return (
        <Collapse
            bordered={false}
            className="collapse-tab"
            // defaultActiveKey={['1']}
            expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
        >
            <Panel header={description} key="1" style={customPanelStyle}>
                <Card
                    title={description}
                    extra={<p style={{ textAlign: "right" }}>ID: {identifier}</p>}
                    style={{ width: "100%" }}
                >
                    <Row>
                        <Col span={8}>
                            <h3>Due Date:</h3>
                            {dueDate}
                        </Col>
                        <Col span={8}>
                            <h3>Outstanding Balance:</h3>
                            {remaining}
                        </Col>
                        <Col span={8}>
                            <div style={{ textAlign: "end" }}>
                                <a target="_blank" href={invoiceURL}>Download Invoice</a>
                            </div>
                        </Col>
                    </Row>
                    <br />
                    <Row >
                        <Col span={8}>
                            <p><strong>Total Balance:</strong> {total}</p>
                        </Col>
                        <Col span={8}>
                            <p><strong>Paid:</strong> {paid}</p>
                        </Col>
                        <Col span={8}>
                        </Col>
                    </Row>
                    <p><strong>Created at:</strong> {created}</p>
                    {remaining !== 0 ?
                        <Button className="inlineDisplay rightAlign" type="primary" onClick={() => openUrl(payURL)}>Pay</Button>
                        : null}
                </Card>
            </ Panel>
        </Collapse>
    );
}

export default invoiceCard; 