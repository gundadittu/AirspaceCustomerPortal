import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import { connect } from 'react-redux';
import ConfirmationPage from './components/ConfirmationPage/confirmationPage'
import UpdateServiceRequestStatusPage from './components/UpdateServiceRequestStatusPage/updateServiceRequestStatusPage'
import Login from './components/Login/Login';
import NavBar from './components/NavBar/navbar';
import SideNavbar from './components/SideNavBar/sidenavbar';
import HomeAdminPage from './components/HomeAdminPage/homeAdminPage';
import AnnouncementsPage from './components/AnnouncementsPage/announcementsPage';
import UsersPage from './components/UsersPage/usersPage';
import ConferenceRoomsPage from './components/ConferenceRoomsPage/conferenceRoomPage';
import HotDesksPage from './components/HotDesksPage/hotDesksPage.js';
import RegisteredGuestsPage from './components/RegisteredGuestsPage/registeredGuestsPage';
import EventsPage from './components/EventsPage/eventspage';
import SpaceInfoPage from './components/SpaceInfoPage/spaceInfoPage';
import ServiceRequestsPage from './components/ServiceRequestsPage/serviceRequestsPage';
//import ExperienceManagerPage from './components/ExperienceManagerPage/experienceManagerPage';
import CreatePasswordPage from './components/CreatePasswordPage/createPasswordPage';
import InitialRoutingComp from './components/InitialRoutingComp/InitialRoutingComp';
import Firebase from './components/Firebase';

import * as generalActionCreators from './store/actions/general';
import * as authActionCreators from './store/actions/auth';
import { Row, Col } from 'antd';
import * as pageTitles from './pages/pageTitles';
import * as Sentry from '@sentry/browser';
const Mixpanel = require('mixpanel');
var mixpanel = Mixpanel.init('4b6f21dc6886a40bf4900783da31064a');

class App extends Component {
  state = {
    toggle_render: false
  }

  componentWillMount() {
    Sentry.init({ dsn: 'https://8825e624e2594f1d8ca77d056c8b56dd@sentry.io/1395312' });


    if (this.props.firebase === null) {
      this.firebase = new Firebase()
      this.props.setUpFirebase(this.firebase);
    }
  }

  componentDidMount() {
    const firebase = this.firebase || null;
    if (firebase) {
      const weakProps = this.props;
      this.listener = firebase.auth.onAuthStateChanged(function (user) {
        if (user) {
          weakProps.setUpUser(user.uid);
          if (weakProps.currentOfficeAdminUID) {
            if (weakProps.currentPage == null) {
              weakProps.history.push('/' + 'officeAdmin/' + weakProps.currentOfficeAdminUID + '/home');
            }
          }
        } else {
          weakProps.clearRedux();
          weakProps.history.push('/login');
        }
      });
    } else {
      console.log("firebase NOT set up in App.js render()");
      // this.props.setUpFirebase();
    }
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {

    if (this.props.user) { // logged in
      return (
        <div style={{ background: '#FFFFFF' }}>
          <Row>
            <MediaQuery minDeviceWidth={1224}> {/* for desktop devices*/}
              <Col span={4}>
                <SideNavbar device={"desktop"} />
              </Col>
              <Col span={20}>
                <NavBar />
                <Switch>
                  <Route exact path="/" component={InitialRoutingComp} />
                  <Route exact path="/login" component={InitialRoutingComp} />
                  <Route path="/general" component={generalRoutingComp} />
                  <Route path="/officeAdmin" component={officeAdminRoutingComp} />
                </Switch>
              </Col>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1224}> {/* for mobile devices*/}
              <Col span={24}>
                <NavBar device={"mobile"} />
                <Switch>
                  <Route path="/" component={InitialRoutingComp} />
                  <Route path="/general" component={generalRoutingComp} />
                  <Route path="/officeAdmin" component={officeAdminRoutingComp} />
                </Switch>
              </Col>
            </MediaQuery>
          </Row>
        </div>
      );
    } else { // logged out
      return (
        <div>
          <Switch>
            <Route path="/general" component={generalRoutingComp} />
            <Route path="/" component={Login} />
            <Route path="/login" component={Login} />
          </ Switch>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    currentOfficeAdminUID: state.general.currentOfficeAdminUID,
    firebase: state.firebase.firebase,
    currentPage: state.general.currentPage
  }
};

const mapDispatchToProps = dispatch => {
  return {
    clearRedux: () => dispatch(generalActionCreators.clearReduxState()),
    setUpFirebase: (firebaseInstance) => dispatch(generalActionCreators.setUpFirebaseInstanceAction(firebaseInstance)),
    setUpUser: (uid) => dispatch(authActionCreators.setUpUserAction(uid))
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

const generalRoutingComp = () => (
  <Switch>
    <Route exact path='/general/arrivedGuest/:UID' component={ConfirmationPage}></Route>
    <Route exact path='/general/updateServiceRequestStatus/:uid/:status' component={UpdateServiceRequestStatusPage}></Route>
    <Route exact path='/general/createPassword/:userUID' component={CreatePasswordPage}></Route>
  </Switch>
)

const officeAdminRoutingComp = () => (
  <Switch>
    <Route exact path='/officeAdmin/:officeUID' component={HomeAdminPage}></Route>
    <Route exact path='/officeAdmin/:officeUID/home' component={HomeAdminPage}></Route>
    <Route exact path='/officeAdmin/:officeUID/announcements' component={AnnouncementsPage}></Route>
    <Route exact path='/officeAdmin/:officeUID/users' component={UsersPage}></Route>
    <Route exact path='/officeAdmin/:officeUID/conferenceRooms' component={ConferenceRoomsPage}></Route>
    <Route exact path='/officeAdmin/:officeUID/hotDesks' component={HotDesksPage}></Route>
    <Route exact path='/officeAdmin/:officeUID/serviceRequests' component={ServiceRequestsPage}></Route>
    <Route exact path='/officeAdmin/:officeUID/registeredGuests' component={RegisteredGuestsPage}></Route>
    <Route exact path='/officeAdmin/:officeUID/events' component={EventsPage}></Route>
    <Route exact path='/officeAdmin/:officeUID/spaceInfo' component={SpaceInfoPage}></Route>
    {/*<Route exact path='/officeAdmin/:officeUID/experienceManager' component={ExperienceManagerPage}></Route>*/}
  </Switch>
)
