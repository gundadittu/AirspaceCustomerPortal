import React from 'react';
import { connect } from 'react-redux';
import { Avatar, List, Button } from 'antd';
import OrderForm from "../OrderFormComp/OrderForm";
import * as actionTypes from '../../store/actions/actionTypes';
const moment = require('moment');

class FeaturedAdminFeed extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showOrderForm: false,
            selectedServiceTitle: null
        }
        this.showOrderForm = this.showOrderForm.bind(this)
        this.hideOrderForm = this.hideOrderForm.bind(this)
    }

    componentDidMount() {
        this.props.loadData()
    }

    showOrderForm(serviceTitle) {
        this.setState({
            showOrderForm: true,
            selectedServiceTitle: serviceTitle
        })
    }

    hideOrderForm() {
        this.setState({
            showOrderForm: false,
            selectedServiceTitle: null
        })
    }

    render() {
        const dataSource = this.props.feedItems
        console.log(dataSource)
        return (
            <div style={{ paddingTop: "2%" }}>
                <OrderForm visible={this.state.showOrderForm} onCancel={this.hideOrderForm} serviceTitle={this.state.selectedServiceTitle} />
                <h2>Featured</h2>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        pageSize: 3,
                    }}
                    dataSource={dataSource}
                    loading={this.props.isLoading}
                    renderItem={item => (
                        <List.Item
                            key={item.uid}
                            actions={
                                item.linkedServices.map(serviceTitle => (
                                    <Button onClick={() => this.showOrderForm(serviceTitle)}>{"Request "+serviceTitle}</Button>
                                ))
                            }
                            extra={
                                <img
                                    width={272}
                                    height={200}
                                    alt="logo"
                                    src={item.photoURL}
                                />
                            }
                        >
                            <List.Item.Meta
                                avatar={null}
                                title={item.title}
                                description={moment(new Date(item.createdAt)).format('dddd MMM DD')}
                            />
                            {item.body}
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentOfficeAdminUID: state.general.currentOfficeAdminUID,
        feedItems: state.officeAdmin.featuredAdminFeedData,
        isLoading: state.officeAdmin.isLoadingFeaturedAdminFeedData
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadData: () => dispatch({ type: actionTypes.LOAD_FEATURED_ADMIN_FEED_DATA }),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedAdminFeed); 