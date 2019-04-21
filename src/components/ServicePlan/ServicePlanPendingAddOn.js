import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col, Card, Button, Tooltip, List, Tag, message } from 'antd';
import * as generalActionCreator from '../../store/actions/general';

class ServicePlanPendingAddOn extends React.Component {

    accept(record) {

        if ((this.props.currentOfficeAdminUID === null) || (record === null)) {
            return
        }

        message.success('Selected service add-on.');

        const payload = {
            selectedOfficeUID: this.props.currentOfficeAdminUID,
            recordID: record
        };

        this.props.acceptServiceOption(payload);
    }

    pending(record) {

        if ((this.props.currentOfficeAdminUID === null) || (record === null)) {
            return
        }
        message.error('Removed this service add-on.');

        const payload = {
            selectedOfficeUID: this.props.currentOfficeAdminUID,
            recordID: record
        };

        this.props.pendingServiceOption(payload);
    }

    render() {
        const options = this.props.options || null;
        if (options === null) {
            return null
        }

        // check if option is "Needs to be Added to Service Plan" or "Added to Service Plan" -> highlighted
        // click on select button should change status to "Needs to be Added to Service Plan" or back to "Pending" if they unselect

        return (
            <div>
                <h3>Choose add-ons:</h3>
                <List
                    grid={{
                        gutter: 16, xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 2,
                    }}
                    dataSource={options}
                    renderItem={item => {
                        const status = item["Status"] || null;
                        const description = item["Description"] || null;
                        const pricing = item["Pricing Details"] || null;
                        const identifier = item["Record ID"] || null;
                        const title = item["Name"] || null;
                        const reccomended = item["Reccomended"] === "Yes" ? true : false;

                        let extra = () => { return null };
                        if (reccomended === true) {
                            extra = () => (<Tag color="#FC588F" type="primary">Reccomended</Tag>);
                        }


                        if (status === "Needs to be Added to Service Plan") {
                            return (
                                <div>
                                    <List.Item>
                                        <Card
                                            title={title}
                                            extra={(<Button onClick={() => this.pending(identifier)} type="secondary">Unselect</Button>)}
                                        // actions={[(<Button onClick={() => this.pending(identifier)} type="secondary">Unselect</Button>)]}
                                        >
                                            <Row>
                                                <Col span={24}>
                                                    <h4>Description:</h4>
                                                    {description}
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={24}>
                                                    {extra()}
                                                </Col>
                                            </Row>

                                            <br />
                                            <Row>
                                                <Col span={24}>
                                                    <h4>Pricing:</h4>
                                                    {pricing}
                                                </Col>
                                            </Row>
                                        </Card>
                                    </List.Item>
                                </div>)
                        } else if (status === "Added to Service Plan") {
                            return (
                                <div>
                                    <List.Item>
                                        <Card
                                            title={title}
                                            extra={<Tag type="primary">Added to Service Plan</Tag>}
                                        // actions={[(<Button type="primary" disabled>Added to Service Plan</Button>)]}
                                        >
                                            <Row>
                                                <Col span={24}>
                                                    <h4>Description:</h4>
                                                    {description}
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={24}>
                                                    {extra()}
                                                </Col>
                                            </Row>
                                            <br />
                                            <Row>
                                                <Col span={24}>
                                                    <h4>Pricing:</h4>
                                                    {pricing}
                                                </Col>
                                            </Row>
                                        </Card>
                                    </List.Item>
                                </div>
                            )
                        } else {

                            return (
                                <div>
                                    <List.Item>
                                        <Card
                                            title={title}
                                            extra={(<Button onClick={() => this.accept(identifier)} type="primary">Select</Button>)}
                                        // actions={[(<Button onClick={() => this.accept(identifier)} type="primary">Select</Button>)]}
                                        >
                                            <Row>
                                                <Col span={24}>
                                                    <h4>Description:</h4>
                                                    {description}
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={24}>
                                                    {extra()}
                                                </Col>
                                            </Row>
                                            <br />
                                            <Row>
                                                <Col span={24}>
                                                    <h4>Pricing:</h4>
                                                    {pricing}
                                                </Col>
                                            </Row>
                                        </Card>
                                    </List.Item>
                                </div>
                            )
                        }
                    }}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentOfficeAdminUID: state.general.currentOfficeAdminUID
    }
};

const mapDispatchToProps = dispatch => {
    return {
        acceptServiceOption: (payload) => dispatch(generalActionCreator.acceptServiceOption(payload)),
        pendingServiceOption: (payload) => dispatch(generalActionCreator.pendingServiceOption(payload))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ServicePlanPendingAddOn));

