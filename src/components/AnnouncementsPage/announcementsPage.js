import React from 'react';
import { connect } from 'react-redux';
// import * as actionTypes from '../../store/actions/actionTypes';

import { Row, Col, Button } from 'antd';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import '../../App.css';

import * as actionCreator from '../../store/actions/officeAdmin';
import * as generalActionCreator from '../../store/actions/general';
import * as officeActionCreator from '../../store/actions/officeAdmin';

import { withRouter } from 'react-router-dom';
import * as pageTitles from '../../pages/pageTitles';
import getPagePayload from '../../pages/pageRoutingFunctions';

class AnnouncementsPage extends React.Component {

    state = {
    }

    componentDidMount() {
        // Routing stuff
        if (this.props.match.isExact) {
          const selectedOfficeUID = this.props.match.params.officeUID;
          console.log(selectedOfficeUID)
          console.log(this.props)
          this.props.loadAdminAnnouncements(selectedOfficeUID);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    render() {
        return (
            <div style={{ backgroundColor: '#FFFFFF' }}>
              <Row>
                    <Col className="wide-table" span={24}>
                        <h1>Annoucements Page</h1>
                        {console.log(this.props.announcementsList)}
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
      loadAdminAnnouncements: (payload) => dispatch(actionCreator.loadAdminAnnouncements(payload))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AnnouncementsPage));
