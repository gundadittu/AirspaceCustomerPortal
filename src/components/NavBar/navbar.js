import React from 'react';
import MediaQuery from 'react-responsive';
import { Avatar, Menu, Dropdown, Icon, Row, Col, List, Affix } from 'antd';
import { connect } from 'react-redux';
import * as authActionCreators from '../../store/actions/auth';
import * as genActionCreators from '../../store/actions/general';
import '../../App.css'
import './navbar.css'
import { AirNotificationType } from '../../models/AirNotificationType';
import Grid from '@material-ui/core/Grid';

class NavBar extends React.Component {
  state = {
    current: null,
  }

  handleSignOut = (e) => {
    this.props.signOutUser();
  }

  handleProfileClick = (e) => {
    switch (e.key) {
      case 'Edit Profile':
        console.log("Implement Edit Profile")
        break;
      case 'SignOut':
        console.log("Made it here");
        break;
      default:
        break;
    }
  }

  handleClick = (e) => {
    console.log('click ', e);
    if (e.key === "signOut") {
      this.handleSignOut(e);
    } else if (e.key === "notifications") {
      this.props.loadNotifications()
    }
  }

  getAirNotificationIconFor = (type) => {
    switch (type) {
      case AirNotificationType.announcement:
        return (<img className='notificationIcon' src={require('../../assets/images/announcements.png')} />)
      case AirNotificationType.arrivedGuestUpdate:
        return (<img className='notificationIcon' src={require('../../assets/images/guests.png')} />)
      case AirNotificationType.newEvent:
        return (<img className='notificationIcon' src={require('../../assets/images/events.png')} />)
      case AirNotificationType.serviceRequestUpdate:
        return (<img className='notificationIcon' src={require('../../assets/images/serviceReqs.png')} />)
      default:
        return null;
    }
  }

  componentDidMount() {
    this.props.loadNotifications()
  }

  render() {

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
      <Affix>
        <Row>
          <Col span={24}>
            <Menu
              onClick={this.handleClick}
              style={{ textAlign: 'right', border: 0 }}
              mode="horizontal"
            >
              <Menu.Item key="notifications">
                <Dropdown overlay={notificationMenu} trigger={['click']}>
                  <a className="ant-dropdown-link" href="#">
                    <Icon type="bell" style={{ fontSize: 18 }} />
                  </a>
                </Dropdown>
              </Menu.Item>

              <Menu.Item key="profile">
                <Dropdown overlay={profileMenu} trigger={['click']}>
                  <a className="ant-dropdown-link" href="#">
                    <Avatar src={this.props.user.profileImageURL} />
                  </a>
                </Dropdown>
              </Menu.Item>
            </Menu>
          </Col>
        </Row>
      </Affix>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
