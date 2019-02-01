import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './components/Login/Login';
import NavBar from './components/NavBar/navbar';
import SideNavbar from './components/SideNavBar/sidenavbar';
import UsersPage from './components/UsersPage/usersPage';
import ConferenceRoomsPage from './components/ConferenceRoomsPage/conferenceRoomPage';
import HotDesksPage from './components/HotDesksPage/hotDesksPage.js';
import RegisteredGuestsPage from './components/RegisteredGuestsPage/registeredGuestsPage.js';
import Firebase from './components/Firebase';

import * as generalActionCreators from './store/actions/general';
import * as authActionCreators from './store/actions/auth';
import {Row, Col, Icon} from 'antd';
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
          weakProps.setUpUser(user.uid);
          weakProps.history.push('/');
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
      return (
        <div>
          <Row>
            <Col span={4}>
              <SideNavbar />
            </Col>
            <Col span={20}>
              <NavBar/>
              <Switch>
                <Route path="/officeAdmin" component={officeAdminRoutingComp}/>
              </Switch>
            </Col>
          </Row>
        </div>
      );
    } else {
       // logged out
      return (
        <div>
           <Switch>
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
    isLoading: state.general.isLoading,
    error: state.general.error,
    firebase: state.firebase.firebase,
    currentPage: state.general.currentPage
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setUpFirebase: (firebaseInstance) => dispatch(generalActionCreators.setUpFirebaseInstanceAction(firebaseInstance)),
    setUpUser: (uid) => dispatch(authActionCreators.setUpUserAction(uid))
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

const officeAdminRoutingComp = () => (
    <Switch>
      <Route exact path='/officeAdmin/:officeUID' component={UsersPage}></Route>
      <Route path='/officeAdmin/:officeUID/users' component={UsersPage}></Route>
      <Route path='/officeAdmin/:officeUID/conferenceRooms' component={ConferenceRoomsPage}></Route>
      <Route path='/officeAdmin/:officeUID/hotDesks' component={HotDesksPage}></Route>
      <Route path='/officeAdmin/:officeUID/registeredGuests' component={RegisteredGuestsPage}></Route>
    </Switch>
)
