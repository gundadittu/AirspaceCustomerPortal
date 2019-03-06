import React from 'react';
import MediaQuery from 'react-responsive';
import { NavBar , Icon } from 'antd-mobile';
import { Avatar, Menu, Dropdown, Row, Col, List, Affix, Card } from 'antd';
import 'antd-mobile/lib/date-picker/style/css';   
import SideNavBar from '../SideNavBar/sidenavbar';
import { connect } from 'react-redux';
import * as authActionCreators from '../../store/actions/auth';
import * as genActionCreators from '../../store/actions/general';
import '../../App.css'
import './navbar.css'
import { AirNotificationType } from '../../models/AirNotificationType';
import Grid from '@material-ui/core/Grid';

class Sample extends React.Component {
  render () {
    const oldLogo = (
      <img style={{ height: 73, width: 416}}
        alt="Airspace Photo" src={require('../../assets/images/nav-logo.png')} />
    );
    const profileMenu = (
      <Menu
        className="navBarProfileMenu"
        onClick={this.handleClick}
        style={{ textAlign: 'right', border: 0 }}
      >
        <Menu.Item key="signOut">
          <Grid container justify="center" alignItems="center">
            Sign Out
          </Grid>
        </Menu.Item>
      </Menu>
    );

    const notificationMenu = (
      <List
        className='navBarNotificationMenu'
        itemLayout="horizontal"
        dataSource={this.props.notifications}
        renderItem={item => {
          const moment = require('moment');
          const timeSinceNow = moment(item.date).fromNow();
          return (
            <List.Item>
              <List.Item.Meta
                avatar={this.getAirNotificationIconFor(item.type)}
                title={item.title + ' • ' + timeSinceNow}
                description={item.body}
              />
            </List.Item>
          )
        }
        }
      />
    )
    return (
      <div>
          <NavBar
            mode="light"
            icon={<Icon type="left" />}
            onLeftClick={() => console.log('onLeftClick')}
            rightContent={[
              <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
              <Icon key="1" type="ellipsis" />,
            ]}
          >NavBar</NavBar>

          <NavBar
            mode="dark"
            leftContent="Back"
            rightContent={[
              <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
              <Icon key="1" type="ellipsis" />,
            ]}
          >NavBar</NavBar>
        </div>

    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    notifications: state.general.notifications
  }
};

const mapDispatchToProps = dispatch => {
  return {
    signOutUser: () => dispatch(authActionCreators.signOutUserAction()),
    loadNotifications: () => dispatch(genActionCreators.loadNotifications())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Sample);
