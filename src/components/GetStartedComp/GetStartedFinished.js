import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col, Card } from 'antd';
import getStartedFinishedImage from "../../assets/images/get-started/get-started-finished.png"

class GetStartedFinishedComp extends React.Component {

    render() {
        return (
            <Row type="flex" justify="space-around" align="middle">
                <div style={{ paddingTop: "5%", textAlign: "center" }}>
                    <Col span={6}>
                    </Col>
                    <Col span={12}>
                        <Card
                            cover={<img alt="Request Photo" src={getStartedFinishedImage} />}
                            bordered={false}
                        />
                        <h1>CHEERS!</h1>
                        <h1>You're on your way to a new office experience.</h1>
                        <h3>Your experience manager will be reaching out soon to schedule your first service plan consultation. Be on the lookout for an email from hello@airspaceoffice.co.</h3>
                    </Col>
                    <Col span={6}>
                    </Col>
                </div>
            </Row>
        )
    }
}

export default withRouter(connect(null, null)(GetStartedFinishedComp));
