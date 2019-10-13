import React from 'react';
import { Row, Col, Icon, Spin, Avatar } from 'antd';
import * as generalActionCreator from '../../store/actions/general';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SupportArticles from './SupportArticles';

class ExpManagerSection extends React.Component {

    componentWillMount() {
        this.props.loadEMInfo({ selectedOfficeUID: this.props.currentOfficeAdminUID });
    }

    render() {
        if (this.props.isLoadingEMInfo && this.props.emInfo === null) {
            return (
                <div style={{ textAlign: "center" }} className="example">
                    <Spin />
                </div>
            )
        } else if (this.props.emInfo === null) {
            return null
        } else {

            const info = this.props.emInfo;

            const name = "Hi, I'm " + (info["Name"] || "");
            const bio = info["Bio"] || "";
            const photoDict = info["Photo"][0] || {};
            const imageURL = photoDict.thumbnails.large.url;

            const phone = info["Phone"] || "";
            const phoneHref = "tel:" + phone;
            const email = info["Email"] || "";
            const emailHref = "mailto:" + email;
            const chatURL = info["Drift Link"] || null;

            return (
                <div>
                    <Row>
                        <Col span={4}>
                            <Avatar style={{ width: "80%", height: "5%", marginLeft: "10%" }} shape="circle" src={imageURL} />
                        </Col>
                        <Col span={18}>
                            <div style={{ paddingTop: 20 }}>
                                <h1>{name}</h1>
                                <h3 style={{ fontSize: 20, fontWeight: 300 }} >{bio}</h3>
                            </div>
                            <Row style={{ paddingTop: 15 }}>
                                <Col span={3}>
                                    <a target="_blank" href={chatURL}><h2 style={{ fontSize: 20 }}
                                    > <Icon type="message" /> Live Chat</h2></a>
                                </Col>
                                <Col span={2}>
                                    <a href={phoneHref}><h2 style={{ fontSize: 20 }}> <Icon type="phone" /> Call</h2></a>
                                </Col>
                                <Col span={3}>
                                    <a href={emailHref}><h2 style={{ fontSize: 20 }}> <Icon type="inbox" /> Email</h2></a>
                                </Col>
                                <Col span={16}>
                                </Col>
                            </Row>
                            <SupportArticles />
                        </Col>
                    </Row>
                </div >
            )
        }
    }

}

const mapStateToProps = state => {
    return {
        currentOfficeAdminUID: state.general.currentOfficeAdminUID,
        isLoadingEMInfo: state.officeAdmin.isLoadingEMInfo,
        emInfo: state.officeAdmin.emInfo
    }
};

const mapDispatchToProps = dispatch => {
    return {
        changePage: (payload) => dispatch(generalActionCreator.changePage(payload)),
        loadEMInfo: (payload) => dispatch(generalActionCreator.getEMInfo(payload))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExpManagerSection)); 