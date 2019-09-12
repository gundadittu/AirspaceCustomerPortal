import React from 'react';
import MediaQuery from 'react-responsive';
import { Avatar, Menu, Dropdown, Icon, Row, Col, List, Affix, Card, Button } from 'antd';
import SideNavBar from '../SideNavBar/sidenavbar';
import { connect } from 'react-redux';
import * as authActionCreators from '../../store/actions/auth';
import * as genActionCreators from '../../store/actions/general';
import '../../App.css'
import './navbar.css'
import { AirNotificationType } from '../../models/AirNotificationType';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import * as pageTitles from '../../pages/pageTitles';

class NavBar extends React.Component {
  state = {
    current: null,
  }

  componentDidMount() {
    this.props.loadNotifications()
  }

  handleSignOut = (e) => {
    this.props.signOutUser();
  }

  handleProfileClick = (e) => {
    switch (e.key) {
      case 'Edit Profile':
        break;
      case 'SignOut':
        break;
      default:
        break;
    }
  }

  handleClick = (e) => {
    if (e.key === "signOut") {
      this.props.mixpanel.track('User did click sign out.');
      this.handleSignOut(e);
    } else if (e.key === "notifications") {
      this.props.mixpanel.track('User did click notifications.');
      this.props.loadNotifications()
    } else if (e.key === "users") {
      this.props.history.push('/officeAdmin/' + this.props.currentOfficeAdminUID + '/users');
    } else if (e.key === "support") {
      this.props.history.push('/officeAdmin/' + this.props.currentOfficeAdminUID + '/help-center');
    } else if (e.key === "office-profile") {
      this.props.history.push('/officeAdmin/' + this.props.currentOfficeAdminUID + '/office-profile');
    }
  }

  navBarLogo = (
    <Card
      cover={<img
        style={{ height: 125, width: 125 }}
        alt="Airspace Photo" src={require('../../assets/images/updated_logo.png')} />}
      bordered={false}
    />
  );

  oldLogo = (
    <img style={{ height: 73, width: 416 }}
      alt="Airspace Photo" src={require('../../assets/images/nav-logo.png')} />
  );

  getChatURL() {
    let chatURL = "https://drift.me/airspaceoffice"
    const emInfo = this.props.emInfo || null;
    if (emInfo !== null) {
      chatURL = emInfo["Drift Link"] || "https://drift.me/airspaceoffice";
    }
    return chatURL
  }

  goToHelpCenter() {
    this.props.history.push('/officeAdmin/' + this.props.currentOfficeAdminUID + '/help-center');
  }

  renderProfileMenu() {
    if (this.props.currentOfficeAdminUID !== null) {
      return (
        <Menu
          className="navBarProfileMenu menu-tab"
          onClick={this.handleClick}
          style={{ textAlign: 'right', border: "0", borderColor: "white", borderWidth: 0 }}
        >
          <Menu.Item key="users">
            <Grid container justify="center" alignItems="center">
              Manage Users
          </Grid>
          </Menu.Item>
          <Menu.Item key="office-profile">
            <Grid container justify="center" alignItems="center">
              Office Profile
          </Grid>
          </Menu.Item>
          <Menu.Item key="signOut">
            <Grid container justify="center" alignItems="center">
              Sign Out
          </Grid>
          </Menu.Item>
        </Menu >
      );
    } else {
      return (
        <Menu
          className="navBarProfileMenu menu-tab"
          onClick={this.handleClick}
          style={{ textAlign: 'right', border: "0", borderColor: "white", borderWidth: 0 }}
        >
          <Menu.Item key="signOut">
            <Grid container justify="center" alignItems="center">
              Sign Out
      </Grid>
          </Menu.Item>
        </Menu >
      );
    }

  };

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
  
  renderNotificationMenu() {
    return (
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
  }

  render() {
    if (this.props.currentOfficeAdminUID !== null) {
      return (
        <Affix>
          <Menu
            className="menu-tab"
            onClick={this.handleClick}
            style={{ textAlign: 'right', border: 0 }}
            mode="horizontal"
          >
            <Menu.Item key="live-chat">
              <a className="ant-dropdown-link" target="_blank" href={this.getChatURL()}>
                <Icon type="message" style={{ fontSize: 20 }} />
                Live Chat
        </a>
            </Menu.Item>
            <Menu.Item key="support">
              <a className="ant-dropdown-link" onClick={this.goToHelpCenter.bind(this)}>
                <Icon type="solution" style={{ fontSize: 20 }} />
                Help Center
       </a>
            </Menu.Item>
            <Menu.Item key="profile">
              <Dropdown overlay={this.renderProfileMenu()} trigger={['click']}>
                <a className="ant-dropdown-link" href="#">
                  {this.props.user.profileImageURL ?
                    <Avatar src={this.props.user.profileImageURL}></Avatar> :
                    <Avatar style={{ color: '#ffffff', backgroundColor: '#f07c94' }}>{this.props.user.firstName[0]}</Avatar>
                  }
                </a>
              </Dropdown>
            </Menu.Item>
          </Menu>
        </Affix>
      );
    } else {
      return (
        <Affix>
          <Menu
            className="menu-tab"
            onClick={this.handleClick}
            style={{ textAlign: 'right', border: 0 }}
            mode="horizontal"
          >
            <Menu.Item key="profile">
              <Dropdown overlay={this.renderProfileMenu()} trigger={['click']}>
                <a className="ant-dropdown-link" href="#">
                  {this.props.user.profileImageURL ?
                    <Avatar src={this.props.user.profileImageURL}></Avatar> :
                    <Avatar style={{ color: '#ffffff', backgroundColor: '#f07c94' }}>{this.props.user.firstName[0]}</Avatar>
                  }
                </a>
              </Dropdown>
            </Menu.Item>
          </Menu>
        </ Affix>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    userType: state.auth.type,
    user: state.auth.user,
    notifications: state.general.notifications,
    mixpanel: state.firebase.mixpanel,
    emInfo: state.officeAdmin.emInfo,
    currentOfficeAdminUID: state.general.currentOfficeAdminUID
  }
};

const mapDispatchToProps = dispatch => {
  return {
    signOutUser: () => dispatch(authActionCreators.signOutUserAction()),
    loadNotifications: () => dispatch(genActionCreators.loadNotifications())
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));

    // if (this.props.device == "mobile") {
    //   return (
    //     <Affix>
    //       <div>
    //         <Row type="flex" align="middle">
    //           <Col span={2}>
    //             <SideNavBar device={"mobile"} />
    //           </Col>
    //           <Col span={16}>
    //             {this.oldLogo}
    //           </Col>
    //           <Col span={6} >
    //             <Menu
    //               className="menu-tab"
    //               onClick={this.handleClick}
    //               style={{ textAlign: 'right', border: 0 }}
    //               mode="horizontal"
    //             >
    //               <Menu.Item key="notifications">
    //                 <Dropdown overlay={this.renderNotificationMenu()} trigger={['click']}>
    //                   <a className="ant-dropdown-link" href="#">
    //                     <Icon type="bell" style={{ fontSize: 45 }} />
    //                   </a>
    //                 </Dropdown>
    //               </Menu.Item>

    //               <Menu.Item key="profile">
    //                 <Dropdown overlay={this.renderProfileMenu()} trigger={['click']}>
    //                   <a className="ant-dropdown-link" href="#">
    //                     {this.props.user.profileImageURL ?
    //                       <Avatar src={this.props.user.profileImageURL}></Avatar> :
    //                       <Avatar style={{ color: '#ffffff', backgroundColor: '#f07c94' }}>{this.props.user.firstName[0]}</Avatar>
    //                     }
    //                   </a>
    //                 </Dropdown>
    //               </Menu.Item>
    //             </Menu>
    //           </Col>
    //         </Row>
    //         <br />
    //       </div>
    //     </ Affix>
    //   );
    // } else {