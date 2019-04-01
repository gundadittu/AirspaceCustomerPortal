import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// import * as actionCreator from '../../store/actions/officeAdmin';
import * as generalActionCreator from '../../store/actions/general';
import ServicePlanCard from './ServicePlanCard';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import { Row, Col, Menu, Empty, Button, Spin } from 'antd';

import * as pageTitles from '../../pages/pageTitles';
import getPagePayload from '../../pages/pageRoutingFunctions';
import { Link } from 'react-router-dom';
import emptyState from "../../assets/images/empty/empty-1.png";

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

    getBody(dataSource) {

        if (this.props.isLoadingServicePlan) {
            return (
                <div style={{ textAlign: "center" }} className="example">
                    <Spin />
                </div>
            )
        }else if ((dataSource != null) && (dataSource.length > 0)) {
            return (dataSource.map(x => (
                <Row>
                    <Col style={{ paddingLeft: "1%", paddingRight: "15%", paddingBottom: "30px" }} span={24}>
                        <ServicePlanCard servicePackage={x} />
                    </Col>
                </Row>)
            ))
        } else {
            let description = null; 
            if (this.state.dataSource === "active") {
                description = "All services you are currently subscribed to will show up here.";
            } else if (this.state.dataSource === "inactive") {
                description = "All services you previously subscribed to will show up here.";
            }
            
            return (
                <Empty
                    image={emptyState}
                    imageStyle={{
                        height: 400,
                    }}
                    description={
                        <span>
                            {description}
                        </span>
                    }
                >
                    <Link to={'/officeAdmin/' + this.props.currentOfficeAdminUID + "/find-services"}>
                        <Button type="primary">Find Services</Button>
                    </Link>
                </ Empty>
            )
        }
    }

    render() {
        const active = this.props.activeList || null;
        const inactive = this.props.inactiveList || null;


        let dataSource = null;
        if (this.state.dataSource === "active") {
            dataSource = active;
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
                                <IconButton className="inlineDisplay" onClick={() => this.props.getServicePlan(this.props.currentOfficeAdminUID)}>
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
                                        Current
                                    </Menu.Item>
                                    <Menu.Item key="inactive" >
                                        Past
                                    </Menu.Item>
                                </Menu>
                            </Row>
                        </Col>
                    </Row>
                    {this.getBody(dataSource)}
                </div>
            </Col>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentOfficeAdminUID: state.general.currentOfficeAdminUID,
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