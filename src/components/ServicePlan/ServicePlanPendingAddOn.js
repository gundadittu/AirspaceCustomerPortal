import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as generalActionCreator from '../../store/actions/general';
import { Row, Col, Card, Button, Tooltip, List, Tag, message } from 'antd';
import AddIcon from '@material-ui/icons/AddCircle';
import RemoveIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';

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
        if (options.length === 0) {
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
                            extra = () => (<Tag style={{ marginLeft: 15 }} color="#FC588F" type="primary">Reccomended</Tag>);
                        }

                        let sideContent = () => null;
                        if (status === "Needs to be Added to Service Plan") {
                            sideContent = () => (<Button onClick={() => this.pending(identifier)} style={{ backgroundColor: "#F3F3F3", borderColor: "#F3F3F3", color: "#696969" }} type="primary">Remove Selection</Button>)
                        } else if (status === "Added to Service Plan") {
                            sideContent = () => (<Tag type="primary">Added to Service Plan</Tag>)
                        } else {
                            sideContent = () => (<Button onClick={() => this.accept(identifier)} ghost type="primary">Select</Button>)
                        }


                        return (
                            <div>
                                <List.Item>
                                    <Card
                                        title={(<h3>{title}</h3>)}
                                        extra={sideContent()}
                                    // actions={[(<Button onClick={() => this.pending(identifier)} type="secondary">Unselect</Button>)]}
                                    >
                                        <Row>
                                            <Col span={16}>
                                                <h4>Description: {extra()}</h4>
                                                <p>{description}</p>
                                                <p style={{ marginTop: 10, fontSize: 13, color: "#D3D3D3" }}>ID: {identifier}</p>
                                            </Col>
                                            <Col span={2}>
                                            </Col>
                                            <Col span={6}>
                                                <h4>Pricing:</h4>
                                                <p>{pricing}</p>
                                            </Col>
                                        </Row>
                                        {/* <br />
                                        <Row>
                                            <Col span={24}>
                                                <h4>Pricing:</h4>
                                                {pricing}
                                            </Col>
                                        </Row> */}
                                    </Card>
                                </List.Item>
                            </div>)

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

