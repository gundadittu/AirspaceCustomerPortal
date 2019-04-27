import React from 'react';
import { connect } from 'react-redux';

// import * as actionCreator from '../../store/actions/officeAdmin';
import * as generalActionCreator from '../../store/actions/general';
// import * as officeActionCreator from '../../store/actions/officeAdmin';
import InvoiceCard from './InvoiceCard';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import { withRouter } from 'react-router-dom';
import { Row, Col, Menu, Empty, Button, Spin } from 'antd';

import * as pageTitles from '../../pages/pageTitles';
import getPagePayload from '../../pages/pageRoutingFunctions';

import { Link } from 'react-router-dom';
import emptyState from "../../assets/images/empty/empty-2.png";

class BillingPage extends React.Component {

    state = {
        dataSource: "outstanding" // or "paid"
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
            const secondPagePayload = getPagePayload(pageTitles.billingPageOfficeAdmin);
            if (secondPagePayload) {
                this.props.changePage(secondPagePayload);
            }
            this.props.loadInvoices(selectedOfficeUID);
        }
    }

    handleClick(e) {
        var key = e.key;
        if ((key === 'outstanding') || (key === 'paid')) {
            this.setState({ dataSource: key });
        }
    }

    getBody(dataSource) {
        if (this.props.isLoadingInvoices) {
            return (
                <div style={{ textAlign: "center" }} className="example">
                    <Spin />
                </div>
            )
        } else if ((dataSource != null) && (dataSource.length > 0)) {
            return (dataSource.map(x => (
                <Row>
                    <Col style={{ paddingLeft: "1%", paddingRight: "15%", paddingBottom: "30px" }} span={24}>
                        <InvoiceCard invoice={x} />
                    </Col>
                </Row>)
            ))
        } else {
            let description = null;
            const title = "Nothing to show yet!"
            if (this.state.dataSource === "paid") {
                description = "You can find a history of invoices here that have been paid off.";
            } else if (this.state.dataSource === "outstanding") {
                description = "All invoices with an outstanding balance will show up here.";
            }

            return (
                // <Empty
                //     image={emptyState}
                //     imagestyle={{
                //         height: 400,
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
            )
        }
    }

    render() {

        // const allInvoices = this.props.invoiceData || null;
        const paidInvoices = this.props.paidInvoiceData || null;
        const outInvoices = this.props.outstandingInvoiceData || null;

        let dataSource = null;
        if (this.state.dataSource === "paid") {
            dataSource = paidInvoices;
        } else if (this.state.dataSource === "outstanding") {
            dataSource = outInvoices;
        }

        return (
            <Col className="wide-table" span={24}>
                <h1>Billing</h1>
                <div>
                    <Row type="flex">
                        <Col span={12}>
                            <Row type="flex" style={{ height: 87 }} align="middle" justify="start">
                                <IconButton className="inlineDisplay" onClick={() => this.props.loadInvoices(this.props.currentOfficeAdminUID)}>
                                    <RefreshIcon />
                                </IconButton>
                                <Menu
                                    className="inlineDisplay menu-tab"
                                    style={{ border: 0 }}
                                    onClick={this.handleClick.bind(this)}
                                    defaultSelectedKeys={[this.state.dataSource]}
                                    mode="horizontal"
                                >
                                    <Menu.Item key="outstanding">
                                        Outstanding
                                    </Menu.Item>
                                    <Menu.Item key="paid" >
                                        Paid
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
        invoiceData: state.officeAdmin.allInvoiceData,
        paidInvoiceData: state.officeAdmin.paidInvoiceData,
        outstandingInvoiceData: state.officeAdmin.outstandingInvoiceData,
        isLoadingInvoices: state.officeAdmin.isLoadingInvoices,
        currentOfficeAdminUID: state.general.currentOfficeAdminUID,
        userAdminOfficeList: state.auth.adminOfficeList,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadInvoices: (officeUID) => dispatch(generalActionCreator.getAllInvoices({ selectedOfficeUID: officeUID })),
        changePage: (payload) => dispatch(generalActionCreator.changePage(payload)),
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BillingPage));
