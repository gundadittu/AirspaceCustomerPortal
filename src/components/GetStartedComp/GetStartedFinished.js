import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col, Card } from 'antd';
import getStartedFinishedImage from "../../assets/images/get-started/get-started-finished.png"

class GetStartedFinishedComp extends React.Component {

    render() {
        return (
            <div>
                <Row type="flex" justify="space-around" align="middle">
                    <div style={{ paddingTop: "5%", textAlign: "center" }}>
                        <Col span={8}>
                        </Col>
                        <Col span={8}>
                            <Card
                                cover={<img alt="Request Photo" src={getStartedFinishedImage} />}
                                bordered={false}
                            />
                            <h1>CHEERS!</h1>
                        </Col>
                        <Col span={8}>
                        </Col>
                    </div>
                </Row>
                <Row align="middle">
                    <div style={{ textAlign: "center" }}>
                        <Col span={5}>
                        </Col>
                        <Col span={14}>
                            <h1 >You're on your way to a new office experience.</h1>
                            <h2 style={{color: "#A9A9A9"}}>Your experience manager will be reaching out soon.</h2>
                        </Col>
                        <Col span={5}>
                        </Col>
                    </div>
                </Row >
            </div>

        )
    }
}

export default withRouter(connect(null, null)(GetStartedFinishedComp));
