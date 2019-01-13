import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from './components/Login/Login';
import Firebase from './components/Firebase';

import * as authActionCreators from './store/actions/actionTypes';

class App extends Component {

  componentDidMount() {
    // set up firebase somewhere else 
    this.firebase = new Firebase(); 
    this.listener = this.firebase.auth.onAuthStateChanged(function(user) {
      if (user) { 
          this.props.setUpUser(user.uid);
      } else { 
        // Need to dispatch sign out action here 
        // This action would set global state in redux to null for user
        return; 
      }
    });
  }

  componentWillUnmount() { 
    this.listener();
  }
  
  render() {

    // need to set state for employee or admin mode? which office?
    // - need to setuser type ? figure out back end?  
    // need to set state for logged in in redux

    if (this.props.user) { // logged in
      return ( <div> Logged IN </div> );
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
    error: state.general.error  
  }
};

const mapDispatchToProps = dispatch => { 
  return { 
    setUpUser: (uid) => dispatch(authActionCreators.SET_UP_USER)
  }
};

export default connect(mapStateToProps, null)(App);
