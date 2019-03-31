import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// import * as actionCreator from '../../store/actions/officeAdmin';
import * as generalActionCreator from '../../store/actions/general';
import ServicePlanCard from './ServicePlanCard';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import { Row, Col, Menu } from 'antd';

import * as pageTitles from '../../pages/pageTitles';
import getPagePayload from '../../pages/pageRoutingFunctions';

class ServicePlanPage extends React.Component {

    state = {
        dataSource: "active" // or "inactive"
    }

    handleClick(e) {
        var key = e.key;
        if ((key === 'active') || (key === 'inactive')) {
            this.setState({ dataSource: key });
        }
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
            const secondPagePayload = getPagePayload(pageTitles.servicePlanPageOfficeAdmin);
            if (secondPagePayload) {
                this.props.changePage(secondPagePayload);
            }

            this.props.getServicePlan(selectedOfficeUID);
        }
    }

    render() {
        const active = this.props.activeList || null;
        const inactive = this.props.inactiveList || null;


        let dataSource = null;
        if (this.state.dataSource === "active") {
            dataSource = active
        } else if (this.state.dataSource === "inactive") {
            dataSource = inactive;
        }

        return (
            <Col className="wide-table" span={24}>
                <h1>Service Plan</h1>
                <div>
                    <Row type="flex">
                        <Col span={12}>
                            <Row type="flex" style={{ height: 87 }} align="middle" justify="start">
                                <IconButton className="inlineDisplay" onClick={() => this.props.loadInvoices(this.props.currentOfficeAdminUID)}>
                                    <RefreshIcon />
                                </IconButton>
                                <Menu
                                    className="inlineDisplay"
                                    style={{ border: 0 }}
                                    onClick={this.handleClick.bind(this)}
                                    defaultSelectedKeys={[this.state.dataSource]}
                                    mode="horizontal"
                                >
                                    <Menu.Item key="active">
                                        Active
                                    </Menu.Item>
                                    <Menu.Item key="inactive" >
                                        Inactive
                                    </Menu.Item>
                                </Menu>
                            </Row>
                        </Col>
                    </Row>
                    {dataSource != null ?
                        (dataSource.map(x => (
                            <Row>
                                <Col style={{ paddingLeft: "1%", paddingRight: "15%", paddingBottom: "30px" }} span={24}>
                                    <ServicePlanCard servicePackage={x} />
                                </Col>
                            </Row>)
                        ))
                        : null}
                </div>
            </Col>
        );
    }
}

const mapStateToProps = state => {
    return {
        userAdminOfficeList: state.auth.adminOfficeList,
        isLoadingServicePlan: state.officeAdmin.isLoadingServicePlan,
        activeList: state.officeAdmin.activeServicePlan,
        inactiveList: state.officeAdmin.inactiveServicePlan
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getServicePlan: (officeUID) => dispatch(generalActionCreator.getServicePlan({ selectedOfficeUID: officeUID })),
        changePage: (payload) => dispatch(generalActionCreator.changePage(payload)),
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ServicePlanPage));