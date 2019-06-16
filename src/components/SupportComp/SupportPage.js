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
};

class SupportPage extends React.Component {

    state = {
        dataSource: "delivery",
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

    delivery = (
        <div>
            {/* <h2 style={{ paddingTop: "3%" }}>Delivery Issues</h2> */}
            <Collapse
                bordered={false}
                defaultActiveKey={[]}
                expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
            >
                <Panel header="This is panel header 1" key="1" style={customPanelStyle}>
                    <p>{text}</p>
                </Panel>
                <Panel header="This is panel header 2" key="2" style={customPanelStyle}>
                    <p>{text}</p>
                </Panel>
                <Panel header="This is panel header 3" key="3" style={customPanelStyle}>
                    <p>{text}</p>
                </Panel>
            </Collapse>
        </div>
    );


    billing = (
        <div style={{ paddingTop: "0%" }}>
            <Collapse
                bordered={false}
                defaultActiveKey={[]}
                expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
            >
                <Panel header="This is panel header 1" key="1" style={customPanelStyle}>
                    <p>{text}</p>
                </Panel>
                <Panel header="This is panel header 2" key="2" style={customPanelStyle}>
                    <p>{text}</p>
                </Panel>
                <Panel header="This is panel header 3" key="3" style={customPanelStyle}>
                    <p>{text}</p>
                </Panel>
            </Collapse>
        </div>
    );

    handleClick(e) {
        var key = e.key;
        this.setState({ dataSource: key });
    }

    render() {
        let body = null;
        body = this.delivery;

        return (
            <div>
                <GetHelpForm visible={this.state.getHelpVisible} onCancel={this.hideHelp.bind(this)} />
                <Col className="wide-table" span={24}>
                    <h1>Support</h1>

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
                                        <Menu.Item key="delivery">
                                            Delivery
                                    </Menu.Item>
                                        <Menu.Item key="billing">
                                            Billing
                                    </Menu.Item>
                                        <Menu.Item key="exp-manager">
                                            Experience Manager
                                    </Menu.Item>
                                    </Menu>
                                </Row>
                            </Col>
                            <Col span={12}>
                                <Row type="flex" align="middle" justify="end">
                                    <Button className='inlineDisplay rightAlign' type="primary" onClick={this.showHelp.bind(this)}>Get Help</Button>
                                </Row>
                            </Col>
                        </Row>
                        {body}
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