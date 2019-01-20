import React from 'react';
import { connect } from 'react-redux';
import { Menu, Icon } from 'antd';
import * as pageTitles from '../../pages/pageTitles';
import getPagePayload from '../../pages/pageRoutingFunctions';
import * as actionCreators from '../../store/actions/general';
import '../../App.css';
import './sideNavBar.css';


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class SideNavBar extends React.Component {
  handleClick = (e) => {
    var pageTitle = e.key;
    const pagePayload = getPagePayload(pageTitle);
    if (pagePayload) { 
      this.props.changePage(pagePayload);
    }
  }

  handleOfficeAdminClick = (e) => { 
    var officeUID = e.key;
    const pagePayload = getPagePayload(pageTitles.homePageOfficeAdmin, {officeUID: officeUID});
    console.log(pagePayload);
    if (pagePayload) { 
      this.props.changePage(pagePayload);
    }
  }

  render() {

    const  switchPortalSubMenu = (
      <SubMenu key="sub1" title={<span><Icon type="up-square" /><span>Switch Portal</span></span>}>
        <Menu.Item key={pageTitles.homePageRegularUser}>{<span><Icon type="user" /><span>Regular Portal</span></span>}</Menu.Item>
        <MenuItemGroup key="g1" title="Office Admin Portals">
          {this.props.adminOfficeList.map((office) => (
            <Menu.Item key={office.uid} onClick={this.handleOfficeAdminClick}            >{office.name}</Menu.Item>
          ))}
        </MenuItemGroup>
      </SubMenu>
    );

    if (this.props.userType == "regular") {
      if (this.props.regularUserPortalMode == "officeAdmin") {
        return (
          <Menu
            onClick={this.handleClick}
            style={{ border: 0 }}
            defaultSelectedKeys={['1']}
            mode="inline"
            className="airspace-side-nav-bar"
          >
            <img style={{ height: 30, width: 200, paddingLeft: 30 }} className="logo-nav-image" src={require('../../assets/images/nav-logo.png')} />
            <MenuItemGroup key="g2" title="" className="airspace-side-nav-bar-group">
              <Menu.Item key="home">{<span><Icon type="home" /><span>Home</span></span>}</Menu.Item>
              <Menu.Item key={pageTitles.userPageOfficeAdmin} >{<span><Icon type="user" /><span>Users</span></span>}</Menu.Item>
              <Menu.Item key="conferenceRooms">{<span><Icon type="user" /><span>Conference Rooms</span></span>}</Menu.Item>
              <Menu.Item key="hotDesks">{<span><Icon type="user" /><span>Hot Desks</span></span>}</Menu.Item>
              <Menu.Item key="serviceRequests">{<span><Icon type="user" /><span>Service Requests</span></span>}</Menu.Item>
              <Menu.Item key="registeredGuests">{<span><Icon type="user" /><span>Registered Guests</span></span>}</Menu.Item>
              {switchPortalSubMenu}
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
              {switchPortalSubMenu}
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
    regularUserPortalMode: state.general.regularUserPortalMode
  }
};

const mapDispatchToProps = dispatch => {
  return {
    changePage: (payload) => dispatch(actionCreators.changePage(payload))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SideNavBar);
