import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as pageTitles from '../../pages/pageTitles';
import getPagePayload from '../../pages/pageRoutingFunctions';
import * as generalActionCreator from '../../store/actions/general';
import ExpMgrSection from './ExpMgrSection';
import SupportArticles from './SupportArticles';
import { Col } from 'antd';

class SupportPage extends React.Component {

    showHelp() {
        this.setState({ getHelpVisible: true });
    }

    hideHelp() {
        this.setState({ getHelpVisible: false });
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
            const secondPagePayload = getPagePayload(pageTitles.supportPageOfficeAdmin);
            if (secondPagePayload) {
                this.props.changePage(secondPagePayload);
            }
        }
    }

    render() {
        return (
            <div>
                <Col className="wide-table" span={24}>
                    <h1>Support</h1>
                    <div>
                        <ExpMgrSection />
                        <SupportArticles />
                    </div>
                </Col>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userAdminOfficeList: state.auth.adminOfficeList,
        currentOfficeAdminUID: state.general.currentOfficeAdminUID
    }
};

const mapDispatchToProps = dispatch => {
    return {
        changePage: (payload) => dispatch(generalActionCreator.changePage(payload))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SupportPage));