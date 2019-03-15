import React from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import '../../App.css'

class LoginNavBar extends React.Component {
    state = {
        current: null,
    }

    handleClick = (e) => {
        return
    }

    render() {

        return (
          <div>
            <AppBar position="static" style={{ background: 'transparent'}}>
              <Grid container justify="center" alignItems="center" >
                <a href="https://airspaceoffice.co">
                  <img className="logo-nav-image" src={require('../../assets/images/nav-logo.png')}></img>
                </a>
              </Grid>
            </AppBar>
          </div>
        );
    }
}

export default connect(null, null)(LoginNavBar);
