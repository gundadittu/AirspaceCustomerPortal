import React from 'react';
import { connect } from 'react-redux';
import * as generalActionCreator from '../../store/actions/general';
import { withRouter } from 'react-router-dom';
import { Row, Col, Menu, List, Card, Button, Modal, message, Steps, Avatar } from 'antd';
import * as pageTitles from '../../pages/pageTitles';
import getPagePayload from '../../pages/pageRoutingFunctions';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import OrderForm from "../OrderFormComp/OrderForm";
import * as dataSource from "../../datasource/FindServicesDataSource";
const { Meta } = Card;

class FindServicesPage extends React.Component {

    state = {
        dataSource: "food-drink",
        showOrderForm: false,
        selectedServiceTitle: null,
        showSteps: false
    }

    handleRoute() {
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

    getDataSource() {
        return dataSource.getServiceCategoriesForFindServicesPage(this.state.dataSource)
    }

    handleClick(e) {
        var key = e.key;
        this.setState({ dataSource: key });
    }

    hideDescription() {
        this.setState({ showOrderForm: false, selectedServiceTitle: null });
    }

    showDetails(item) {
        const title = item.title;
        const description = item.description;
        this.setState({ showOrderForm: true, selectedServiceTitle: title });
    }

    hideSteps() {
        this.setState({ showSteps: false });
    }

    showSteps() {
        this.setState({ showSteps: true, showOrderForm: false });
    }

    requestService(type, description, onlyInterested) {
        message.success('Sent your request to your experience manager.');
        let dict = {
            selectedOfficeUID: this.props.currentOfficeUID,
            serviceType: type,
            serviceDescription: description,
            onlyInterested: onlyInterested
        };
        this.props.addRequestForService(dict);
    }

    render() {
        this.handleRoute();
        let data = this.getDataSource();
        const Step = Steps.Step;

        return (
            <div>
                <Modal
                    visible={this.state.showSteps}
                    title={"How it Works"}
                    onOk={this.hideSteps.bind(this)}
                    onCancel={this.hideSteps.bind(this)}
                    width={1000}
                    footer={[<Button onClick={this.hideSteps.bind(this)} type="primary">Ok</Button>]}
                >
                    <div style={{ paddingTop: 40, paddingBottom: 40 }}>
                        <Steps current={null}>
                            <Step title="Request" description="Answer a few quick questions." />
                            <Step title="Abracadabra..." description="You will receive a competitive quote and options within 24 hours." />
                            <Step title="Choose an Option" description="Your Experience Manager provides personalized options to add to your service plan." />
                        </Steps>
                    </div>
                </Modal>
                <OrderForm visible={this.state.showOrderForm} onCancel={this.hideDescription.bind(this)} serviceTitle={this.state.selectedServiceTitle} />
                <Row>
                    <Col className="wide-table" span={24}>
                        <h1>Find Services
                            <IconButton className="inlineDisplay" style={{ marginBottom: 5 }} onClick={this.showSteps.bind(this)}><InfoIcon /></IconButton>
                        </h1>
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
                                            <Menu.Item key={dataSource.CATEGORIES["FOOD_DRINK"]}>Food &amp; Drink</Menu.Item>
                                            <Menu.Item key={dataSource.CATEGORIES["OFFICE_TECH"]}>Tech</Menu.Item>
                                            <Menu.Item key={dataSource.CATEGORIES["OFFICE_HELP"]}>Help</Menu.Item>
                                            <Menu.Item key={dataSource.CATEGORIES["CLEANING"]}>Cleaning</Menu.Item>
                                            <Menu.Item key={dataSource.CATEGORIES["EVENTS"]}>Events</Menu.Item>
                                        </Menu>
                                    </Row>
                                </Col>
                            </Row>
                            {data != null ?
                                (
                                    <List
                                        grid={{
                                            gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 3, xxl: 4,
                                        }}
                                        dataSource={data}
                                        renderItem={item => (
                                            <List.Item style={{ paddingTop: 0 }}>
                                                <Card
                                                    style={{ width: "85%", overflow: "hidden" }}
                                                    cover={<img style={{ cursor: "pointer", height: "180px" }} onClick={() => this.showDetails(item)} alt="example" src={item.image} />}
                                                >
                                                    <a onClick={() => this.showDetails(item)}>
                                                        <Meta
                                                            title={item.title}
                                                            // description={item.shortDescription}
                                                        />
                                                    </a>
                                                </Card>
                                            </List.Item>
                                        )}
                                    />
                                )
                                : null}
                        </div>
                    </Col>
                </Row>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        userAdminOfficeList: state.auth.adminOfficeList,
        currentOfficeUID: state.general.currentOfficeAdminUID
    }
};

const mapDispatchToProps = dispatch => {
    return {
        changePage: (payload) => dispatch(generalActionCreator.changePage(payload)),
        addRequestForService: (payload) => dispatch(generalActionCreator.addRequestForService(payload)),
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FindServicesPage));
