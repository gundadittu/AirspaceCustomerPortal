import React, { Component } from 'react';
// import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './components/Login/Login';
import NavBar from './components/NavBar/navbar';
import SideNavbar from './components/SideNavBar/sidenavbar';
import Firebase from './components/Firebase';

import * as generalActionCreators from './store/actions/general';
import * as authActionCreators from './store/actions/auth';

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

  render() {

    // need to set state for employee or admin mode? which office?
    // - need to setuser type ? figure out back end?
    // need to set state for logged in in redux

    if (this.props.user) { // logged in
      return (
        <div>
           <NavBar>
              <div> Logged IN </div>
          </NavBar>
          <SideNavbar>
          </SideNavbar>
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
    firebase: state.general.firebase
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setUpFirebase: (firebaseInstance) => dispatch(generalActionCreators.setUpFirebaseInstanceAction(firebaseInstance)),
    setUpUser: (uid) => dispatch(authActionCreators.setUpUserAction(uid))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
