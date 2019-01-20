import React from 'react';
import { connect } from 'react-redux';
// import { Menu, Dropdown, Icon } from 'antd';
import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Avatar from '@material-ui/core/Avatar';
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
                  <img className="logo-nav-image" src={require('../../assets/images/nav-logo.png')}></img>
              </Grid>
            </AppBar>

          </div>

        );
    }
}

export default connect(null, null)(LoginNavBar);
