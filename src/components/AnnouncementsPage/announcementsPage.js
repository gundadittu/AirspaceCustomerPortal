import React from 'react';
import { connect } from 'react-redux';
// import * as actionTypes from '../../store/actions/actionTypes';

import { Row, Col, Button, Input } from 'antd';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import '../../App.css';

import * as actionCreator from '../../store/actions/officeAdmin';
import * as generalActionCreator from '../../store/actions/general';
import * as officeActionCreator from '../../store/actions/officeAdmin';

import { withRouter } from 'react-router-dom';
import * as pageTitles from '../../pages/pageTitles';
import getPagePayload from '../../pages/pageRoutingFunctions';
const { TextArea } = Input;

class AnnouncementsPage extends React.Component {

    state = {
      announcement: ""
    }

    componentDidMount() {
        // Routing stuff
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
            //
            const pagePayload = getPagePayload(pageTitles.homePageOfficeAdmin, { officeUID: selectedOfficeUID, officeObj: officeObj });
            if (pagePayload) {
                this.props.changePage(pagePayload);
            }
            const secondPagePayload = getPagePayload(pageTitles.announcementsPageOfficeAdmin);
            if (secondPagePayload) {
                this.props.changePage(secondPagePayload);
            }
        }
    }

    handleInputChange = (e) => {
      this.setState({
        announcement: e.target.value
      })
    }

    postAnnouncement = () => {
      const selectedOfficeUID = this.props.match.params.officeUID;
      this.props.postAdminAnnouncement(selectedOfficeUID, this.state.announcement)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    render() {
        return (
            <div style={{ backgroundColor: '#FFFFFF' }}>
              <Row>
                    <Col className="wide-table" span={24}>
                        <h1>Annoucements</h1>
                        <TextArea rows={4} onChange={(e) => this.handleInputChange(e)}/>
                        <Button className='inlineDisplay rightAlign' type="primary" onClick={this.postAnnouncement}>Post</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      isLoadingAnnouncementsData: state.officeAdmin.isLoadingAnnouncementsData,
      announcementsList: state.officeAdmin.announcementsList
    }
};

const mapDispatchToProps = dispatch => {
    return {
      loadAdminAnnouncements: (payload) => dispatch(actionCreator.loadAdminAnnouncements(payload)),
      postAdminAnnouncement: (selectedOfficeUID, message) => dispatch(actionCreator.postAdminAnnouncement(selectedOfficeUID, message)),
      changePage: (payload) => dispatch(generalActionCreator.changePage(payload))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AnnouncementsPage));
