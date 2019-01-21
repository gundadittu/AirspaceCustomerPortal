import React, { Component } from 'react';
// import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './components/Login/Login';
import NavBar from './components/NavBar/navbar';
import SideNavbar from './components/SideNavBar/sidenavbar';
import UsersPage from './components/UsersPage/usersPage';
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
          console.log('auth listener found user');
          weakProps.setUpUser(user.uid);
        } else {
          console.log('auth listener did NOT find user');
          weakProps.setUpUser(null);
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

    // need to set state for employee or admin mode? which office?
    // - need to setuser type ? figure out back end?
    // need to set state for logged in in redux

    if (this.props.user) { // logged in
      return (
        <div>
          <Row>
            <Col span={4}>
              <SideNavbar />
            </Col>
            <Col span={20}>
              <NavBar/>
              {this.renderPageContent(this.props.currentPage)}
            </Col>
          </Row>
        </div>
      );
    } else { // logged out

      // Need to also remove ability to route to any other pages !!!
      return (
        <Login />
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    isLoading: state.general.isLoading,
    error: state.general.error,
    firebase: state.general.firebase,
    currentPage: state.general.currentPage
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setUpFirebase: (firebaseInstance) => dispatch(generalActionCreators.setUpFirebaseInstanceAction(firebaseInstance)),
    setUpUser: (uid) => dispatch(authActionCreators.setUpUserAction(uid))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
