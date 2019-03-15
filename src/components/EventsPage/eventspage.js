import React from 'react';
import { connect } from 'react-redux';
// import * as actionTypes from '../../store/actions/actionTypes';

import { Row, Col, Button, Menu, Spin} from 'antd';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import '../../App.css';

import * as actionCreator from '../../store/actions/officeAdmin';
import * as generalActionCreator from '../../store/actions/general';
// import * as officeActionCreator from '../../store/actions/officeAdmin';

import { withRouter } from 'react-router-dom';
import * as pageTitles from '../../pages/pageTitles';
import getPagePayload from '../../pages/pageRoutingFunctions';

import AntEventCards from './antEventCards.js'
// import MaterialUIEventCards from './materialUIEventCards.js'
import CreateEventForm from './createEventForm.js'

class EventsPage extends React.Component {

  state = {
    currentList : 'upcoming',
    createEventFormVisible: false,
    officeObj: null
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
                this.setState({
                  officeObj: officeObj
                })
            }
        }

        const pagePayload = getPagePayload(pageTitles.homePageOfficeAdmin, { officeUID: selectedOfficeUID, officeObj: officeObj });
        if (pagePayload) {
            this.props.changePage(pagePayload);
        }

          const secondPagePayload = getPagePayload(pageTitles.eventsPageOfficeAdmin);
          if (secondPagePayload) {
              this.props.changePage(secondPagePayload);
              this.props.loadEvents(this.props.currentOfficeAdminUID);
          }
      }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
      const prevOfficeUID = prevProps.currentOfficeUID;
      const currentOfficeUID = this.props.currentOfficeUID;

      if (prevOfficeUID !== currentOfficeUID) {
          this.props.loadEvents(this.props.currentOfficeAdminUID);
      }
  }

  handleCreateEvent = () => {
      const createEventForm = this.createEventFormRef.props.form;
      createEventForm.validateFields((err, values) => {
          if (err) {
              return;
          }

          const currentOfficeUID = this.props.currentOfficeUID;

          const eventTitle = values.eventName;
          const description = values.description;

          const timeRange = values.eventTimeRange;
          if (Object.keys(timeRange).length < 2) {
            // handle error
            return
          }
          const startDate = timeRange[0]._d;
          const endDate = timeRange[1]._d;

          let photoFileObj = null;
          const uploadPhotoDict = values.uploadPhoto || null;
          if (uploadPhotoDict) {
              const value = uploadPhotoDict[0];
              const fileObj = value.originFileObj;
              photoFileObj = fileObj;
          }

          const payload = {
              eventTitle: eventTitle,
              description: description,
              startDate: startDate,
              endDate: endDate,
              photoFileObj: photoFileObj,
              selectedOfficeUID: currentOfficeUID,
              hideForm: this.hideCreateEventFormModal
          }

          this.props.createEvent(payload);
      })
  }

  hideCreateEventFormModal = () => {
    this.setState({
      createEventFormVisible: false
    })
  }

  handleCancelCreateEvent = () => {
      this.hideCreateEventFormModal();
  }

  showCreateEventFormModal = () => {
      this.setState({ createEventFormVisible: true });
  }

  handleClick = (e) => {
      var key = e.key;
      if ((key == 'upcoming') || (key == 'past')) {
          this.setState({ currentList: key });
      }
  }

  handleRefresh = () => {
      this.props.loadEvents(this.props.currentOfficeAdminUID);
  }

  saveCreateEventFormRef = (form) => {
      this.createEventFormRef = form;
  }

  render() {

  

    return (
      <div>
        <Row>
            <Col className="wide-table" span={24}>
                <h1>Events</h1>
                <Row type="flex">
                    <Col span={12}>
                      <Row type="flex" style={{height:87}} align="middle" justify="start">
                        <IconButton className="inlineDisplay" onClick={this.handleRefresh}>
                            <RefreshIcon />
                        </IconButton>
                        <CreateEventForm
                            wrappedComponentRef={(form) => this.saveCreateEventFormRef(form)}
                            visible={this.state.createEventFormVisible}
                            onCancel={this.handleCancelCreateEvent}
                            onCreate={this.handleCreateEvent}
                            confirmLoading={this.props.addEventFormLoading}
                            address={this.state.officeObj ? this.state.officeObj.building.address : 'invalid'}
                        />
                        <Menu
                            onClick={(e) => this.handleClick(e)}
                            selectedKeys={[this.state.currentList]}
                            defaultSelectedKeys={[this.state.currentList]}
                            className="page-nav-menu"
                            mode="horizontal"
                          >
                            <Menu.Item key="upcoming">
                              Upcoming
                            </Menu.Item>
                            <Menu.Item key="past" >
                              Past
                            </Menu.Item>
                        </Menu>
                      </Row>
                    </Col>
                    <Col span={12}>
                      <Row type="flex" align="middle" justify="end">
                        <Button className='inlineDisplay rightAlign' type="primary" onClick={this.showCreateEventFormModal}>Add Event</Button>
                      </Row>
                    </Col>
                </Row>
                 {this.props.isLoadingEventsData ? <div style={{textAlign: "center"}}><Spin style={{marginTop: "20"}}/> </div>: 
                 <AntEventCards currentList={this.state.currentList}/>
                }
                <br />
            </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => {
    return {
        userAdminOfficeList: state.auth.adminOfficeList,
        upcomingEventsList: state.officeAdmin.upcomingEventsList,
        pastEventsList: state.officeAdmin.pastEventsList,
        isLoadingEventsData: state.officeAdmin.isLoadingEventsData,
        currentOfficeUID: state.general.currentOfficeAdminUID,
        currentOfficeAdminUID: state.general.currentOfficeAdminUID,
        addEventFormLoading: state.officeAdmin.addEventFormLoading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadEvents: (officeUID) => dispatch(actionCreator.loadEvents(officeUID)),
        changePage: (payload) => dispatch(generalActionCreator.changePage(payload)),
        createEvent: (payload) => dispatch(actionCreator.createEvent(payload))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventsPage));
