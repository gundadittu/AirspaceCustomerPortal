import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, Statistic, Icon } from 'antd';
import '../../App.css';
import FeaturedAdminFeed from './featuredAdminFeed';
import * as generalActionCreator from '../../store/actions/general';
import * as officeAdminActionCreator from '../../store/actions/officeAdmin';
import { withRouter } from 'react-router-dom';
import * as pageTitles from '../../pages/pageTitles';
import getPagePayload from '../../pages/pageRoutingFunctions';

class HomeAdminPage extends React.Component {

    componentDidMount() {
        if (this.props.match.isExact) {
            const officeUID = this.props.match.params.officeUID;
            if (officeUID === null) {
                return
            }

            let officeObj = null;
            const allAdminOffices = this.props.allAdminOffices || null;
            if (allAdminOffices === null) {
                return
            }

            for (let key in allAdminOffices) {
                const value = allAdminOffices[key];
                if (value.uid === officeUID) {
                    officeObj = value;
                    break;
                }
            }

            if (officeObj === null) {
                return
            }

            const pagePayload = getPagePayload(pageTitles.homePageOfficeAdmin, { officeUID: officeUID, officeObj: officeObj });
            if (pagePayload) {
                this.props.changePage(pagePayload);
            }

            this.props.getServicePlan(officeUID);
            this.props.loadEMInfo({ selectedOfficeUID: officeUID });
            this.props.getServicePlan(officeUID);
            this.props.loadInvoices(officeUID);
            this.props.loadUserList(officeUID);
            this.props.loadOfficeReport({ selectedOfficeUID: officeUID });
        }
    }

    render() {
        return (
            <div className="wide-table">
                <Row style={{ paddingTop: "2%" }}>
                    <Col span={24}>
                        <h1>Welcome, {this.props.user.firstName}</h1>
                        <h4>Currently managing {this.props.currentOfficeAdmin.name}</h4>
                    </Col>
                </Row>
                <Row style={{ paddingTop: "2%" }}>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                title="Pending Packages"
                                value={this.props.pendingServiceList.length}
                                precision={0}
                                valueStyle={this.props.pendingServiceList.length === 0 ? { color: '#3f8600' } : { color: '#cf1322' }}
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                title="Outstanding Bills"
                                value={this.props.outstandingInvoiceList.length}
                                precision={0}
                                valueStyle={this.props.pendingServiceList.length === 0 ? { color: '#3f8600' } : { color: '#cf1322' }}
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                title="Active Services"
                                value={this.props.activeServiceList.length}
                                precision={0}
                                valueStyle={this.props.activeServiceList.length > 0 ? { color: '#3f8600' } : { color: '#cf1322' }}
                            />
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <FeaturedAdminFeed />
                </Row>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        currentOfficeAdmin: state.general.currentOfficeAdmin,
        allAdminOffices: state.auth.adminOfficeList,
        user: state.auth.user,
        activeServiceList: state.officeAdmin.activeServicePlan,
        pendingServiceList: state.officeAdmin.pendingServicePlan,
        outstandingInvoiceList: state.officeAdmin.outstandingInvoiceData
    }
};

const mapDispatchToProps = dispatch => {
    return {
        changePage: (payload) => dispatch(generalActionCreator.changePage(payload)),
        loadEMInfo: (payload) => dispatch(generalActionCreator.getEMInfo(payload)),
        getServicePlan: (officeUID) => dispatch(generalActionCreator.getServicePlan({ selectedOfficeUID: officeUID })),
        loadInvoices: (officeUID) => dispatch(generalActionCreator.getAllInvoices({ selectedOfficeUID: officeUID })),
        loadUserList: (officeUID) => dispatch(officeAdminActionCreator.loadOfficeUsers(officeUID)),
        loadOfficeReport: (payload) => dispatch(generalActionCreator.getOfficeReport(payload)),
        getServicePlan: (officeUID) => dispatch(generalActionCreator.getServicePlan({ selectedOfficeUID: officeUID }))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeAdminPage));
