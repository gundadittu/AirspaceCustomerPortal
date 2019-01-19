import React from 'react';
import { connect } from 'react-redux';
import { Menu, Dropdown, Icon } from 'antd';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
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
<<<<<<< HEAD

      const styles = {
        root: {
          flexGrow: 1,
        },
      };


        return (
          <div>
            <AppBar position="static"  boxShadow={1} style={{ background: 'transparent'}}>
              <Grid container justify="center" alignItems="center" >
                <Avatar alt="Airspace Logo"
                src={ require('../../assets/images/airspace_logo.png') }
                className={'classes.avatar'}
                style={{margin: 15,
                  width: 90,
                  height: 90,}}
                              />
              </Grid>
            </AppBar>

          </div>

        );
=======
        return null;
        // return (
        //     <Menu
        //         onClick={this.handleClick}
        //         selectedKeys={[this.state.current]}
        //         mode="horizontal"
        //     >

        //         <Menu.Item key="mail">
        //             <img style={{ height: 50, width: 250 }} className="logo-nav-image" src={require('../../assets/images/nav-logo.png')} />
        //         </Menu.Item>

        //     </Menu>
        // );
>>>>>>> f20fb80ad1ffa9f5d06369917cfc1c09e49347ea
    }
}

export default connect(null, null)(LoginNavBar);
