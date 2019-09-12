import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import { connect } from 'react-redux';
import ConfirmationPage from './components/ConfirmationPage/confirmationPage'
import UpdateServiceRequestStatusPage from './components/UpdateServiceRequestStatusPage/updateServiceRequestStatusPage'
import Login from './components/Login/Login';
import NavBar from './components/NavBar/navbar';
import SideNavbar from './components/SideNavBar/sidenavbar';
// import HomeAdminPage from './components/HomeAdminPage/homeAdminPage';
import AnnouncementsPage from './components/AnnouncementsPage/announcementsPage';
import UsersPage from './components/UsersPage/usersPage';
import ConferenceRoomsPage from './components/ConferenceRoomsPage/conferenceRoomPage';
import HotDesksPage from './components/HotDesksPage/hotDesksPage.js';
import RegisteredGuestsPage from './components/RegisteredGuestsPage/registeredGuestsPage';
import EventsPage from './components/EventsPage/eventspage';
import SpaceInfoPage from './components/SpaceInfoPage/spaceInfoPage';
import ServiceRequestsPage from './components/ServiceRequestsPage/serviceRequestsPage';
//import ExperienceManagerPage from './components/ExperienceManagerPage/experienceManagerPage';
import AlexaLoginForm from './components/AlexaLogin/AlexaLoginForm';
import OfficeList from './components/AlexaLogin/OfficeList';
import ExperienceManagerPage from './components/ExperienceManagerPage/experienceManagerPage';
import CreatePasswordPage from './components/CreatePasswordPage/createPasswordPage';
import InitialRoutingComp from './components/InitialRoutingComp/InitialRoutingComp';
import BillingPage from './components/BillingPage/BillingPage';
import ServicePlanPage from './components/ServicePlan/ServicePlanPage';
import SupportPage from './components/SupportComp/SupportPage';
import FindServicesPage from './components/FindServicesPage/FindServicesPage';
import OfficeProfilePage from './components/OfficeProfile/OfficeProfile';
import Firebase from './components/Firebase';
import * as generalActionCreators from './store/actions/general';
import * as authActionCreators from './store/actions/auth';
import { Row, Col } from 'antd';
// import * as pageTitles from './pages/pageTitles';
import * as Sentry from '@sentry/browser';
import GetStartedComp from './components/GetStartedComp/GetStarted';
import GetStartedFinishedComp from './components/GetStartedComp/GetStartedFinished';
import LoginNavBar from './components/Login/LoginNavBar';
import NoMobile from './components/InitialRoutingComp/NoMobile';


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
        } else {
          weakProps.clearRedux();
          weakProps.history.push('/');
        }
      });
    } else {
      const error = Error("Firebase NOT set up in App.js render()");
      Sentry.captureException(error);
    }
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    if (this.props.user) { 
      // logged in
      return (
        <div style={{ background: '#FFFFFF' }}>
          <Row>
            <MediaQuery minDeviceWidth={1224}>
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

            <MediaQuery maxDeviceWidth={1224}>
              <Col span={24}>
                <Switch>
                  <Route exact path="/login" component={InitialRoutingComp} />
                  <Route path="/general" component={generalRoutingComp} />
                  <Route path="/" component={NoMobile} />
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
          <LoginNavBar />
          <Switch>
            <Route exact path='/get-started/finished' component={GetStartedFinishedComp}></Route>
            <Route exact path='/get-started' component={GetStartedComp}></Route>
            <Route path="/general" component={generalRoutingComp} />
            <Route path="/" component={Login} />
            <Route exact path="/login" component={Login} />
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
    mixpanel: state.firebase.mixpanel,
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
    <Route exact path="/general/alexa-login" component={AlexaLoginForm} />
    <Route path="/general/alexa-login/office-list" component={OfficeList} />
  </Switch>
)

const officeAdminRoutingComp = () => (
  <Switch>

    {/* Office App Admin */}
    <Route exact path='/officeAdmin/:officeUID' component={FindServicesPage}></Route>
    {/* <Route exact path='/officeAdmin/:officeUID' component={HomeAdminPage}></Route> */}
    {/* <Route exact path='/officeAdmin/:officeUID/home' component={HomeAdminPage}></Route> */}
    <Route exact path='/officeAdmin/:officeUID/announcements' component={AnnouncementsPage}></Route>
    <Route exact path='/officeAdmin/:officeUID/conferenceRooms' component={ConferenceRoomsPage}></Route>
    <Route exact path='/officeAdmin/:officeUID/hotDesks' component={HotDesksPage}></Route>
    <Route exact path='/officeAdmin/:officeUID/serviceRequests' component={ServiceRequestsPage}></Route>
    <Route exact path='/officeAdmin/:officeUID/registeredGuests' component={RegisteredGuestsPage}></Route>
    <Route exact path='/officeAdmin/:officeUID/events' component={EventsPage}></Route>
    <Route exact path='/officeAdmin/:officeUID/spaceInfo' component={SpaceInfoPage}></Route>
    <Route exact path='/officeAdmin/:officeUID/users' component={UsersPage}></Route>
    {/* <Route exact path='/officeAdmin/:officeUID/health-report' component={HealthReportPage}></Route> */}

    {/* Service Portal */}
    <Route exact path='/officeAdmin/:officeUID/find-services' component={FindServicesPage}></Route>
    <Route exact path='/officeAdmin/:officeUID/billing' component={BillingPage}></Route>
    <Route exact path='/officeAdmin/:officeUID/service-plan' component={ServicePlanPage}></Route>
    <Route exact path='/officeAdmin/:officeUID/help-center' component={SupportPage}></Route>
    <Route exact path='/officeAdmin/:officeUID/experience-manager' component={ExperienceManagerPage}></Route>
    <Route exact path='/officeAdmin/:officeUID/office-profile' component={OfficeProfilePage}></Route>
  </Switch>
)
