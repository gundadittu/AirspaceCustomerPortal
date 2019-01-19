import React from 'react';
import { connect } from 'react-redux';
import './sideNavBar.css';
import { Menu, Icon, Row } from 'antd';
//@import "~antd/dist/antd.less";   // Import Ant Design styles by less entry
//@import "your-theme-file.less";   // variables to override above


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class SideNavBar extends React.Component {
  handleClick = (e) => {
    console.log('click ', e);

    var page = e.key
    this.changePage(page);
  }

  changePage(selectedPage) {
    return {
      page: selectedPage,
      mode: null,
      currentOfficeAdmin: null
    }
  }

  render() {
    var sideBarMenuItems = null;
    // if regular, {landloard, receptionist, admin}
    // check mode, based on mode, show the options
    // admin show hardcoded, else show blank

    const offices = ['Polsky North', 'Polsky South', 'Booth 205'];
    var officeKey = 1;
    if (this.props.userType == "regular") {
      if (this.props.regularUserPortalMode == "admin") {
        return (
          <Menu
            onClick={this.handleClick}
            style={{ width: 256, height: 100, border: 0 }}
            defaultSelectedKeys={['1']}
            mode="inline"
            className="airspace-side-nav-bar"
          >
            <img style={{ height: 30, width: 200, paddingLeft: 30 }} className="logo-nav-image" src={require('../../assets/images/nav-logo.png')} />
            <MenuItemGroup key="g2" title="" className="airspace-side-nav-bar-group">
                <Menu.Item key="home">{<span><Icon type="home" /><span>Home</span></span>}</Menu.Item>
                <Menu.Item key="users">{<span><Icon type="user" /><span>Users</span></span>}</Menu.Item>
                <Menu.Item key="conferenceRooms">{<span><Icon type="user" /><span>Conference Rooms</span></span>}</Menu.Item>
                <Menu.Item key="hotDesks">{<span><Icon type="user" /><span>Hot Desks</span></span>}</Menu.Item>
                <Menu.Item key="serviceRequests">{<span><Icon type="user" /><span>Service Requests</span></span>}</Menu.Item>
                <Menu.Item key="registeredGuests">{<span><Icon type="user" /><span>Registered Guests</span></span>}</Menu.Item>
                <SubMenu key="sub1" title={<span><Icon type="up-square" /><span>My Offices</span></span>}>
                  <MenuItemGroup key="g1" title="Offices">
                    {offices.map((office) => (
                      <Menu.Item key={office}>{office}</Menu.Item>
                    ))}
                  </MenuItemGroup>
                </SubMenu>
            </MenuItemGroup>

          </Menu>
        );
      } else if (this.props.regularUserPortalMode == "regular") {
        return (
          <Menu
            onClick={this.handleClick}
            style={{ width: 256, height: 100, border: 0 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
          >
            <Menu.Item key="1">{<span><Icon type="meh" /><span>Implement Other Users</span></span>}</Menu.Item>
          </Menu>
        )
      }
    } else {
      // if not a regular user
      return null;
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    userType: state.auth.type,
    adminOfficeList: state.auth.adminOfficeList,
    regularUserPortalMode: state.auth.regularUserPortalMode
  }
};

const mapDispatchToProps = dispatch => {
  return {
    pageChange: (selectedPage) => dispatch(this.changePage(selectedPage))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SideNavBar);
