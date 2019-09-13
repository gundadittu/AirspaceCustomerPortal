import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// import * as actionCreator from '../../store/actions/officeAdmin';
import * as generalActionCreator from '../../store/actions/general';
import ServicePlanCard from './ServicePlanCard';
import ServicePlanPendingCard from './ServicePlanPendingCard';

import RefreshIcon from '@material-ui/icons/Refresh';
import { Row, Col, Menu, Empty, Button, Spin, Steps, Modal, Tooltip, Badge } from 'antd';

import * as pageTitles from '../../pages/pageTitles';
import getPagePayload from '../../pages/pageRoutingFunctions';
import { Link } from 'react-router-dom';
import emptyState from "../../assets/images/empty/empty-3.png";

import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
// import OfficeProfileModal from './OfficeProfileModal';

class ServicePlanPage extends React.Component {

    state = {
        dataSource: "active", // or "inactive" or "pending"
        visible: false,
        showSteps: false, 
    }

    handleClick(e) {
        var key = e.key;
        if ((key === 'active') || (key === 'inactive') || (key === 'pending')) {
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

            const updateLoadingStatus = !(this.props.activeList !== null || this.props.inactiveList !== null || this.props.pendingList !== null); 
            this.props.getServicePlan(selectedOfficeUID, updateLoadingStatus);
        }
    }

    getBody(dataSource) {
        if (this.props.isLoadingServicePlan) {
            return (
                <div style={{ textAlign: "center" }} className="example">
                    <Spin />
                </div>
            )
        } else if ((dataSource != null) && (dataSource.length > 0)) {

            if (this.state.dataSource === "pending") {

                return (
                    <div style={{ paddingLeft: "1%", paddingRight: "15%", paddingBottom: "30px" }}>
                        {dataSource.map(x => (
                            <div>
                                <Row>
                                    <Col span={24}>
                                        <ServicePlanPendingCard pendingPackage={x} />
                                    </Col>
                                </Row>
                            </div>
                        ))}
                    </div>
                )
            }

            return (dataSource.map(x => (
                <Row>
                    <Col style={{ paddingLeft: "1%", paddingRight: "15%" }} span={24}>
                        <ServicePlanCard servicePackage={x} />
                    </Col>
                </Row>)
            ))
        } else {
            let description = null;
            const title = "Nothing to show yet!";
            if (this.state.dataSource === "active") {
                description = "Once you subscribe to services, they will show up here.";
            } else if (this.state.dataSource === "inactive") {
                description = "All past and inactive services will show up here.";
            } else if (this.state.dataSource === "pending") {
                description = "All services that need your approval will appear here. Once accepted, they will show up in your current service plan.";
            }

            return (
                // <Empty
                //     image={emptyState}
                //     imagestyle={{
                //         height: 800,
                //     }}
                //     description={
                //         <span>
                //             {description}
                //         </span>
                //     }
                // />
                <div style={{ textAlign: "center", verticalAlign: "middle" }}>
                    <img style={{ maxWidth: 400 }} src={emptyState} />
                    <h2 style={{ marginTop: 30, fontWeight: 15 }}>{title} </h2>
                    <h3 style={{ marginTop: 30, fontWeight: 10, color: "#C0C0C0" }}>{description} </h3>
                </div>
            );
        }
    }

    // showOfficeProfile = () => {
    //     this.setState({ visible: true });
    // }

    // hideOfficeProfile = () => {
    //     this.setState({ visible: false });
    // }

    render() {
        const active = this.props.activeList || null;
        const inactive = this.props.inactiveList || null;
        const pending = this.props.pendingList || null;

        let dataSource = null;
        if (this.state.dataSource === "active") {
            dataSource = active;
        } else if (this.state.dataSource === "inactive") {
            dataSource = inactive;
        } else if (this.state.dataSource === "pending") {
            dataSource = pending;
        }

        const Step = Steps.Step;

        return (
            <div>
                {/* <OfficeProfileModal visible={this.state.visible} hideModal={this.hideOfficeProfile} /> */}
                <Col className="wide-table" span={24}>
                    <h1>Service Plan
                    {/* <Tooltip title="Your service plans helps you understand and manage your office's services.">
                            <IconButton className="inlineDisplay" style={{ marginBottom: 5 }}>
                                <InfoIcon />
                            </IconButton>
                        </Tooltip> */}
                    </h1>
                    <div>
                        <Row type="flex" style={{ paddingLeft: "1%", paddingRight: "15%" }}>
                            <Col span={12}>
                                <Row type="flex" style={{ height: 87 }} align="middle" justify="start">
                                    <IconButton className="inlineDisplay" onClick={() => this.props.getServicePlan(this.props.currentOfficeAdminUID, true)}>
                                        <RefreshIcon />
                                    </IconButton>
                                    <Menu
                                        className="inlineDisplay menu-tab"
                                        style={{ border: 0 }}
                                        onClick={this.handleClick.bind(this)}
                                        defaultSelectedKeys={[this.state.dataSource]}
                                        mode="horizontal"
                                    >
                                        <Menu.Item key="active">
                                            Current
                                    </Menu.Item>
                                        <Menu.Item key="pending" >
                                            Pending Approval
                                            <Badge dot offset={[0, 4]} count={this.props.badgeCount} />
                                        </Menu.Item>
                                        <Menu.Item key="inactive" >
                                            Past
                                    </Menu.Item>
                                    </Menu>
                                </Row>
                            </Col>
                            {/* <Col span={12}>
                                <Row type="flex" align="middle" justify="end">
                                    <Button className='inlineDisplay rightAlign' type="primary" onClick={this.showOfficeProfile}>View Office Profile</Button>
                                </Row>
                            </Col> */}
                        </Row>
                        {this.getBody(dataSource)}
                    </div>
                </Col>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        currentOfficeAdminUID: state.general.currentOfficeAdminUID,
        userAdminOfficeList: state.auth.adminOfficeList,
        isLoadingServicePlan: state.officeAdmin.isLoadingServicePlan,
        activeList: state.officeAdmin.activeServicePlan,
        inactiveList: state.officeAdmin.inactiveServicePlan,
        pendingList: state.officeAdmin.pendingServicePlan,
        badgeCount: state.officeAdmin.pendingServicePlanCount
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getServicePlan: (officeUID, updateLoadingStatus) => dispatch(generalActionCreator.getServicePlan({ selectedOfficeUID: officeUID, updateLoadingStatus: updateLoadingStatus })),
        changePage: (payload) => dispatch(generalActionCreator.changePage(payload)),
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ServicePlanPage));