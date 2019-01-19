import React, { Component } from 'react';
// import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './components/Login/Login';
import NavBar from './components/NavBar/navbar';
import SideNavbar from './components/SideNavBar/sidenavbar';
import UsersPage from './components/UsersPage/usersPage';
import UsersSideBar from './components/UsersPage/usersSideBar';
import Firebase from './components/Firebase';

import * as generalActionCreators from './store/actions/general';
import * as authActionCreators from './store/actions/auth';
import {Row, Col, Icon} from 'antd';

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
      console.log("firebase SET UP in App.js render()");
      const weakProps = this.props;
      this.listener = firebase.auth.onAuthStateChanged(function(user) {
        if (user) {
          console.log('auth listener found user');
          weakProps.setUpUser(user.uid);
        } else {
          console.log('auth listener did NOT find user');
          // Need to dispatch sign out action here
          // This action would set global state in redux to null for user
          weakProps.setUpUser(null);
          return;
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

  renderPageContent(page) {
    if(page == "usersPage"){
      return (
        <div>
          <Col span={16}>
            <UsersPage />
          </Col>
          <Col span={8}>
            <UsersSideBar />
          </Col>
        </div>
      );
    } else {
      return (
        <Icon type="smile" />
      )
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
            <Col span={6}>
              <SideNavbar />
            </Col>
            <Col span={18}>
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
