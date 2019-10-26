import React from 'react';
import { connect } from 'react-redux';
import * as generalActionCreator from '../../store/actions/general';
import { withRouter } from 'react-router-dom';
import * as pageTitles from '../../pages/pageTitles';
import getPagePayload from '../../pages/pageRoutingFunctions';
import { Col} from 'antd';

class BuildingInfoPage extends React.Component {

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
            const secondPagePayload = getPagePayload(pageTitles.buildingInfoPageOfficeAdmin);
            if (secondPagePayload) {
                this.props.changePage(secondPagePayload);
            }
        }
    }

    render() {
        return (
            <Col className="wide-table" span={24}>
                <h1>Building Info</h1>
            </Col>
        )
    }

}

const mapStateToProps = state => {
    return {
        currentOfficeAdminUID: state.general.currentOfficeAdminUID,
        userAdminOfficeList: state.auth.adminOfficeList,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        changePage: (payload) => dispatch(generalActionCreator.changePage(payload)),
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BuildingInfoPage));
