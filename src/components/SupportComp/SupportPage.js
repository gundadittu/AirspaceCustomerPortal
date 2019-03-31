import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as pageTitles from '../../pages/pageTitles';
import getPagePayload from '../../pages/pageRoutingFunctions';
import * as generalActionCreator from '../../store/actions/general';

import { Row, Col, Collapse, Icon } from 'antd';
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
            <h2 style={{ paddingTop: "3%" }}>Delivery Issues</h2>
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
        <div style={{ paddingTop: "3%" }}>
            <h2>Billing Issues</h2>
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

    render() {
        return (
            <Col className="wide-table" span={24}>
                <h1>Support</h1>
                {this.delivery}
                {this.billing}
            </Col>
        );
    }

}

const mapStateToProps = state => {
    return {
        userAdminOfficeList: state.auth.adminOfficeList
    }
};

const mapDispatchToProps = dispatch => {
    return {
        changePage: (payload) => dispatch(generalActionCreator.changePage(payload)),
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SupportPage));