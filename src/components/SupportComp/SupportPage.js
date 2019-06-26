import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as pageTitles from '../../pages/pageTitles';
import getPagePayload from '../../pages/pageRoutingFunctions';
import * as generalActionCreator from '../../store/actions/general';
import { Link } from 'react-router-dom';
import { Row, Col, Collapse, Icon, Menu, Button } from 'antd';
import GetHelpForm from './GetHelpForm';
const Panel = Collapse.Panel;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const customPanelStyle = {
    background: '#f7f7f7',
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
    overflow: 'hidden',
    fontWeight: 'bold'
};

class SupportPage extends React.Component {

    state = {
        dataSource: "services",
        getHelpVisible: false
    }

    showHelp() {
        this.setState({ getHelpVisible: true });
    }

    hideHelp() {
        // clear fields 
        this.setState({ getHelpVisible: false });
    }

    componentDidMount() {
        if (this.props.match.isExact) {
            const selectedOfficeUID = this.props.match.params.officeUID;

            const list = this.props.userAdminOfficeList;
            let officeObj = null;
            for (let key in list) {
                const value = list[key];

                if (value.uid === selectedOfficeUID) {
                    officeObj = value;
                }
            }

            const pagePayload = getPagePayload(pageTitles.homePageOfficeAdmin, { officeUID: selectedOfficeUID, officeObj: officeObj });
            if (pagePayload) {
                this.props.changePage(pagePayload);
            }
            const secondPagePayload = getPagePayload(pageTitles.supportPageOfficeAdmin);
            if (secondPagePayload) {
                this.props.changePage(secondPagePayload);
            }
        }
    }

    services() {

        return (
            <div>
                <Collapse
                    bordered={false}
                    defaultActiveKey={[]}
                    expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
                >
                    <Panel header="How do I request services/products?" key="1" style={customPanelStyle}>
                        <p>
                            There are two ways to request services. <br /><br />
                            1. You can request through the Portal under the “Find Services” tab. Simply click “Request” under the service or product category and answer a few simple questions.<br /> <br />
                            2. Contact your Experience Manager and request services directly from them. You can live chat, email, or call your Experience Manager - their contact information can be found under the “Experience Manager” tab.
                        </p>
                    </Panel>
                    <Panel header="When will I receive my products/services?" key="2" style={customPanelStyle}>
                        <p>
                            Depending on the service/product and scope, delivery times can vary from same day to a few weeks.<br /><br />
                            Experience Manager Subscribed Offices: <br />
                            If you believe you have not received a service/product you requested in a timely manner, let your Experience Manager know and they will make sure the issue is resolved.<br /><br />
                            Non-Experience Manager Subscribed Offices:<br />
                            Contact the vendor directly to resolve any potential issues.
                        </p>
                    </Panel>
                    <Panel header="How do I cancel a service?" key="3" style={customPanelStyle}>
                        <p>
                            For most services and products you can cancel with 30-day notice by emailing hello@airspaceoffice.co. Certain services, like furniture rental, have alternative cancellation policies which can be found in your service contract.
                        </p>
                    </Panel>
                    <Panel header="I had an issue with the service/product, how do I resolve this?" key="4" style={customPanelStyle}>
                        <p>
                            Depending on the service/product and scope, delivery times can vary from same day to a few weeks.<br /><br />
                            Experience Manager Subscribed Offices: <br />
                            Contact the vendor directly to resolve any issues. If you do not hear back from the vendor in a timely manner or if the issue is not resolved satisfactorily, forward the email/communications to hello@airspaceoffice.co.                    </p>
                    </Panel>
                    <Panel header="I have an Experience Manager, can I just resolve my issue with the vendor directly?" key="5" style={customPanelStyle}>
                        <p>
                            We encourage you to rely on your Experience Managers to resolve issues for your office. If you have an issue with your Experience Manager, please contact hello@airspaceoffice.co.
                       </p>
                    </Panel>
                    <Panel header="Are you and/or your vendors insured?" key="6" style={customPanelStyle}>
                        <p>
                            Airspace and all its vendors and service partners are vetted and insured. To request a Certificate of Insurance, email us at hello@airspaceoffice.com with the subject line “Certificate of Insurance.”
                        </p>
                    </Panel>
                </Collapse>
            </div>
        );
    }

    billing() {
        return (
            <div style={{ paddingTop: "0%" }}>
                <Collapse
                    bordered={false}
                    defaultActiveKey={[]}
                    expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
                >
                    <Panel header="What is included with my Invoice?" key="1" style={customPanelStyle}>
                        <p>
                            Your invoice is a consolidated monthly bill that includes all the services, products, and subscriptions across any and all service categories.
                        </p>
                    </Panel>
                    <Panel header="What methods of payment do you accept?" key="2" style={customPanelStyle}>
                        <p>
                            We accept ACH, Checks, and Credit Cards. Depending on your state, there might be a convenience fee associated with Credit Card transactions. ACH and Checks are free of any fees.
                            Checks can be made out to Airspace Solutions LLC. If you are subscribed to an Experience Manager, you can have them pick up the check during one of their check-ins.
                        </p>
                    </Panel>
                    <Panel header="How long do I have to pay my invoice?" key="3" style={customPanelStyle}>
                        <p>
                            You have 30 days from the issuance of the invoice to pay. Late payments may incur fees.
                        </p>
                    </Panel>
                    <Panel header="My invoice isn’t correct. How do I get it fixed?" key="4" style={customPanelStyle}>
                        <p>
                            If your invoice has a mistake, let your Experience Manager know or email us at hello@airspaceoffice.co
                        </p>
                    </Panel>
                    <Panel header="How do I know I am getting competitive prices on services and products?" key="5" style={customPanelStyle}>
                        <p>
                            You can request to view supplier billings for 30 days from the issuance of your monthly invoice. These prices may not be shared, distributed, or discussed outside of your organization.
                        </p>
                    </Panel>
                    <Panel header="How do I know I am getting competitive prices on services and products?" key="6" style={customPanelStyle}>
                        <p>
                            You can request to view supplier billings for 30 days from the issuance of your monthly invoice. These prices may not be shared, distributed, or discussed outside of your organization.
                        </p>
                    </Panel>
                </Collapse>
            </div>
        );
    }

    expManager() {
        return (
            <div style={{ paddingTop: "0%" }}>
                <Collapse
                    bordered={false}
                    defaultActiveKey={[]}
                    expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
                >
                    <Panel header="What is an Experience Manager?" key="1" style={customPanelStyle}>
                        <p>
                            An Experience Manager is a shared office assistant that supports your office operations. They assist with: <br /><br />
                            <ul>
                                <li>Service Set Up (schedule walkthroughs, coordinate logistics, etc.)</li>
                                <li>Inventory and Ordering (supplies, snacks, drinks and more)</li>
                                <li>Weekly Quality Assurance Visits</li>
                                <li>Events and Catering (cold brew Tuesday, happy hours, etc.) </li>
                                <li>Project Management (office move, repairs, etc.) </li>
                                <li>Vendor Management</li>
                            </ul>
                        </p>
                    </Panel>
                    <Panel header="How much is an Experience Manager?" key="2" style={customPanelStyle}>
                        <p>
                            Please see our website for our most current pricing information. For enterprise tenants, please contact us for custom solutions.
                        </p>
                    </Panel>
                </Collapse>
            </div>
        );
    }

    other() {
        return (
            <div style={{ paddingTop: "0%" }}>
                <Collapse
                    bordered={false}
                    defaultActiveKey={[]}
                    expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
                >
                    <Panel header="What is the Airspace Guarantee?" key="1" style={customPanelStyle}>
                        <p>
                            Airspace guarantees that we will never sell a product or service for more than its direct equivalent, or what you would pay had you contracted directly with the vendor. No upcharges. No hidden fees. If you want to know more about our pricing, please contact us at hello@airspaceoffice.co.
                        </p>
                    </Panel>
                    <Panel header="How do I report suspicious activity with vendors?" key="2" style={customPanelStyle}>
                        <p>
                            Report any and all suspicious activity to us at hello@airpaceoffice.co. In an emergency, dial 911 or your local emergency number immediately.
                        </p>
                    </Panel>
                </Collapse>
            </div>
        );
    }

    handleClick(e) {
        var key = e.key;
        this.setState({ dataSource: key });
    }

    render() {
        const body = () => {
            if (this.state.dataSource === "services") {
                return this.services();
            } else if (this.state.dataSource === "billing") {
                return this.billing();
            } else if (this.state.dataSource === "expManager") {
                return this.expManager();
            } else if (this.state.dataSource === "other") {
                return this.other();
            }
            return (null);
        }

        return (
            <div>
                <GetHelpForm visible={this.state.getHelpVisible} onCancel={this.hideHelp.bind(this)} />
                <Col className="wide-table" span={24}>
                    <h1>Help Center</h1>

                    <div>
                        <Row type="flex">
                            <Col span={12}>
                                <Row type="flex" style={{ height: 87 }} align="middle" justify="start">
                                    <Menu
                                        className="inlineDisplay menu-tab"
                                        style={{ border: 0 }}
                                        onClick={this.handleClick.bind(this)}
                                        defaultSelectedKeys={[this.state.dataSource]}
                                        mode="horizontal"
                                    >
                                        <Menu.Item key="services">
                                            Services
                                    </Menu.Item>
                                        <Menu.Item key="billing">
                                            Billing
                                    </Menu.Item>
                                        <Menu.Item key="expManager">
                                            Experience Manager
                                    </Menu.Item>
                                        <Menu.Item key="other">
                                            Other
                                    </Menu.Item>
                                    </Menu>
                                </Row>
                            </Col>
                            <Col span={12}>
                                <Row type="flex" align="middle" justify="end">
                                    <Button className='inlineDisplay rightAlign' type="primary" onClick={this.showHelp.bind(this)}>Submit Ticket</Button>
                                </Row>
                            </Col>
                        </Row>
                        {body()}
                    </div>
                </Col>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        userAdminOfficeList: state.auth.adminOfficeList,
        currentOfficeAdminUID: state.general.currentOfficeAdminUID
    }
};

const mapDispatchToProps = dispatch => {
    return {
        changePage: (payload) => dispatch(generalActionCreator.changePage(payload)),
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SupportPage));