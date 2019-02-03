import React from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';

import { Row, Col, Button, Menu, Icon} from 'antd';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import '../../App.css';

import * as actionCreator from '../../store/actions/officeAdmin';
import * as generalActionCreator from '../../store/actions/general';
import * as officeActionCreator from '../../store/actions/officeAdmin';

import { withRouter } from 'react-router-dom';
import * as pageTitles from '../../pages/pageTitles';
import getPagePayload from '../../pages/pageRoutingFunctions';

import AntEventCards from './antEventCards.js'
import MaterialUIEventCards from './materialUIEventCards.js'
import CreateEventForm from './createEventForm.js'

class EventsPage extends React.Component {

  state = {
    currentList : 'upcoming',
    createEventFormVisible: false
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

        const pagePayload = getPagePayload(pageTitles.homePageOfficeAdmin, { officeUID: selectedOfficeUID, officeObj: officeObj });
        if (pagePayload) {
            this.props.changePage(pagePayload);
        }

          const secondPagePayload = getPagePayload(pageTitles.registeredGuestsPageOfficeAdmin);
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
          const eventTitle = values.eventName;
          const description = values.description
          //const startDate = values.startDate
          //const endDate = values.endDate

          const currentOfficeUID = this.props.currentOfficeUID;
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
              selectedOfficeUID: currentOfficeUID,
              photoFileObj: photoFileObj,
              hideForm: this.hideCreateEventFormModal
              //startDate: startDate
              //endDate: endDate
          }
          //this.props.createEvent(payload);
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

  saveCreateEventFormRef = (form) => {
      this.createEventFormRef = form;
  }

  render() {
    return (
      <div>
        <Row>
            <Col className="wide-table" span={24}>
                <h1>Events</h1>
                <div>
                  <CreateEventForm
                      wrappedComponentRef={(form) => this.saveCreateEventFormRef(form)}
                      visible={this.state.createEventFormVisible}
                      onCancel={this.handleCancelCreateEvent}
                      onCreate={this.handleCreateEvent}
                      confirmLoading={this.props.addEventFormLoading}
                  />
                  <Menu
                      onClick={(e) => this.handleClick(e)}
                      selectedKeys={[this.state.currentList]}
                      defaultSelectedKeys={[this.state.currentList]}
                      className="page-nav-menu"
                      mode="horizontal"
                    >
                      <IconButton className="inlineDisplay" onClick={(e) => this.handleClick(e)}>
                          <RefreshIcon />
                      </IconButton>
                      <Menu.Item key="upcoming">
                        Upcoming
                      </Menu.Item>
                      <Menu.Item key="past" >
                        Past
                      </Menu.Item>
                      <Button className='inlineDisplay rightAlign' type="primary" onClick={this.showCreateEventFormModal}>Add Event</Button>
                  </Menu>
                </div>
                <AntEventCards currentList={this.state.currentList}/>
                <br />
                <br />
                {/*MaterialUIEventCards is no longer needed. They are concept buttons
                  that may be useful for the user page*/}
                {/*<MaterialUIEventCards/>*/}
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
        isLoadingEventsData: state.officeAdmin.isLoadingUserData,
        currentOfficeUID: state.general.currentOfficeAdminUID,
        currentOfficeAdminUID: state.general.currentOfficeAdminUID,
        addRoomFormLoading: state.officeAdmin.addRoomFormLoading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadEvents: (officeUID) => dispatch(actionCreator.loadEvents(officeUID)),
        changePage: (payload) => dispatch(generalActionCreator.changePage(payload)),
        createEvent: (payload) => dispatch(actionCreator.loadEvents(payload))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventsPage));
