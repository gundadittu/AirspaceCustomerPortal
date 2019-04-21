import React from 'react';
import { Card, Button, Row, Col } from 'antd';
import { red } from '@material-ui/core/colors';
const moment = require('moment');

function openUrl(url) {
    if (url === null) {
        return
    }
    window.open(url, "_blank");
}

const invoiceCard = (props) => {
    const invoice = props.invoice || null;
    if (invoice === null) {
        return null
    }
    const description = invoice.description || "Invoice";
    const invoiceURL = invoice.invoice_pdf || null;
    const payURL = invoice.hosted_invoice_url || null;
    const remaining = invoice.amount_remaining || 0;
    const total = invoice.amount_due || 0;
    const paid = invoice.amount_paid || 0;
    const dueDateTimeStamp = invoice.due_date || null;
    const dueDateObj = new Date(dueDateTimeStamp * 1000).toString();
    const dueDate = moment(dueDateObj).calendar();
    const identifier = invoice.number || null;
    const createdTimestamp = invoice.created || null;
    const createdObj = new Date(createdTimestamp * 1000).toString();
    const created = moment(createdObj).calendar();

    return (
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
                    ${remaining}
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
                    <p><strong>Total Balance:</strong> ${total}</p>
                </Col>
                <Col span={8}>
                    <p><strong>Paid:</strong> ${paid}</p>
                </Col>
                <Col span={8}>
                </Col>
            </Row>
            <p><strong>Created at:</strong> {created}</p>
            {remaining !== 0 ?
                <Button className="inlineDisplay rightAlign" type="primary" onClick={() => openUrl(payURL)}>Pay</Button>
                : null}
        </Card>
    );
}

export default invoiceCard; 