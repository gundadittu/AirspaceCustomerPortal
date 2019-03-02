import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import { connect } from 'react-redux';
import ConfirmationPage from './components/ConfirmationPage/confirmationPage'
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

import Firebase from './components/Firebase';

import * as generalActionCreators from './store/actions/general';
import * as authActionCreators from './store/actions/auth';
import {Row, Col } from 'antd';
import * as pageTitles from './pages/pageTitles';

class App extends Component {

  componentWillMount() {
    if (this.props.firebase === null) {
      this.firebase = new Firebase()
      this.props.setUpFirebase(this.firebase);
    }
  }

  componentDidMount() {
    const firebase = this.firebase || null;
    if (firebase) {
      const weakProps = this.props;
      this.listener = firebase.auth.onAuthStateChanged(function(user) {
        if (user) {
          const simplifiedPageTitles = {
            announcementsPageOfficeAdmin: "announcements",
            homePageOfficeAdmin: "home",
            conferenceRoomsPageOfficeAdmin: "conferenceRooms",
            userPageOfficeAdmin: "users",
            hotDesksPageOfficeAdmin: "hotDesks",
            serviceRequestsPageOfficeAdmin: "serviceRequests",
            registeredGuestsPageOfficeAdmin: "registeredGuests",
            eventsPageOfficeAdmin: "events",
            spaceInfoPageOfficeAdmin: "spaceInfo"
          }
          weakProps.setUpUser(user.uid);
          console.log(weakProps.currentPage)
          weakProps.history.push('/');
          weakProps.history.push('/' + 'officeAdmin/' + weakProps.currentOfficeAdminUID + '/' + simplifiedPageTitles[weakProps.currentPage]);
        } else {
          weakProps.setUpUser(null);
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

  renderPageContent(pageName) {

    switch (pageName) {
      case pageTitles.homePageRegularUser:
        return null
      case pageTitles.userPageOfficeAdmin:
        return (
          <UsersPage />
        );
      default:
          // return 404 page?
          return null
    }
  }

  render() {

    if (this.props.user) { // logged in
      this.props.signInRedirect();
      return (
        <div>
          <Row>
              <MediaQuery minDeviceWidth={1224}>
                <Col span={4}>
                  <SideNavbar device={"desktop"}/>
                </Col>
                <Col span={20}>
                  <NavBar/>
                  <Switch>
                    <Route path="/officeAdmin" component={officeAdminRoutingComp}/>
                  </Switch>
                </Col>
              </MediaQuery>
              <MediaQuery maxDeviceWidth={1224}>
                <Col span={1}>
                  <SideNavbar device={"mobile"}/>
                </Col>
                <Col span={23}>
                  <NavBar/>
                  <Switch>
                    <Route path="/officeAdmin" component={officeAdminRoutingComp}/>
                  </Switch>
                </Col>
              </MediaQuery>
          </Row>
        </div>
      );
    } else {
       // logged out
      return (
        <div>
           <Switch>
            <Route exact path='/arrivedGuest/:UID' component={ConfirmationPage}></Route>
            <Route path="/" component={Login}/>
            <Route path="/login" component={Login}/>
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
    isLoading: state.general.isLoading,
    error: state.general.error,
    firebase: state.firebase.firebase,
    currentPage: state.general.currentPage
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setUpFirebase: (firebaseInstance) => dispatch(generalActionCreators.setUpFirebaseInstanceAction(firebaseInstance)),
    setUpUser: (uid) => dispatch(authActionCreators.setUpUserAction(uid)),
    signInRedirect: () => dispatch(authActionCreators.signInRedirect())
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

const officeAdminRoutingComp = () => (
    <Switch>
      <Route exact path='/officeAdmin/:officeUID' component={UsersPage}></Route>
      <Route exact path='/officeAdmin/:officeUID/home' component={HomeAdminPage}></Route>
      <Route exact path='/officeAdmin/:officeUID/announcements' component={AnnouncementsPage}></Route>
      <Route exact path='/officeAdmin/:officeUID/users' component={UsersPage}></Route>
      <Route exact path='/officeAdmin/:officeUID/conferenceRooms' component={ConferenceRoomsPage}></Route>
      <Route exact path='/officeAdmin/:officeUID/hotDesks' component={HotDesksPage}></Route>
      <Route exact path='/officeAdmin/:officeUID/serviceRequests' component={ServiceRequestsPage}></Route>
      <Route exact path='/officeAdmin/:officeUID/registeredGuests' component={RegisteredGuestsPage}></Route>
      <Route exact path='/officeAdmin/:officeUID/events' component={EventsPage}></Route>
      <Route exact path='/officeAdmin/:officeUID/spaceInfo' component={SpaceInfoPage}></Route>
    </Switch>
)
