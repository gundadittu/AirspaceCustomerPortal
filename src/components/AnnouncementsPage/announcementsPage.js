import React from 'react';
import { connect } from 'react-redux';
// import * as actionTypes from '../../store/actions/actionTypes';

import { Spin, Divider, Comment, Avatar, Row, Col, Button, Input } from 'antd';
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
const moment = require('moment');

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
                this.props.loadAdminAnnouncements(selectedOfficeUID)
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

    formatDate(date){
      var description = moment(date).format('ddd MMM DD, YYYY') + ': ';
      description += (moment(date).format('hh:mm a'));
      return description;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    render() {
        var announcementsDescription = "Post an announcement that is to be sent to everyone in the office!"
        return (
            <div style={{ backgroundColor: '#FFFFFF' }}>
              <Row>
                    <Col className="wide-table" span={24}>
                        <Row>
                          <h1>Annoucements</h1>
                        </Row>
                        <Row type="flex">
                            <Col span={24}>
                              <Row type="flex" style={{height:87}} align="middle" justify="start">
                                <IconButton className="inlineDisplay" onClick={() => this.props.loadAdminAnnouncements(this.props.match.params.officeUID)}>
                                    <RefreshIcon />
                                </IconButton>
                              </Row>
                            </Col>
                        </Row>
                        <Row>
                          <TextArea value={this.state.announcement} rows={4} onChange={(e) => this.handleInputChange(e)} placeholder={announcementsDescription}/>
                        </Row>
                        <Row>
                          <Button className='inlineDisplay rightAlign' type="primary" loading={this.props.postingAnnouncement} onClick={this.postAnnouncement}>Post</Button>
                        </Row>
                        <Spin tip="Loading..." spinning={this.props.isLoadingAnnouncementsData}>
                          {this.props.announcementsList.map(announcement => (
                            <div>
                                <Row>
                                  <Comment
                                    datetime={<a>{this.formatDate(announcement.timestamp)}</a>}
                                    content={<h3>{announcement.message}</h3>}
                                  >
                                  </Comment>
                                </Row>
                                <Divider />
                              </div>
                            ))}
                        </Spin>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      isLoadingAnnouncementsData: state.officeAdmin.isLoadingAnnouncementsData,
      announcementsList: state.officeAdmin.announcementsList,
      postingAnnouncement: state.officeAdmin.postingAnnouncement,
      successfulPost: state.officeAdmin.successfulPost
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
