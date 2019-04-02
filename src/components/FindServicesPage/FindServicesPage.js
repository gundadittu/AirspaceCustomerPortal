import React from 'react';
import { connect } from 'react-redux';

// import * as actionCreator from '../../store/actions/officeAdmin';
import * as generalActionCreator from '../../store/actions/general';
// import * as officeActionCreator from '../../store/actions/officeAdmin';
// import InvoiceCard from './InvoiceCard';
// import RefreshIcon from '@material-ui/icons/Refresh';
// import IconButton from '@material-ui/core/IconButton';
import { withRouter } from 'react-router-dom';
import { Row, Col, Menu, List, Card, Button, Tooltip } from 'antd';
import * as pageTitles from '../../pages/pageTitles';
import getPagePayload from '../../pages/pageRoutingFunctions';
const { Meta } = Card;

class FindServicesPage extends React.Component {

    state = {
        dataSource: "featured" // or "paid"
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
            const secondPagePayload = getPagePayload(pageTitles.findServicesPageOfficeAdmin);
            if (secondPagePayload) {
                this.props.changePage(secondPagePayload);
            }
        }
    }

    handleClick(e) {
        var key = e.key;
        this.setState({ dataSource: key });
    }

    render() {

        // const allInvoices = this.props.invoiceData || null;
        // const paidInvoices = this.props.paidInvoiceData || null;
        // const outInvoices = this.props.outstandingInvoiceData || null;

        let data = [{}];
        // if (this.state.dataSource === "paid") {
        //     dataSource = paidInvoices
        // } else if (this.state.dataSource === "outstanding") {
        //     dataSource = outInvoices;
        // }

        return (
            <Col className="wide-table" span={24}>
                <h1>Find Services</h1>
                <div>
                    <Row type="flex">
                        <Col span={12}>
                            <Row type="flex" style={{ height: 87 }} align="middle" justify="start">
                                <Menu
                                    className="inlineDisplay"
                                    style={{ border: 0 }}
                                    onClick={this.handleClick.bind(this)}
                                    defaultSelectedKeys={[this.state.dataSource]}
                                    mode="horizontal"
                                >
                                    <Menu.Item key="featured">
                                        Featured
                                    </Menu.Item>
                                    <Menu.Item key="coffee">
                                        Coffee
                                    </Menu.Item>
                                    <Menu.Item key="snacks-bevs">
                                        Snacks/Beverages
                                    </Menu.Item>
                                    <Menu.Item key="cleaning" >
                                        Cleaning
                                    </Menu.Item>
                                    <Menu.Item key="infoTech" >
                                        IT &amp; Security
                                    </Menu.Item>
                                    <Menu.Item key="plumbing-electrical" >
                                        Plumbing &amp; Electrical
                                    </Menu.Item>
                                    <Menu.Item key="decor" >
                                        Decor
                                    </Menu.Item>
                                    <Menu.Item key="moving" >
                                        Moving
                                    </Menu.Item>
                                </Menu>
                            </Row>
                        </Col>
                    </Row>
                    {data != null ?
                        (data.map(x => (
                            <List
                                grid={{
                                    gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3,
                                }}
                                // itemsLayout={"horizontal"}
                                dataSource={data}
                                renderItem={item => (
                                    <List.Item>
                                        <Card
                                            style={{ width: "60%" }}
                                            cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                                            actions={[( <Tooltip title="We'll let you know what the service would cost for your office. No charges or contracts involved."> <Button type="secondary">I'm Interested</Button></Tooltip> ) , ( <Tooltip title="Your experience manager will reach out with pricing and terms to help add this to your service plan.">  <Button type="primary">Request</Button> </Tooltip>)]}
                                        >
                                            <Meta
                                                // avatar={}
                                                title="Card title"
                                                description="This is the description"
                                            />
                                        </Card>
                                    </List.Item>
                                )}
                            />
                        )))
                        : null}
                </div>
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
        changePage: (payload) => dispatch(generalActionCreator.changePage(payload))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FindServicesPage));
