import React from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import '../../App.css'
import { withRouter } from 'react-router-dom';

class LoginNavBar extends React.Component {
    state = {
        current: null,
    }

    handleClick = (e) => {
        return
    }

    forward() { 
      this.props.history.push('/');
    }

    render() {

        return (
          <div>
            <AppBar position="static" style={{ background: 'transparent'}}>
              <Grid container justify="center" alignItems="center" >
                <a onClick={this.forward.bind(this)}>
                  <img className="logo-nav-image" src={require('../../assets/images/nav-logo.png')}></img>
                </a>
              </Grid>
            </AppBar>
          </div>
        );
    }
}

export default withRouter(connect(null, null)(LoginNavBar));
