import React from 'react';
import { Card, Button } from 'antd';

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
    const remaining = invoice.amount_remaining || null;
    const total = invoice.amount_due || null;
    const paid = invoice.amount_paid || null;
    const dueDate = invoice.due_date || null;

    return (
        <Card
            title={description}
            extra={<a target="_blank" href={invoiceURL}>See Full Invoice</a>}
            style={{ width: "100%" }}
        >
            <h3>Due Date: {dueDate}</h3>
            <h3>Outstanding Balance: ${remaining}</h3>
            <br></br>
            <p>Total: ${total}</p>
            <p>Paid: ${paid}</p>
            <Button className="inlineDisplay rightAlign" type="primary" onClick={() => openUrl(payURL)}>Pay</Button>
        </Card>
    );
}

export default invoiceCard; 